<template>
    <div id="coverList">
        <ul>
            <li c-for="(item, index) in listData">
                <router-link href="javascript:void(0);" :to="{ path: '/detail/' + item.id }">
                  <i class="iconfont icon-arrow-left-copy"></i>
                  <span>item.title</span>
                </router-link>
            </li>
        </ul>
        <el-pagination @current-change="handleCurrentChange"
          background layout="prev, pager, next" :total="1000">
        </el-pagination>
    <div>
</template>

<script>
import api from '@/api';

export default {
    name: 'zq-list',
    data () {
        return {
            listData: [], // 列表数据
        }
    },
    props: ['id', 'url'],
    computed {

    },
    mounted () {

    },
    motheds {
        // 获取列表数据
        getListData () {
          let _this = this;
          api.getListDataApi(this.url, this.id, function (res) {
            _this.listData = res.data.data.list;
          })
        },
        
    }
}
</script>

<style>

</style>