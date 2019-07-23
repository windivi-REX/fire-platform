import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/Layout';
import RouteViewContainer from '@/views/layout/container/route-view-container';
Vue.use(Router);
export const constantRouterMap = [
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },
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
  // 设备监控
  {
    path: '/',
    component: Layout,
    redirect: '/gisMap',
    name: 'monitor',
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
          icon: 'component',
        },
      },
      {
        path: 'alarmCenter',
        name: 'alarmCenter',
        component: RouteViewContainer,
        meta: {
          title: 'alarmCenter',
          icon: 'component',
          hidden: true,
        },
        children: [
          {
            path: 'realTimeMsg',
            component: () => import('@/view/real-time-msg/index'),
            meta: {
              title: 'realTimeMsg',
              icon: 'component',
            },
          },
          {
            path: 'historyMsg',
            component: () => import('@/view/history-msg/index'),
            meta: {
              title: 'historyMsg',
              icon: 'component',
            },
          },
        ],
      },
      //   {
      //     path: 'linkage',
      //     name: 'linkage',
      //     component: () => import('@/view/linkage-center/index'),
      //     meta: {
      //       title: 'linkageCenter',
      //       // icon: 'peoples'
      //     },
      //   },
    ],
  },
  {
    path: '/device-center',
    component: Layout,
    redirect: '/device-center/manage',
    name: 'DeviceCenter',
    meta: {
      title: 'deviceCenter',
      icon: 'component',
    },
    children: [
      {
        path: 'fire-distribution',
        component: () => import('@/view/fire-distribution/index'),
        meta: {
          title: 'fireDistribution',
          icon: 'component',
        },
      },
      {
        path: 'list',
        component: () => import('@/view/device-list/index'),
        meta: {
          title: 'deviceList',
          icon: 'component',
        },
      },
      {
        path: 'parts-marked',
        component: () => import('@/view/parts-marked/index'),
        meta: {
          title: 'partsMarked',
          icon: 'component',
        },
      },
      {
        path: 'location-registration',
        component: () => import('@/view/location-registration/index'),
        meta: {
          title: 'locationRegistration',
          icon: 'component',
        },
      },
      {
        path: 'group-manage',
        name: 'DeviceGroupManage',
        component: () => import('@/view/device-group/index'),
        meta: {
          title: 'deviceGroup',
          icon: 'component',
        },
      },
    ],
  },
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
          icon: 'component',
        },
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/view/role-manage/index'),
        meta: {
          title: 'roleManage',
          icon: 'component',
        },
      },
    ],
  },
  {
    path: '/patrol',
    component: Layout,
    redirect: '/patrol/patrolPlan',
    name: 'news',
    meta: {
      title: 'patrolManage',
      icon: 'component',
    },
    children: [
      {
        path: 'patrolPlan',
        name: 'patrolPlan',
        component: () => import('@/view/patrol-plan/index'),
        meta: {
          title: 'patrolPlan',
          icon: 'component',
        },
      },
      {
        path: 'patrolTask',
        name: 'patrolTask',
        component: () => import('@/view/patrol-task/index'),
        meta: {
          title: 'patrolTask',
          icon: 'component',
        },
      },
      {
        path: 'patrolRecord',
        name: 'patrolRecord',
        component: () => import('@/view/patrol-record/index'),
        meta: {
          title: 'patrolRecord',
          icon: 'component',
        },
      },
      {
        path: 'maintainTask',
        name: 'maintainTask',
        component: () => import('@/view/maintain-task/index'),
        meta: {
          title: 'maintainTask',
          icon: 'component',
        },
      },
      {
        path: 'scrapTask',
        name: 'scrapTask',
        component: () => import('@/view/scrap-task/index'),
        meta: {
          title: 'scrapTask',
          icon: 'component',
        },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];
