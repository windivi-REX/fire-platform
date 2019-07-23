import request from '@/utils/request';
// 图片上传
export function getList(params) {
  return request({
    url: '/yg/deviceGroup',
    method: 'get',
    params,
  });
}
export function putList(params) {
  return request({
    url: `/yg/deviceGroup/${params.id}`,
    method: 'put',
    params,
  });
}

export function addList(params) {
  return request({
    url: '/yg/deviceGroup',
    method: 'post',
    params,
  });
}

export function deleteList(ids) {
  return request({
    url: `/yg/deviceGroup`,
    method: 'delete',
    params: ids,
  });
}

export function getChildList(params) {
  return request({
    url: `/yg/deviceGroup/listDeviceNotInGroup/${params.id}`,
    method: 'get',
  });
}
