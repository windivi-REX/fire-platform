import request from '@/utils/request';
// 获取报废任务列表
export function getScrapTaskList(params) {
    return request({
        url: '/yg/scrapTask',
        method: 'get',
        params
    })
}
// 获取设备组列表以及人员列表
export function getUsersAndDeviceGroups(params) {
    return request({
        url: '/yg/scrapTask/getUsersAndDeviceGroups',
        method: 'get',
        params
    })
}
// 图片上传
export function uploadImg(params) {
    return request({
        url: '/common/file/uploadImg',
        method: 'post',
        params,
    });
}
// 新增报废任务
export function addScrapTask(params) {
    return request({
        url: '/yg/scrapTask',
        method: 'post',
        params,
    });
}
// 修改报废任务
export function modificationScrapTask(params, id) {
    return request({
        url: `/yg/scrapTask/${id}`,
        method: 'put',
        params,
    });
}
// 删除报废任务
export function deleteScrapTask(params) {
    return request({
        url: `/yg/scrapTask`,
        method: 'delete',
        params,
    });
}