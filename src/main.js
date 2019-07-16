import Vue from 'vue';

import '@babel/polyfill';
import 'babel-polyfill';

import '@/icons/iconfont/iconfont';
import '@/icons/iconfont/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css';

import './permission';
import './icons';

import router from './router';
import store from './store';

import Cookies from 'js-cookie';
import * as filters from './filters';
import i18n from './lang';
import Socket from './components/Socket';

import drag from '@/directive/el-dragDialog/index';

import Element from 'element-ui';
import echarts from 'echarts';
import scrollbar from './directive/scrollbar/scrollbar';

import App from './App';
Vue.prototype.$echarts = echarts;

Vue.directive('scrollBar', scrollbar);
Vue.use(drag);
Vue.use(Element, {
  size: Cookies.get('size') || 'medium',
  i18n: (key, value) => i18n.t(key, value),
});
Vue.use(Socket);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App),
});
