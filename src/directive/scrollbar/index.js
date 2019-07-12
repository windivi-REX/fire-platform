import scrollbar from './scrollbar'

const install = function(Vue) {
  Vue.directive('scrollBar', scrollbar)
}

if (window.Vue) {
  window['scrollBar'] = scrollbar
  Vue.use(install); // eslint-disable-line
}

scrollbar.install = install
export default scrollbar
