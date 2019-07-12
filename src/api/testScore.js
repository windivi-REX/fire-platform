import request from '@/utils/request'

// 获取成绩列表数据
export function getTestScore(params) {
  return request({
    url: '/aqpx/grade',
    method: 'get',
    params
  })
}
export function deleteTestScore(params) {
  return request({
    url: '/aqpx/grade/',
    method: 'delete',
    params
  })
}

// 获取 状态列表
export function getExamineeList(examId) {
  return request({
    url: `/examMachine/listMachine/${examId}`,
    method: 'get',
  })
}

// 清空数据
export function clearExamData(examId, machineNo) {
  return request({
      url: `/examMachine/clear/${examId}/${machineNo}`,
      method: 'post',
      // params
  })
}
