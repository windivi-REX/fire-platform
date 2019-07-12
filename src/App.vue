<template>
  <div id="app">
    <!-- <shut-down v-if="true"></shut-down> -->
    <top-toolbar></top-toolbar>
    <router-view />
    <copyright></copyright>
    <socket ref="examSocket"
            url="exam"
            retryTime="100"
            retryInterVal="3000"
            @onError="examSocketError"
            @onClose="examSocketClosed"
            @success="examSocketConnectSuccess"
            @handleMsg="examMsgHandle"></socket>
    <socket ref="queueSocket"
            :url="queueSocketUrl"
            retryTime="100"
            retryInterVal="3000"
            @onError="queueSocketError"
            @onClose="queueSocketClosed"
            @success="queueSocketConnectSuccess"
            @handleMsg="queueMsgHandle"></socket>
  </div>
</template>

<script>
// import ShutDown from '@/components/ShutDown/index'
import TopToolbar from '@/components/TopToolbar/index';
import Copyright from '@/components/Copyright/index';
import Socket from '@/components/Socket/index';
import * as AppApi from '@/api/app';
// const { mapMutations } = createNamespacedHelpers('queueSocket');
// import { getToken } from '@/utils/auth';
export default {
  name: 'App',
  mixins: [],
  components: {
    // ShutDown,
    TopToolbar,
    Copyright,
    Socket,
  },
  computed: {},
  created() {},
  mounted() {
    this.tryGetExamInfo();
  },
  data() {
    return {
      hasShutDown: false,
      queueSocketUrl: 'queue?examId=-1',
    };
  },
  methods: {
    tryGetExamInfo() {
      const timeOut = setTimeout(() => {
        AppApi.getExamInfo()
          .then(res => {
            this.$store.commit('EXAM_INFO_SET', res.data);
            this.$store.commit('SET_ENABLED_EXAM', true);
            this.$store.dispatch('queueSendMsg', {
              code: '2',
              data: res.data.id,
            });
            this.$store.commit('SET_ENABLED_EXAM', true);
            if (timeOut) {
              clearTimeout(timeOut);
            }
          })
          .catch(err => {
            console.log(err);
            this.watchStoreResponseSocket();
            if (timeOut) {
              clearTimeout(timeOut);
            }
          });
      }, 1000);
    },
    watchStoreResponseSocket() {
      if (!(this.examEnabled && this.examInfo && this.examInfo !== {})) {
        this.$store.watch(
          state => state.exam.enabled,
          val => {
            if (val) {
              if (!this.examId) {
                this.tryGetExamInfo();
              }
            }
          },
        );
      }
    },
    examSocketConnectSuccess(data) {
      this.$store.commit('EXAM_SOCKET_ONOPEN', data);
      this.$store.dispatch('examSendMsg', {
        code: -2,
      });
      setInterval(() => {
        this.$store.dispatch('examSendMsg', {
          code: -2,
        });
      }, 15000);
    },
    examMsgHandle(socket) {
      let { data: msg } = socket;
      msg = JSON.parse(msg);
      switch (msg.code) {
        case -1: // 错误 {"code":-1,"data":"数据错误"}
        case '-1':
          this.$store.commit('SET_ERRORMSG_EXAM', msg.data);
          break;
        case 0: // 就绪-绑定机器号成功,等待确认(通过机器号获取下一个考生信息) {"code":0,"data":""}
        case '0':
          this.$store.commit('SET_MACHINE_READY', true);
          break;
        case 1: // 可以获取下一个考生信息(是告诉你可以获取(通过http请求),不是直接返回数据) {"code":1,"data":""}
        case '1':
          this.$store.commit('SET_CANNEXT_CANDIDATE', true);
          break;
        case 5: // 绑定机器时已经存在 {"code":5,"data":""}
        case '5':
          this.$store.commit('SET_EXISTED_MACHINE', true);
          break;
        case 7: // 考试开启 {"code":7,"data":""}
        case '7':
          AppApi.getExamInfo().then(res => {
            this.$store.commit('SET_ENABLED_EXAM', true);
            this.$store.dispatch('queueSendMsg', {
              code: 2,
              data: res.data.id,
            });
          });
          break;
        case 8: // 考试关闭 {"code":8,"data":""}
        case '8':
          this.$store.commit('SET_ENABLED_EXAM', false);
          this.$store.commit('EXAM_INFO_SET', null);
          this.$confirm(
            '考试已经关闭!点击确定后,机器将重新为下一场考试做准备',
            '维护信息',
            {
              confirmButtonText: '确定',
              type: 'warning',
            },
          )
            .then(() => {
              location.reload();
            })
            .catch(() => {});
          break;
        case 10:
        case '10':
          this.$store.commit('SET_MACHINE_READY', true);
          this.$store.commit('SET_CANNEXT_CANDIDATE', true);
          this.$store.commit('SET_CURRENTCANDIDATE_STATUS', msg.data);
          break;
        default:
          console.log(`examMsgHandle:${JSON.stringify(msg)}`);
          break;
      }
    },
    queueMsgHandle(socket) {
      let { data: msg } = socket;
      msg = JSON.parse(msg);
      switch (msg.code) {
        case -1: // 错误 {"code":-1,"data":"没有当前考试"}
        case '-1':
          this.$store.commit('SET_ERRORMSG_QUEUE', msg.data);
          break;
        case 0:
        case '0': // 返回某个考试的排队信息
          this.$store.commit('SET_QUEUE_CONNECT_EXAM', true);
          this.$store.commit('SET_QUEUE', msg.data.queues);
          this.$store.commit('SET_MACHINELIST_QUEUE', msg.data.machineList);
          this.$store.commit('SET_NOW_TIME_QUEUE', msg.data.nowTime);
          this.$store.commit('SET_TOTAL_QUEUE', msg.data.total);
          break;
        case 2:
        case '2': // 保存连接返回(考试ID错误才返回)
          //   this.$store.commit('SET_ENABLED_EXAM', false);
          //   this.$store.commit('EXAM_INFO_SET', null);
          this.$store.commit('SET_QUEUE_CONNECT_EXAM', false);
          break;
        case 7:
        case '7': // 考试开启
          AppApi.getExamInfo().then(res => {
            this.$store.commit('SET_ENABLED_EXAM', true);
            this.$store.dispatch('queueSendMsg', {
              code: 2,
              data: res.data.id,
            });
          });
          break;
        case 8:
        case '8': // 考试关闭
          this.$store.commit('SET_ENABLED_EXAM', false);
          this.$store.commit('EXAM_INFO_SET', null);
          this.$confirm(
            '考试已经关闭!点击确定后,机器将重新为下一场考试做准备',
            '维护信息',
            {
              confirmButtonText: '确定',
              type: 'warning',
            },
          )
            .then(() => {
              location.reload();
            })
            .catch(() => {});
          break;
        default:
          console.log(`queueMsgHandle:${JSON.stringify(msg)}`);
          break;
      }
    },
    examSocketError() {},

    examSocketClosed() {
      this.$store.commit('RESET_EXAM');
      this.$store.commit('RESET_EXAM_SOCKET');
      this.$confirm(
        `故障信息:与服务端已断开连接;确定后:回到机器码设置初始化页面`,
        '维护提示',
        {
          confirmButtonText: '确定',
          type: 'warning',
          closeOnClickModal: false,
          showClose: false,
          showCancelButton: false,
        },
      )
        .then(() => {
          this.$router.push({ path: '/code-setting-init' });
        })
        .catch(() => {});
    },
    queueSocketClosed() {
      this.$store.commit('RESET_QUEUE');
      this.$store.commit('RESET_QUEUE_SOCKET');
      this.$confirm(
        `故障信息:与服务端已断开连接;确定后:回到取号初始化页面`,
        '维护提示',
        {
          confirmButtonText: '确定',
          type: 'warning',
          closeOnClickModal: false,
          showClose: false,
          showCancelButton: false,
        },
      )
        .then(() => {
          this.$router.push({ path: '/arrange-exam-init' });
        })
        .catch(() => {});
    },
    queueSocketError() {},
    queueSocketConnectSuccess(data) {
      this.$store.commit('QUEUE_SOCKET_ONOPEN', data);
      this.$store.commit('SET_QUEUE_ENABLED', true);
      this.$store.dispatch('queueSendMsg', {
        code: -2,
      });
      setInterval(() => {
        this.$store.dispatch('queueSendMsg', {
          code: -2,
        });
      }, 15000);
    },
  },
};
</script>
