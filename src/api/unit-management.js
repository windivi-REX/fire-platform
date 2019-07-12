import request from '@/utils/request'

// 获取列表
export function getUnitList(params) {
    return request({
      url: `/aqpx/unit/`,
      method: 'get',
      params
    })
}
// 新增单位
export function addUnit(params) {
    return request({
        url: 'aqpx/unit',
        method: 'post',
        params
    })
}
// 删除单位
export function deleteUnit(params) {
    return request({
        url: 'aqpx/unit',
        method: 'delete',
        params
    })
}
// 编辑单位
export function editUnit(params) {
    return request({
        url: `aqpx/unit/${params.urlparams}`,
        method: 'put',
        params
    })
}

