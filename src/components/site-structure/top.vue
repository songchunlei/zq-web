<template>
    <el-header class="top-header" height="60px">
        <div class="logo-box">
            <img src="static/images/logo.png"/>
        </div>

        <div class="search-box">
            <el-input v-model="searchKey" size="small" placeholder="请输入内容">
            <el-button type="primary" slot="append" size="mini"><i class="iconfont icon-sousuo"></i></el-button>
            </el-input>
        </div>
    </el-header>
</template>

<script>


export default {
    name: 'zq-top',
    data () {
        return {
            searchKey: '', // 搜索关键字
        }
    },
    methods: {

    },
}
</script>

<style>

</style>