import request from '@/utils/request'

// 获取考生列表数据
export function getExamineeList(params) {
  return request({
    url: '/aqpx/people',
    method: 'get',
    params
  })
}
// 新增考生
export function addJobList(params) {
  return request({
    url: '/aqpx/job',
    method: 'post',
    params,
  })
}
// 修改考生
export function changeJobList(params, id) {
  return request({
    url: `/aqpx/people/${id}`,
    method: 'put',
    params
  })
}
// 删除考生
export function deleteExamineeList(params) {
  return request({
    url: `/aqpx/people/`,
    method: 'delete',
    params
  })
}
// 获取岗位列表
export function getjobData() {
  return request({
    url: '/aqpx/job/select-list',
    method: 'get',
  })
}
// 获取单位列表
export function getUnitData() {
  return request({
    url: '/aqpx/unit/select-list',
    method: 'get',
  })
}
