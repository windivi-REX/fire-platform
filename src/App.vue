<template>
  <div id="app">
    <top-toolbar></top-toolbar>
    <router-view />
    <copyright></copyright>
    <socket
      ref="socketRef"
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
import TopToolbar from '@/components/TopToolbar/index';
import Copyright from '@/components/Copyright/index';
import Socket from '@/components/Socket/index';
export default {
  name: 'App',
  mixins: [],
  components: {
    TopToolbar,
    Copyright,
    Socket,
  },
  computed: {},
  created() {},
  mounted() {},
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
