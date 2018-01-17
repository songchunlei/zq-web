<template>
    <el-container class="tags-el-c c-mian theme-bg theme-border m-t-md">
        <el-header class="headerBox" style="margin-top: -1px;">
            <ul class="tags-box">
                <li>
                    <a :class="{'active':'000000' == activeId}" href="javascript:void(0)" @click="menuClick(0, '000000')">首页</a>
                </li>
                <li v-for="(item, index) in menus" :key="item.id">
                    <a href="javascript:void(0)" :class="{'active':item.id == activeId}" @click="menuClick(index + 1, item.id)">{{item.name}}</a>
                </li>
            </ul>
        </el-header>
    </el-container>
</template>

<script>
import api from '@/api';
import store from '@/store/store';

export default {
    name: 'zq-header',
    data () {
        return {
            menus: '', // 系统所有菜单
            activeId: '000000', // 当前选中的 一级菜单ID
        }
    },
    mounted () {
        this.getMenus();
    },
    methods: {
        getMenus () {
            let _this = this;
            api.getMenusApi(function (res) {
                let json = res.data;
                if (json.success) {
                    _this.menus = json.data.tags;
                    _this.$store.commit('MENUS_SAVE', _this.menus); // 保存菜单
                }
            });
        },

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

        // 头部菜单点击
        menuClick (index, id) {
            if (id && id == this.activeId) {
                return;
            }
            this.activeId = id;
            let menus = this.menus;
            if (index > 0) {
                index--;
                let activeMenu = menus[index];
                if (activeMenu) {
                    this.$store.commit('ACTIVE_MENUS_SAVE', activeMenu); // 保存当前选中的一级菜单
                    this.$router.push({ path: '/zqino' });
                }

                //TODO 路由到非首页
            } else { // 点击的首页 
                //TODO 路由到首页
                this.activeId = '000000';
                this.$router.push({ path: '/home' })
            }
        },

        // 点击侧边导航
        clickAside () {
        
        }
    }
}
</script>

<style lang="scss">
@import '../../assets/css/app.scss';

.el-header.headerBox {
    height: $header-height !important;
}
</style>