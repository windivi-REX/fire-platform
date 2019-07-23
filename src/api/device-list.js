import request from '@/utils/request';
// 图片上传
export function getList(params) {
  return request({
    url: '/yg/deviceInfo',
    method: 'get',
    params,
  });
}
export function putList(params) {
  return request({
    url: `/yg/deviceInfo/${params.id}`,
    method: 'put',
    params,
  });
}

