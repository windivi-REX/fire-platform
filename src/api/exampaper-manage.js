import request from '@/utils/request'

// 考试列表
export function getExamPaperList(params) {
    return request({
      url: '/aqpx/examPaper',
      method: 'get',
      params
    })
}
// 考试添加
export function addExamPaper(params) {
    console.log(params)
    return request({
      url: 'aqpx/examPaper',
      method: 'post',
      params
    })
}
// 岗位列表
export function getJobList(params) {
    return request({
        url: '/aqpx/job/select-list',
        method: 'get',
        params
    })
}
// 获取试题类型
export function getQuestionType(params) {
    return request({
      url: '/aqpx/dictionary',
      method: 'get',
      params
    })
}
// 删除考试
export function deleteExamPaper(params) {
    return request({
        url: 'aqpx/examPaper',
        method: 'delete',
        params
    })
}
// 验证考试名称是否可用
export function checkTitle(params) {
    return request({
      url: '/aqpx/examPaper/checkTitle',
      method: 'get',
      params
    })
}
// 获取单个试卷信息
export function getOneExamPaperInfo(params) {
  return request({
    url: '/aqpx/examPaper/getPaper',
    method: 'get',
    params
  })
}
// 编辑考试
export function editExamPaper(params) {
    return request({
        url: `aqpx/examPaper/${params.urlparams}`,
        method: 'put',
        params
    })
}
