<template>
    <el-container id="unhomeBox" class="m-t-md">
        <el-aside v-if="$route.meta.navLeftHide" width="220px">
        <el-menu :default-openeds="['1']">
            <el-submenu index="1">
            <template slot="title">{{activeName}}</template>
            
            <el-menu-item-group>
                <el-menu-item v-for="(item, index) in activeChilds" :class="{'active':!index}" :key="item.id" @click="clickAside(index)" index="1-1">{{item.name}}</el-menu-item>
            </el-menu-item-group>
            </el-submenu>
        </el-menu>
        </el-aside>
    </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import store from '@/store/store';

export default {
  data () {
    return {
      activeName: '', // 选中的一级菜单的名字
    }
  },
  components: {
  },
  computed: {
    ...mapState({
        activeChilds: store => store.action.activeChilds
    })
  },
  mounted () {
    if (this.activeChilds) {
      this.activeName = this.activeChilds.name;
    }
    
  },
  motheds: {
    // 根据id找到 active 对象
    getActive (id) {
      let menus = this.menus;
      for (let i=0;i<menus.length;i++) {
        if (menus[i] && menus[i].id == id) {
          return menus[i];
        }
      }
      return;
    },

    // 点击侧边导航
    clickAside () {
      
    }
  }
}
  
</script>

<style lang="scss">
#unhomeBox{
    widht: 1200px;
}
</style>