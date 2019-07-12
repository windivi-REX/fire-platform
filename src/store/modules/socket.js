const socket = {
  state: {
    socket: {
      instance: undefined,
      isConnected: undefined,
      message: undefined,
      reconnectError: undefined
    }
  },
  mutations: {
    RESET_SOCKET (state) {
      state.socket.instance = undefined
      state.socket.isConnected = false
      state.socket.message = ''
      state.reconnectError = false
    },
    SOCKET_ONOPEN (state, instance) {
      state.socket.instance = instance
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE (state, cb) {
      state.socket.instance.websock.onclose = cb
      state.socket.isConnected = false
    },
    SOCKET_ONERROR (state, cb) {
      state.socket.instance.websock.onerror = cb
    },
    SOCKET_ONMESSAGE (state, cb) {
      state.socket.instance.websock.onmessage = cb
    },
    SOCKET_RECONNECT (state, count) {
      state.socket.instance.initWebSocket()
    },
    SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    },
    SOCKET_SEND (state, obj) {
      if (state.socket.instance && state.socket.instance.websock) {
        state.socket.instance.websock.send(JSON.stringify(obj))
      } else {
        console.log(`Websocket 未连接成功`)
      }
    }
  },
  actions: {
    sendMsg: (context, obj) => {
      let preTimeOut = null
      if (
        context.state.socket.instance &&
        context.state.socket.instance.websock
      ) {
        context.commit('SOCKET_SEND', obj)
        if (preTimeOut) {
          clearTimeout(preTimeOut)
        }
      } else {
        preTimeOut = setTimeout(() => {
          context.dispatch('sendMsg', obj)
        }, 1000)
      }
    }
  }
}

export default socket
