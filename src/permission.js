import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import { menuList } from './api/login'
import router from './router'
import store from './store'

// NProgress.configure({
//   showSpinner: false
// })

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
  '/exam',
  '/exam-init',
  '/code-setting-init', // 考试端入口
  '/code-setting',
  '/select-unit',
  '/assign-candidate',
  '/assign-candidate-init',
  '/arrange-exam',
  '/arrange-exam-init', // 排号取号端入口
  '/print-init', // 打印端入口
  '/print',
  '/print-ready',
  '/auto-login',
  '/exam-yan-shi',
  '/preview-truefalse',
  '/preview-choice',
  '/call-sign-init', // 呼号端入口
  '/call-sign'
]

router.beforeEach((to, from, next) => {
  //   NProgress.start()
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
      //   NProgress.done()
    }
  }
})

router.afterEach(() => {
  //   NProgress.done()
})
