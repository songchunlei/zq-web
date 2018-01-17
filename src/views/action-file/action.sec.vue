<template>
    <el-container id="muenSecondBox" class="m-t-md w-full m-b-80 p-l-lg">
        <el-main class="m-t-md">
            <zq-list :json="activeMenuEnd" :params="params" v-if="type == 'list'"></zq-list>
            <zq-text :json="activeMenuEnd" :params="params" v-if="type == 'text'"></zq-text>
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
            params: '', // 请求数据的参数
        }
    },
    components: {
        zqText,
        zqList
    },
    computed: {
		...mapState({
            activeMenuEnd: state => state.action.activeMenuEnd
        })
	},
    mounted () {
        this.type = this.activeMenuEnd.type;
    },
    watch: {
        activeMenuEnd () {
            this.type = this.activeMenuEnd.type;
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>