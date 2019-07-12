import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { menuList } from './api/login'
import router from './router'
import store from './store'

function filterArr (param) {
  const res = []
  param.forEach(v => {
    res.push(v.url)
    if (v.childs && v.childs.length > 0) {
      res.push(...filterArr(v.childs))
    }
  })
  res.push('*')
  return res
}

function hasPermission (roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = [
  '/login', // 后台管理入口
  '/404',
  '/401'
]

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/terminalChange/index'
      })
      //   NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('GetUserInfo')
          .then(res => {
            menuList()
              .then(res => {
                store
                  .dispatch('GenerateRoutes', filterArr(res.data))
                  .then(() => {
                    router.addRoutes(store.getters.addRouters)
                    next({
                      ...to,
                      replace: true
                    })
                  })
              })
              .catch(error => {
                Message.error(error)
              })
          })
          .catch(err => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err)
              next({
                path: '/'
              })
            })
          })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({
            path: '/401',
            replace: true,
            query: {
              noGoBack: true
            }
          })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
})
