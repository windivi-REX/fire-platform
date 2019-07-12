import Vue from 'vue';

import '@babel/polyfill';
import 'babel-polyfill';

import '@/icons/iconfont/iconfont';

import '@/icons/iconfont/index.css';
import '@/styles/index.scss';
import 'element-ui/lib/theme-chalk/display.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'swiper/dist/css/swiper.css';
import 'vue-touch-keyboard/dist/vue-touch-keyboard.css';
import 'normalize.css/normalize.css';

import './errorLog';
import './permission';
import './icons';

import router from './router';
import store from './store';

import Cookies from 'js-cookie';
import * as filters from './filters';
import i18n from './lang';
import FastClick from 'fastclick';
import Socket from './components/Socket';

import drag from '@/directive/el-dragDialog/index';

import Element from 'element-ui';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import VueTouchKeyboard from 'vue-touch-keyboard';
import VuePreview from 'vue-preview';
import echarts from 'echarts';
import scrollbar from './directive/scrollbar/scrollbar';

// import './mock' // simulation data
import App from './App';
Vue.prototype.$echarts = echarts;

Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: { top: 0, bottom: 0 },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false,
});
Vue.use(VueAwesomeSwiper);
Vue.directive('scrollBar', scrollbar);
Vue.use(drag);
Vue.use(VueTouchKeyboard);
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});
Vue.use(Socket);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 兼容毒瘤ios的300ms延迟问题
if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    () => {
      FastClick.attach(document.body);
    },
    false,
  );
  Vue.config.productionTip = false;

  new Vue({
    el: '#app',
    router,
    store,
    i18n,
    render: h => h(App),
  });
}
