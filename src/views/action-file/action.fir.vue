<template>
    <el-container id="muenFirstBox" class="m-t-md w-full p-l-lg m-b-80">
        <el-main class="m-t-md">
            <zq-list :json="activeMenu" :params="params" v-if="type == 'list'"></zq-list>
            <zq-text :json="activeMenu" :params="params" v-if="type == 'text'"></zq-text>
        </el-main>
    </el-container>
</template>

<script>
import api from '@/api';
import zqList from '@/components/sheet-type/list';
import zqText from '@/components/sheet-type/text';
import { mapState, mapActions } from 'vuex';

export default {
    data () {
        return {
            id: '', // 业务id
            type: '', // 内容类型
            params: '' // 请求数据的参数
        }
    },
    components: {
        zqText,
        zqList
    },
    computed: {
		...mapState({
            menus: state => state.action.menus,
            activeMenu: state => state.action.activeMenu
        })
	},
    mounted () {
        this.type = this.activeMenu.type;
    },
    watch: {
        activeMenu () {
            this.type = this.activeMenu.type;
        }
    },
    methods: {
    }
}
</script>

<style>
</style>