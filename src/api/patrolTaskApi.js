import request from '@/utils/request';
// 获取设备列表
export function getPatrolList(params) {
    return request({
        url: '/yg/patrolTask',
        method: 'get',
        params
    })
}
// 获取设备列表与所选项
export function getPatrolstaff(params) {
    return request({
        url: `/yg/patrolTask/getDeviceGroup/${params.id}`,
        method: 'get',
    })
}
// 获取巡检人员列表
export function getPatrolStaffList(params) {
    return request({
        url: `/yg/patrolTask/getPatrolStaff/${params.id}`,
        method: 'get',
    })
}
// 新增设备组
export function addEquipmentGroup(params) {
    return request({
        url: `/yg/patrolTask`,
        method: 'post',
        params
    })
}
// 修改巡检任务
export function modificationEquipmentGroup(params, id) {
    return request({
        url: `/yg/patrolTask/${id}`,
        method: 'put',
        params
    })
}
// 删除巡检任务
export function deleteEquipmentGroup(params) {
    return request({
        url: `/yg/patrolTask`,
        method: 'delete',
        params
    })
}
// 获取巡检任务状态
export function getEquipmentType(params) {
    return request({
        url: '/yg/patrolTask/getTaskStatus',
        method: 'get',
        params
    })
}