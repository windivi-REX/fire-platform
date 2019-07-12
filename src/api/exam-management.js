import request from '@/utils/request'

// 考试列表
export function getExamList(params) {
    return request({
      url: '/aqpx/exam',
      method: 'get',
      params
    })
}
// 考试添加
export function addExam(params) {
    console.log(params)
    return request({
      url: 'aqpx/exam',
      method: 'post',
      params
    })
}
// 获取考试类型
export function getExamType(params) {
    return request({
      url: '/aqpx/exam/examType',
      method: 'get',
      params
    })
}
// 删除考试
export function deleteExam(params) {
    return request({
        url: 'aqpx/exam',
        method: 'delete',
        params
    })
}
// 验证考试名称是否可用
export function checkTitle(params) {
    return request({
      url: '/aqpx/exam/checkTitle',
      method: 'get',
      params
    })
}
// 获取试卷列表
export function getExamPaper(params) {
  return request({
    url: '/aqpx/examPaper',
    method: 'get',
    params
  })
}
// 获取考试维护单个信息
export function getOneExamPaper(params) {
  return request({
    url: '/aqpx/exam/getExam',
    method: 'get',
    params
  })
}
// 编辑考试
export function editExam(params) {
    return request({
        url: `aqpx/exam/${params.urlparams}`,
        method: 'put',
        params
    })
}
// 考试状态切换
export function examSwitch(params) {
  return request({
      url: `aqpx/exam/examSwitch/${params.urlparams}`,
      method: 'put',
      params
  })
}
