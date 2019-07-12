const queue = {
  state: {
    machineList: null,
    queue: null,
    nowTime: null,
    errorMsg: null,
    total: null,
    enabled: null,
    connectExam: null
  },
  mutations: {
    SET_QUEUE_CONNECT_EXAM (state, boolean) {
      state.connectExam = boolean
    },
    SET_ERRORMSG_QUEUE (state, error) {
      state.errorMsg = error
    },
    SET_QUEUE (state, queue) {
      state.queue = queue
    },
    SET_QUEUE_ENABLED (state, boolean) {
      state.enabled = boolean
    },
    SET_MACHINELIST_QUEUE (state, machineList) {
      state.machineList = machineList
    },
    SET_NOW_TIME_QUEUE (state, nowTime) {
      state.nowTime = nowTime
    },
    SET_TOTAL_QUEUE (state, total) {
      state.total = total
    },
    RESET_QUEUE (state) {
      for (const attr in state) {
        state[attr] = undefined
      }
    }
  },
  actions: {}
}

export default queue
