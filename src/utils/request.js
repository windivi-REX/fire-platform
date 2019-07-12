import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
const service = axios.create({
  baseURL: '/proxy',
  timeout: 10000,
});
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = getToken();
    }
    switch (config.method) {
      case 'post':
        if (config.params && config.params['upload']) {
          // 特殊处理文件上传
          config.data = config.params.formData;
          service.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        } else {
          config.data = config.params;
          service.defaults.headers.post['Content-Type'] =
            'application/json;charset=UTF-8';
        }
        delete config.params;
        break;
      case 'delete':
        config.url = `${config.url}/${config.params}`;
        delete config.params;
        break;
      case 'put':
        service.defaults.headers.put['Content-Type'] =
          'application/json;charset=UTF-8';
        config.data = config.params;
        delete config.params;
        break;
    }
    return config;
  },
  error => {
    console.log(error);
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  response => {
    debugger;
    const res = response.data;
    if (response.status !== 200 || res.code !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000,
      });
      // 401:token失效;
      if (res.code === 400) {
        if (res.data && res.data.desc) {
          Message({
            message: `${res.data.desc}`,
            type: 'info',
            duration: 5 * 1000,
          });
        } else {
          Message({
            message: `${res.msg}`,
            type: 'info',
            duration: 5 * 1000,
          });
        }
      }
      if (res.code === 401) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          },
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload();
          });
        });
      } else if (res.code === 403) {
        // 没有授权
        Message({
          message: `您没有权限`,
          type: 'error',
          duration: 5 * 1000,
        });
      }
      return Promise.reject('error');
    }
    if (response.status !== 200) {
      Message({
        message: '错误',
        type: 'error',
        duration: 5 * 1000,
      });
    } else {
      return response.data;
    }
  },
  error => {
    console.log('err' + error);
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);
export default service;
