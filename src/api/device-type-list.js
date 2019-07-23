import request from '@/utils/request';
export function getList(params) {
  return request({
    url: '/yg/dictionary/type/select-list',
    method: 'get',
    params,
  });
}
