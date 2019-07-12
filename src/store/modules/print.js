const print = {
  state: {
    status: '',
    printInfo: {
      name: '',
      imageUrl: '',
      sex: '',
      unitName: '',
      jobName: '',
      score: '',
      cardNo: ''
    }
  },
  mutations: {
    SET_PRINT_INFO: (state, payload) => {
      state.printInfo = Object.assign({}, state.printInfo, payload)
    },
    SET_PRINT_STATUS: (state, payload) => {
      state.status = status
    },
    RESET_PRINT_INFO: (state, payload) => {
      for (const attr in payload) {
        payload[attr] = ''
      }
    }
  },
  actions: {
    setPrintInfo ({ commit }, payload) {
      commit('SET_PRINT_INFO', payload)
    },
    setPrintStatus ({ commit }, payload) {
      commit('SET_PRINT_STATUS', payload)
    }
  }
}

export default print
