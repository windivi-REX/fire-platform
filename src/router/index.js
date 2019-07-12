import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout';
Vue.use(Router);
export const constantRouterMap = [
  // {
  //   path: '/404',
  //   component: () => import('@/view/404'),
  //   hidden: true,
  // },
  // {
  //   path: '/auto-login',
  //   component: () => import('@/view/login/AutoLogin'),
  //   hidden: true,
  // },
  // {
  //   path: '/',
  //   name: 'mainRedirect',
  //   redirect: '/login',
  //   hidden: true,
  // },
  // {
  //   path: '/exam',
  //   name: 'exam',
  //   component: () => import('@/view/exam/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/preview-truefalse',
  //   name: 'previewTruefalse',
  //   component: () => import('@/view/question-preview/truefalse'),
  //   hidden: true,
  // },
  // {
  //   path: '/preview-choice',
  //   name: 'previewChoice',
  //   component: () => import('@/view/question-preview/choice'),
  //   hidden: true,
  // },
  // {
  //   path: '/exam-yan-shi',
  //   name: 'examYanShi',
  //   component: () => import('@/view/exam/ExamYanShi'),
  //   hidden: true,
  // },
  // {
  //   path: '/print',
  //   name: 'print',
  //   component: () => import('@/view/print/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/arrange-exam',
  //   name: 'arrangeExam',
  //   component: () => import('@/view/arrange-exam/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/code-setting',
  //   name: 'codeSetting',
  //   component: () => import('@/view/code-setting/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/code-setting-init',
  //   name: 'codeSettingInit',
  //   component: () => import('@/view/code-setting-init/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/assign-candidate-init',
  //   name: 'assignCandidateInit',
  //   component: () => import('@/view/assign-candidate-init/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/assign-candidate',
  //   name: 'assignCandidate',
  //   component: () => import('@/view/assign-candidate/index'),
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/assign-candidate/:status',
  //       name: 'assignCandidateChild',
  //       component: () => import('@/view/assign-candidate/index'),
  //     },
  //   ],
  // },
  // {
  //   path: '/select-unit',
  //   name: 'selectUnit',
  //   component: () => import('@/view/select-unit/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/print-ready',
  //   name: 'printReady',
  //   component: () => import('@/view/print-ready/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/print-init',
  //   name: 'printInit',
  //   component: () => import('@/view/print-init/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/exam-init',
  //   name: 'examInit',
  //   component: () => import('@/view/exam-init/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/arrange-exam-init',
  //   name: 'arrangeExamInit',
  //   component: () => import('@/view/arrange-exam-init/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/call-sign-init',
  //   name: 'callSignInit',
  //   component: () => import('@/view/call-sign-init/index'),
  //   hidden: true,
  // },
  // {
  //   path: '/call-sign',
  //   name: 'callSign',
  //   component: () => import('@/view/call-sign/index'),
  //   hidden: true,
  // },
  {
    path: '/login',
    component: () => import('@/view/login/index'),
    hidden: true,
  },
];

export default new Router({
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
  base: '',
});

export const asyncRouterMap = [
  //设备监控
  {
    path: '/',
    component: Layout,
    redirect: '/gisMap',
    name: 'Authority',
    meta: {
      title: 'equipmentMonitori',
      icon: 'component',
    },
    children: [
      {
        path: 'gisMap',
        name: 'map',
        component: () => import('@/view/platform-GisMap/index'),
        meta: {
          title: 'GisMap',
          // icon: 'user'
        },
      },
      {
        path: 'equipment',
        name: 'equipment',
        component: () => import('@/view/equipment-manage/index'),
        meta: {
          title: 'equipmentManage',
          // icon: 'peoples'
        },
      },
      {
        path: 'alarm',
        name: 'alarm',
        component: () => import('@/view/alarm-center/index'),
        meta: {
          title: 'alarmCenter',
          // icon: 'peoples'
        },
      },
      {
        path: 'linkage',
        name: 'linkage',
        component: () => import('@/view/linkage-center/index'),
        meta: {
          title: 'linkageCenter',
          // icon: 'peoples'
        },
      },
    ],
  },
  //钱包管理
  {
    path: '/wallet',
    component: Layout,
    redirect: '/wallet/walletmanage',
    name: 'wallet',
    meta: {
      title: 'walletManage',
      icon: 'component',
    },
    children: [
      {
        path: 'walletmanage',
        name: 'walletmanage',
        component: () => import('@/view/walle-manage/index'),
        meta: {
          title: 'walletAccount',
          // icon: 'user'
        },
      }, {
        path: 'walletmanage',
        name: 'walletmanage',
        component: () => import('@/view/walle-manage/index'),
        meta: {
          title: 'walletAccount',
          // icon: 'user'
        },
      }
    ],
  },
  // 系统管理
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'system',
    meta: {
      title: 'systemManage',
      icon: 'component',
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/view/user-manage/index'),
        meta: {
          title: 'userManage',
          // icon: 'user'
        },
      }, {
        path: 'role',
        name: 'role',
        component: () => import('@/view/role-manage/index'),
        meta: {
          title: 'roleManage',
          // icon: 'user'
        },
      }, {
        path: 'department',
        name: 'department',
        component: () => import('@/view/department-manage/index'),
        meta: {
          title: 'departmentManage',
          // icon: 'user'
        },
      }
    ],
  },
  // 新闻管理
  {
    path: '/news',
    component: Layout,
    redirect: '/news/newsManage',
    name: 'news',
    meta: {
      title: 'newsManage',
      icon: 'component',
    },
    children: [
      {
        path: 'newsManage',
        name: 'newsManage',
        component: () => import('@/view/news-center/index'),
        meta: {
          title: 'newsCenter',
          // icon: 'user'
        },
      },
      {
        path: 'newsManage',
        name: 'newsManage',
        component: () => import('@/view/news-center/index'),
        meta: {
          title: 'newsCenter',
          // icon: 'user'
        },
      }
    ],
  },
  // 设备组管理
  {
    path: '/patrol',
    component: Layout,
    redirect: '/patrol/patrolManage',
    name: 'news',
    meta: {
      title: 'patrolManage',
      icon: 'component',
    },
    children: [
      {
        path: 'patrolManage',
        name: 'patrolManage',
        component: () => import('@/view/device-group/index'),
        meta: {
          title: 'deviceGroup',
          // icon: 'user'
        },
      },
      {
        path: 'patrolEquipment',
        name: 'patrolEquipment',
        component: () => import('@/view/patrol-equipment/index'),
        meta: {
          title: 'patrolEquipment',
          // icon: 'user'
        },
      },
      {
        path: 'patrolEquipmentType',
        name: 'patrolEquipmentType',
        component: () => import('@/view/patrol-equipmentType/index'),
        meta: {
          title: 'patrolEquipmentType',
          // icon: 'user'
        },
      }, {
        path: 'patrolPlan',
        name: 'patrolPlan',
        component: () => import('@/view/patrol-plan/index'),
        meta: {
          title: 'patrolPlan',
          // icon: 'user'
        },
      }, {
        path: 'patrolTask',
        name: 'patrolTask',
        component: () => import('@/view/patrol-task/index'),
        meta: {
          title: 'patrolTask',
          // icon: 'user'
        },
      },{
        path: 'patrolRecord',
        name: 'patrolRecord',
        component: () => import('@/view/patrol-record/index'),
        meta: {
          title: 'patrolRecord',
          // icon: 'user'
        },
      },{
        path: 'maintainTask',
        name: 'maintainTask',
        component: () => import('@/view/maintain-task/index'),
        meta: {
          title: 'maintainTask',
          // icon: 'user'
        },
      },{
        path: 'scrapTask',
        name: 'scrapTask',
        component: () => import('@/view/scrap-task/index'),
        meta: {
          title: 'scrapTask',
          // icon: 'user'
        },
      },
    ],
  },
];
