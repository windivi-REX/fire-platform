import request from '@/utils/request';
// 获取维修任务列表
export function getMaintainList(params) {
    return request({
        url: '/yg/maintainTask',
        method: 'get',
        params
    })
}
// 获取维修方式列表
export function getMaintainWayList(params) {
    return request({
        url: '/yg/maintainTask/getMaintenanceManner',
        method: 'get',
        params
    })
}
// 新增维修任务
export function addMaintain(params) {
    return request({
        url: '/yg/maintainTask',
        method: 'post',
        params
    })
}
// 修改维修任务
export function modificationMaintain(params,id) {
    return request({
        url: `/yg/maintainTask/${id}`,
        method: 'put',
        params
    })
}
// 删除维修任务
export function deleteMaintain(params) {
    return request({
        url: `/yg/maintainTask`,
        method: 'delete',
        params
    })
}