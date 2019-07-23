<template>
  <div id="app">
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
// import TopToolbar from '@/components/TopToolbar/index';
import Copyright from '@/components/Copyright/index';
import Socket from '@/components/Socket/index';
import { EventEntity as AlarmCenterEventEntity } from './view/real-time-msg/event';
export default {
  name: 'App',
  mixins: [],
  components: {
    // TopToolbar,
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
    socketConnectSuccess(data) {},
    socketMsgHandle(socket) {
      let { data: msg } = socket;
      msg = JSON.parse(msg);
      switch (msg.code) {
        case 1:
          this.$emit(`${AlarmCenterEventEntity.nextMessage}`, msg.data);
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
