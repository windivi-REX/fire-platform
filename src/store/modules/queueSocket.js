const queueSocket = {
  state: {
    socket: {
      instance: undefined,
      isConnected: undefined,
      message: undefined,
      reconnectError: undefined
    }
  },
  mutations: {
    RESET_QUEUE_SOCKET (state) {
      state.socket.instance = undefined
      state.socket.isConnected = false
      state.socket.message = ''
      state.reconnectError = false
    },
    QUEUE_SOCKET_ONOPEN (state, instance) {
      console.log('VUEX:queueWebsocket connected success')
      state.socket.instance = instance
      state.socket.isConnected = true
    },
    QUEUE_SOCKET_ONCLOSE (state, cb) {
      state.socket.instance.websock.onclose = cb
      state.socket.isConnected = false
    },
    QUEUE_SOCKET_ONERROR (state, cb) {
      state.socket.instance.websock.onerror = cb
    },
    QUEUE_SOCKET_ONMESSAGE (state, cb) {
      state.socket.instance.websock.onmessage = cb
    },
    QUEUE_SOCKET_RECONNECT (state, count) {
      state.socket.instance.initWebSocket()
    },
    QUEUE_SOCKET_RECONNECT_ERROR (state) {
      state.socket.reconnectError = true
    },
    QUEUE_SOCKET_SEND (state, obj) {
      if (state.socket.instance && state.socket.instance.websock) {
        state.socket.instance.websock.send(JSON.stringify(obj))
      } else {
        console.log(`QueueWebsocket 未连接成功`)
      }
    }
  },
  actions: {
    queueSendMsg: (context, obj) => {
      let preTimeOut = null
      if (
        context.state.socket.instance &&
        context.state.socket.instance.websock
      ) {
        context.commit('QUEUE_SOCKET_SEND', obj)
        if (preTimeOut) {
          clearTimeout(preTimeOut)
        }
      } else {
        preTimeOut = setTimeout(() => {
          context.dispatch('queueSendMsg', obj)
        }, 1000)
      }
    }
  }
}

export default queueSocket
