<template>
    <div id="unhomeBox">
      <el-container class="c-main-box m-t-md">
        <el-aside v-if="!$route.meta.navLeftHide" width="240px">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                <template slot="title">{{activeName}}</template>
                
                <el-menu-item-group>
                    <el-menu-item v-for="(item, index) in asideMenus" :class="{'active':activeJsonId==item.id}" :key="item.id" @click="clickAside(item)" index="1-1">{{item.name}}</el-menu-item>
                </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
          <el-header class="h-full w-full p-l-lg">
              <h2 class="line-head text-right theme-color b-b">{{activeName}}</h2>
          </el-header>
          <transition name="el-fade-in">
              <el-main id="zqChildRouterBox">
                <keep-alive>
                <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
              </el-main>
          </transition>
        </el-container>
      </el-container>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import store from '@/store/store';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
export default {
  data () {
    return {
      id: '', // 业务id
      activeId: '',

      activeName: '', // 选中的一级菜单的名字
      asideMenus: '', // 左侧菜单列表
      params: '', // 路由后缀
      activeJson: '', // 选中的最后一级json
      activeJsonId: '', // 选中的最后一级json 的ID
      doMounted: true
    }
  },
  components: {
  },
  computed: {
    ...mapState({
        activeMenu: store => store.action.activeMenu,
    })
  },
  watch: {
    activeMenu () {
      this.doMounted = false;
      this.getJsonById();
    },
    activeJsonId () {
      this.init();
    }
  },
  created () {
    
    
  },
  mounted () {
    // 路由进入后查看地址是否含有id 没有则 默认第一个
    // TODO 检查路由params
    if (this.doMounted) {
      this.menuChange = true;
      this.id = this.getLastValue(this.$route.params);
      this.getJsonById(this.id);
    }
    
  },

  methods: {
    init () {
      this.id = this.activeJsonId; // 目前是二级菜单 应该获取最后一个菜单
      this.activeName = this.activeMenu.name; // 一级菜单名

      this.splitJointId(this.activeMenu); // 拼接 路由 后缀
      
      this.$store.commit('ACTIVE_MENUS_END_SAVE', this.activeJson); // 保存当前选中最后一级json
       this.$router.push({ path: '/zqinoChild' + this.params });
    },

    getJsonById (id) { // 根据id 选则当前选中json
      let childrens = this.activeMenu.childrens;
      if (childrens && childrens.length > 0) {
        this.asideMenus = childrens;
        if (id && id!="") {
          for (let i=0;i<childrens.length;i++) {
            if (childrens[i].id == id) {
                this.activeJson = childrens[i];
            }
          }
        } else {
          this.activeJson = childrens[0];
        }
        this.activeJsonId = this.activeJson.id;
      } else {
        this.activeJsonId = "";
        this.asideMenus = [];
      }
    },
    
    // 组装 后缀Id 进行路由跳转
    splitJointId (menu, params) {
      params = params || '';
      params += '/' + menu.id;
      if (menu.childrens && menu.childrens.length > 0) {
        this.splitJointId(menu.childrens[0], params);
      } else {
        this.params = params;
      }
    },
    // 获取json最后一个value
    getLastValue (data) {
      let value = '';
      for (let key in data) {
        value = data[key];
      }
      return value;
    },
    // 点击侧边导航
    clickAside (json) {
      this.$store.commit('ACTIVE_MENUS_END_SAVE', this.activeJson); // 保存当前选中最后一级json
      this.activeJson = json;
      this.activeJsonId = this.activeJson.id;
    }
  }
}
  
</script>

<style lang="scss">
@import '../../assets/css/app.scss';

#unhomeBox {
  min-height: 500px;
}
</style>