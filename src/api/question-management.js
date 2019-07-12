import request from '@/utils/request'

// 题库列表
export function getQuestionList(params) {
    return request({
      url: '/aqpx/question',
      method: 'get',
      params
    })
}
// 试题添加
export function addQuestion(params) {
    return request({
      url: 'aqpx/question',
      method: 'post',
      params
    })
}
// 删除试题
export function deleteQuestion(params) {
    return request({
        url: 'aqpx/question',
        method: 'delete',
        params
    })
}
// 单个试题查询
export function getOneQuestion(params) {
    return request({
      url: `/aqpx/question/${params.urlparams}`,
      method: 'get'
    })
}
// 编辑试题
export function editQuestion(params) {
    return request({
        url: `aqpx/question/${params.urlparams}`,
        method: 'put',
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
