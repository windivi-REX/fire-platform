import request from '@/utils/request'

export function getUnitList () {
  return request({
    url: '/unit',
    method: 'get'
  })
}
