import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import socket from './modules/socket';
import user from './modules/user';
import getters from './getters';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    user,
    socket,
  },
  getters,
});

export default store;
