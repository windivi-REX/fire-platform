import request from '@/utils/request';
// 图片上传
export function getDeviceList(params) {
  return request({
    url: '/yg/deviceInfo',
    method: 'get',
    params,
  });
}
