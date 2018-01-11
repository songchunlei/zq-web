// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/store';
import App from './App'

import '../theme/index.css'
import ElementUI from 'element-ui'

import mixin from './mixins'
import USP from './mixins/urlsearchparams';

import VueRouter from 'vue-router'
import routes from './router';

VueRouter.prototype.goBack = function () {
	this.isBack = true
	this.go(-1)
}
// 注册为全局组件
Vue.use(VueRouter);

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
const router = new VueRouter({
	// mode: 'history',
	// 'linkActiveClass': 'active',
	routes
});


new Vue({
  el: '#app',
  router,
  store,
  mixins: [mixin],
  render: h => h(App)
})
