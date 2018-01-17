<template>
  <div class="main source" style="height: 100%;" v-show="mainShow">
    <el-container class="is-vertical c-mian">
      <zq-top></zq-top>
      <zq-header></zq-header>
      
      <transition name="el-fade-in-linear">
        <el-main id="zqRouterBox">
          <keep-alive>
          <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </transition>
      

      <el-container class="c-mian footerContainer m-t-md">
        <zq-footer></zq-footer>
      </el-container>
      <el-container class="bottomContainer">
      <zq-bottom></zq-bottom>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import api from './api';
import zqTop from '@/components/site-structure/top';
import zqHeader from '@/components/site-structure/header';
import zqFooter from '@/components/site-structure/footer';
import zqBottom from '@/components/site-structure/bottom';
export default {
  name: 'app',
  data () {
    return {
      mainShow: true,
      show: true
    }
  },
  components: {
    zqTop,
    zqHeader,
    zqFooter,
    zqBottom
  },
  computed: {
	},
  mounted () {
    this.$router.push({path: '/home'});
  },
  methods: {
    
  }
}
</script>

<style lang="scss">
@import './assets/css/app.scss';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    height: 900px;
  }
  .el-container.c-mian>.el-header,.el-container.c-mian>.el-footer{ width: $c-size }
  .el-container>.el-main{ width: 100% }
  .el-header,.el-main,.el-footer{margin: 0 auto; padding: 0px; }
  .logo-box{ width: 50% }
  .top-header{ padding: 10px 0; position: relative }
  .logo-box>img{ height: 70px; position: absolute; left: 0px}
  .search-box{ position: absolute; right: 0px; bottom: -10px; }
  .search-box>.el-input{
    vertical-align: top;
  }
  .search-box>.i-box{
    background: primary
  }
  .tags-box{
    width: 100%;
    display: block;
    line-height: $header-height;
    color: #fff;
  }
  .tags-box>li{
    display: inline-block;
    cursor: pointer;
    text-align: center;
  }
  .tags-box>li>a{
    padding: 0px 20px;
    font-size: 17px;
    width: 70px;
    display: block;
    color: #fff;
    height: 100%;
  }
  .tags-box>li>a.active{
    background: #fff;
    color: $theme-color
  }
  .tags-el-c{
    padding: 1px 0 0
  }
  div.el-submenu__title{
    background: $theme-color;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    height: 60px;
    line-height: 60px;
  }
  .el-submenu .el-menu-item{
    background: #f7f7f7;
  }
  .el-menu-item{
    border-bottom: 1px solid #bbb;
    border-left: 1px solid #bbb;
    border-right: 1px solid #bbb;
  }
  .el-menu-item-group__title{
    padding: 0px;
    padding-left: 40px;
  }
  .el-submenu .el-menu-item.active{
    border-right: 2px solid $theme-color;
    background: #fff;
  }
  .footerContainer{
    background: #777;
    padding: 20px 0px;
  }
</style>
