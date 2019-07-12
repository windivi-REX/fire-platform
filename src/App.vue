<template>
  <div id="app">
    <!-- <shut-down v-if="true"></shut-down> -->
    <top-toolbar></top-toolbar>
    <router-view />
    <copyright></copyright>
    <socket
      ref="examSocket"
      :url="socketUrl"
      retryTime="100"
      retryInterVal="3000"
      @onError="socketError"
      @onClose="socketClosed"
      @success="socketConnectSuccess"
      @handleMsg="socketMsgHandle"
    ></socket>
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
      socketUrl: '',
    };
  },
  methods: {
    socketConnectSuccess(data) {
      setInterval(() => {
        this.$store.dispatch('examSendMsg', {
          code: -2,
        });
      }, 15000);
    },
    socketMsgHandle(socket) {
      let { data: msg } = socket;
      msg = JSON.parse(msg);
      switch (msg.code) {
        case '':
          break;
        default:
          console.log(`socketMsgHandle:${JSON.stringify(msg)}`);
          break;
      }
    },
    socketError() {},

    socketClosed() {
      this.$confirm(
        `故障信息:Socket断开连接;确定后:尝试执行该情况下默认解决方案`,
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
  },
};
</script>
