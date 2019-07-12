<template>
  <div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '',
    },
    retryTime: {
      type: String,
      default: '5',
    },
    retryInterval: {
      type: String,
      default: '3000',
    },
  },
  data() {
    return {
      websock: null,
      retryConnectTime: 0,
    };
  },
  created() {
    this.initWebSocket();
  },
  destroyed() {
    // this.websocketclose();
  },
  methods: {
    initWebSocket() {
      // 初始化weosocket
      this.retryConnectTime++;
      const wsuri = `ws://${process.env.VUE_APP_SOCKET_API}/websocket/${
        this.url
      }`;
      this.websock = new WebSocket(wsuri);
      this.websock.onopen = this.connectSuccess;
      this.websock.onerror = this.connectError;
      this.websock.onmessage = this.handleMsg;
      this.websock.close = this.onClose;
    },
    connectSuccess(e) {
      this.$emit('success', this);
      console.log(
        `允许重连次数:${this.retryTime},当前重连次数:${
          this.retryConnectTime
        },状态:${this.websock.OPEN},URL:${this.url},Msg:${JSON.stringify(e)}`,
      );
      this.retryConnectTime = 0;
    },
    connectError(e) {
      console.log(
        `允许重连次数:${this.retryTime},当前重连次数:${
          this.retryConnectTime
        },socket连接出现错误信息: ${JSON.stringify(e)},url:${
          this.url
        },开始重连.....`,
      );
      this.$emit(`onError`, this);
      if (this.retryConnectTime < this.retryTime) {
        setTimeout(() => {
          this.initWebSocket();
        }, this.retryInterval);
      }
    },
    handleMsg(e) {
      console.log(`获取到一条服务端消息: ${JSON.stringify(e.data)},url:${this.url}`);
      this.$emit(`handleMsg`, e);
    },
    onClose(e) {
      console.log(`socket连接已关闭: ${JSON.stringify(e)},url:${this.url}`);
      this.$emit(`onClose`, this);
    },
  },
};
</script>
