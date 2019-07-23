import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
const service = axios.create({
  baseURL: process.env.VUE_APP_PROXY,
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
    const res = response.data;
    if (response.status !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject('error');
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
