const notfound = r => require.ensure([], () => r(require('../views/notfound/notfound')), 'notfound'); // 404
const home = r => require.ensure([], () => r(require('../views/home/home')), 'home'); // 首页
const zqGroupF = r => require.ensure([], () => r(require('../views/action-file/action.fir')), 'zqGroupF'); // 只有一级的内容
const zqGroupS = r => require.ensure([], () => r(require('../views/action-file/action.sec')), 'zqGroupS'); // 只有二级的内容
const zqGroupT = r => require.ensure([], () => r(require('../views/action-file/action.thi')), 'zqGroupT'); // 只有三级的内容
const detail = r => require.ensure([], () => r(require('../views/search/search')), 'detail'); // 详情
const search = r => require.ensure([], () => r(require('../views/detail/detail')), 'search'); // 搜索

const routes = [
  {
    path: '/',
    name: 'index',
    redirect: "/home",
  },{
    path: '/home',
    name: 'index',
    component: home,
    meta: { navLeftHide: true, tabID:'home_tb', title: '首页', keepAlive: true, level:1 }
  },{
    path: '/group/:firstId',
    name: 'group',
    component: zqGroupF,
    meta: { navLeftHide: false, tabID:'group_tb', title: '一级', keepAlive: false, level:1 }
  },{
    path: '/group/:firstId/:secondId',
    name: 'group',
    component: zqGroupS,
    meta: { navLeftHide: false, tabID:'group_tb', title: '二级', keepAlive: false, level:1 }
  },{
    path: '/group/:firstId/:secondId/:thirdId',
    name: 'group',
    component: zqGroupT,
    meta: { navLeftHide: false, tabID:'group_tb', title: '三级', keepAlive: false, level:1 }
  },{
    path: '/detail/:id',
    name: 'detail',
    component: detail,
    meta: { navLeftHide: true, tabID:'group_tb', title: '详情页', keepAlive: false, level:1 }
  },{
    path: '/search/:keyWord',
    name: 'search',
    component: search,
    meta: { navLeftHide: true, tabID:'group_tb', title: '三级', keepAlive: false, level:1 }
  },{
    path: '*',
    component: notfound,
    meta: { title: '404', level: 1 }
  }
]

export default routes;
