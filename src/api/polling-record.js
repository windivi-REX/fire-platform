import request from '@/utils/request';
// 获取巡检记录列表
export function getRecordList(params) {
    return request({
        url: '/yg/patrolRecord',
        method: 'get',
        params
    })
}
// 获取状态 巡检名称
export function getSchemeList(params) {
    return request({
        url: '/yg/patrolRecord/getSchemeList',
        method: 'get',
        params
    })
}
// 新增巡检记录
export function addScheme(params) {
    return request({
        url: '/yg/patrolRecord',
        method: 'post',
        params
    })
}
//  修改巡检记录
export function modificationScheme(params, id) {
    return request({
        url: `/yg/patrolRecord/${id}`,
        method: 'put',
        params
    })
}
// 删除巡检记录
export function deletEpatrolRecord(params) {
    return request({
        url: `/yg/patrolRecord`,
        method: 'delete',
        params
    })
}

// 获取巡检对象列表
export function getPollingObj(params) {
    return request({
        url: '/yg/patrolRecord/getDeviceGroups',
        method: 'get',
        params
    })
}