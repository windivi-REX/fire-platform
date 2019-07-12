import request from '@/utils/request'

// 获取岗位数据
export function getJobList(params) {
  return request({
    url: '/aqpx/job',
    method: 'get',
    params
  })
}
// 新增岗位
export function addJobList(params) {
  return request({
    url: '/aqpx/job',
    method: 'post',
    params,
  })
}
// 修改岗位
export function changeJobList(params, id) {
  return request({
    url: `/aqpx/job/${id}`,
    method: 'put',
    params
  })
}
// 删除岗位
export function deleteJobList(params) {
  return request({
    url: '/aqpx/job/',
    method: 'delete',
    params
  })
}
