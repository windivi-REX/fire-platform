import request from '@/utils/request2';
// 获取设备列表
export function getPatrolList(params) {
    return request({
        url: '/yg/patrolScheme',
        method: 'get',
        params
    })
}