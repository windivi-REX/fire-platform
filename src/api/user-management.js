import request from '@/utils/request'

// 获取部门树
export function deptsTree () {
  return request({
    url: '/service/dept/tree',
    method: 'get'
  })
}

// 获取部门
export function depts (params) {
  return request({
    url: '/service/dept',
    method: 'get',
    params
  })
}

// 添加部门
export function addDepts (params) {
  return request({
    url: '/service/dept',
    method: 'post',
    params
  })
}

// 修改部门
export function updateDept (params) {
  const { deptId } = params
  return request({
    url: `/service/dept/${deptId}`,
    method: 'put',
    params: params
  })
}

// 删除部门
export function removeDept (params) {
  const { deptId } = params
  return request({
    url: '/service/dept',
    method: 'delete',
    params: deptId
  })
}

// 获取用户列表
export function getUserList (params) {
  return request({
    url: '/service/user',
    method: 'get',
    params
  })
}

// 角色列表
export function roleList () {
  return request({
    url: '/service/role',
    method: 'get'
  })
}

// 添加用户
export function addRole (params) {
  return request({
    url: '/service/user',
    method: 'post',
    params
  })
}

// 编辑用户
export function updateUser (params) {
  const { userId } = params
  return request({
    url: `/service/user/${userId}`,
    method: 'put',
    params
  })
}

// 获取用户信息
export function getSingleUser (params) {
  return request({
    url: '/service/user/getUserInfo',
    method: 'get',
    params
  })
}

// 删除用户
export function delUser (userId) {
  return request({
    url: '/service/user',
    method: 'delete',
    params: userId
  })
}

// 初始化用户密码
export function resetPassword (params) {
  return request({
    url: '/service/user/adminResetPwd',
    method: 'post',
    params
  })
}
