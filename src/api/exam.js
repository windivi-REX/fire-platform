import request from '@/utils/request'
export function getYanShiExamQuestions (params) {
  return request({
    url: '/api/exam/getQuestionForyanshi',
    method: 'get',
    params
  })
}
