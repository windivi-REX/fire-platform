import request from '@/utils/request'

// 角色列表
export function getRoleList () {
  return request({
    url: '/service/role',
    method: 'get'
  })
}

// 新增角色
export function addRole (params) {
  return request({
    url: '/service/role',
    method: 'post',
    params
  })
}

// 修改角色
export function updataRole (params) {
  const { roleId } = params
  return request({
    url: `/service/role/${roleId}`,
    method: 'put',
    params
  })
}

// 删除角色
export function delRole (params) {
  const { id } = params
  return request({
    url: `/service/role`,
    method: 'delete',
    params: id
  })
}

// 获取修改角色权限时树形菜单
export function getRoleTree (params) {
  return request({
    url: `/service/menu/tree/${params}`,
    method: 'get'
  })
}

// 修改角色的权限
export function saveRoleTree (params) {
  const { roleId } = params
  return request({
    url: `/service/role/${roleId}`,
    method: 'put',
    params
  })
}

// 根据角色获取用户列表
export function getRoleUser (params) {
  return request({
    url: `/service/user/tree/${params}`,
    method: 'get'
  })
}

// 根据角色保存关联用户
export function bindingRole (params) {
  const { userIds } = params
  return request({
    url: `/service/user/binding/${params.roleId}`,
    method: 'post',
    params: userIds
  })
}
