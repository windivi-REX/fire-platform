import request from '@/utils/request'

export function getLog(params) {
  return request({
    url: '/common/log',
    method: 'get',
    params
  })
}
