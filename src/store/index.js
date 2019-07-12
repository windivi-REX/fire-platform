import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import examSocket from './modules/examSocket'
import queueSocket from './modules/queueSocket'
import exam from './modules/exam'
import queue from './modules/queue'
import print from './modules/print'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    examSocket,
    queueSocket,
    exam,
    queue,
    print
  },
  getters
})

export default store
