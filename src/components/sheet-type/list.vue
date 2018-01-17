<template>
    
    <div id="coverList">
        <ul class="tab-list-box">
            <li v-for="(item, index) in listData" v-if="index <= pageSize-1">
                <router-link href="javascript:void(0);" :to="{ path: '/detail/' + item.id }">
                <el-row :gutter="20">
                    <el-col :span="18">
                    <span class="line-title"><i class="iconfont icon-arrow-left-copy"></i>{{item.title}}</span>
                    </el-col>
                    <el-col :span="6">
                    <span class="line-title text-right">{{item.createTime}}</span>
                    </el-col>
                </el-row>
                </router-link>
            </li>
        </ul>
        <el-pagination class="m-t-md" @current-change="handleCurrentChange"
           :page-size="pageSize" background layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
</template>

<script>
import api from '@/api';

export default {
    name: 'zq-list',
    data () {
        return {
            listData: [], // 列表数据
            total: 0, // 总条数
            pageSize: 10, // 每页显示条数
        }
    },
    props: ['json', 'params', 'type'],
    computed: {

    },
    watch: {
        json (val) {
            this.getListData();
        }
    },
    mounted () {
        this.getListData();
    },
    methods: {
        // 获取列表数据
        getListData () {
          let _this = this;
          let json = this.json;
          let params = this.params || {};
          api.getListDataApi(json.url, params, function (res) {
            _this.listData = res.data.data;
            _this.total = res.data.data.length;
          })
        },

        handleCurrentChange () {

        }
        
    }
}
</script>


<style lang="scss">

</style>