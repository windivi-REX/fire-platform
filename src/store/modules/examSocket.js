const examSocket = {
  state: {
    socket: {
      instance: null,
      isConnected: null,
      message: null,
      reconnectError: null,
    },
  },
  mutations: {
    EXAM_STATE_RESET(state) {
      state.socket.instance = null;
      state.socket.isConnected = false;
      state.socket.message = '';
      state.reconnectError = false;
    },
    EXAM_SOCKET_ONOPEN(state, instance) {
      console.log('VUEX:examWebsocket connected success');
      state.socket.instance = instance;
      state.socket.isConnected = true;
    },
    EXAM_SOCKET_ONCLOSE(state, cb) {
      state.socket.instance.websock.onclose = cb;
      state.socket.isConnected = false;
    },
    EXAM_SOCKET_ONERROR(state, cb) {
      state.socket.instance.websock.onerror = cb;
    },
    EXAM_SOCKET_ONMESSAGE(state, cb) {
      state.socket.instance.websock.onmessage = cb;
    },
    EXAM_SOCKET_RECONNECT(state, count) {
      state.socket.instance.initWebSocket();
    },
    EXAM_SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    EXAM_SOCKET_SEND(state, obj) {
      console.log(`${JSON.stringify(obj)} examSendMsg`);
      console.log(state.socket.instance.websock);
      if (state.socket.instance && state.socket.instance.websock) {
        try {
          state.socket.instance.websock.send(JSON.stringify(obj));
        } catch (e) {

        }
      } else {
        console.log(`ExamWebsocket 未连接成功`);
      }
    },
    RESET_EXAM_SOCKET(state) {
      for (const attr in state) {
        state[attr] = undefined;
      }
    },
  },
  actions: {
    examSendMsg: (context, obj) => {
      let preTimeOut = null;
      if (
        context.state.socket.instance &&
        context.state.socket.instance.websock
      ) {
        context.commit('EXAM_SOCKET_SEND', obj);
        if (preTimeOut) {
          clearTimeout(preTimeOut);
        }
      } else {
        preTimeOut = setTimeout(() => {
          context.dispatch('examSendMsg', obj);
        }, 1000);
      }
    },
  },
};

export default examSocket;
