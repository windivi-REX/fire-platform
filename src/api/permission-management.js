import request from '@/utils/request'

// 获取菜单树
export function getMenuTree (params) {
  return request({
    url: '/service/menu/tree',
    method: 'get',
    params
  })
}

// 获取菜单列表
export function getMenuList (params) {
  return request({
    url: '/service/menu/tree/listMenu',
    method: 'get',
    params
  })
}

// 添加菜单
export function saveMenu (params) {
  return request({
    url: '/service/menu',
    method: 'post',
    params
  })
}

// 修改菜单
export function updateMenu (params) {
  const { menuId } = params
  return request({
    url: `/service/menu/${menuId}`,
    method: 'put',
    params
  })
}

// 删除菜单
export function removeMenu (params) {
  const { menuId } = params
  return request({
    url: `/service/menu`,
    method: 'delete',
    params: menuId
  })
}
