<template>
    <el-footer class="footBox">
      <ul class="footerBox">
        <li v-for="(item, index) in footerData" :style="'width:' + liWidth">
            <a href="javascript:void(0);" class="title">{{item.name}}</a>
            <ul class="childsBox">
                <li v-for="(citem, index) in item.childrens" :key="citem.id">
                    <a href="javascript:void();" @click="menuClick(index, citem.id)"> {{citem.name}} </a>
                    &nbsp;
                </li>
            </ul>
        </li>
      </ul>
      <!-- 
      <el-row class="footerBox">
        <el-col :span="2" v-for="(item, index) in footerData" :key="item.id">
            <a href="javascript:void(0);" class="title">{{item.name}}</a>
            <ul class="childsBox">
                <li v-for="(citem, index) in item.childrens" :key="citem.id">
                    <a href="javascript:void();" @click="menuClick(index, citem.id)"> {{citem.name}} </a>
                    &nbsp;
                </li>
            </ul>
            
        </el-col>
      </el-row>
      -->
    </el-footer>
</template>

<script>
import api from '@/api';
import { mapState, mapActions } from 'vuex';
import store from '@/store/store';

export default {
    name: 'zq-footer',
    
    data () {
        return {
            footerData: [], // 页脚数据
            liWidth: '', // 页脚列表平均宽度
        }
    },
    computed: {
		...mapState({
            menus: state => state.action.menus
        })
	},
    mounted () {
    },
    watch: {
        menus () {
           this.footerData = this.menus; 
           this.liWidth = Number(100/this.menus.length).toFixed(1) + '%';
        }
    },
    methods: {
        menuClick (index, id) {

        }
    }
}
</script>

<style>
@import '../../assets/css/app.scss';
.el-footer .el-col {
    padding: 0px !important;
}
.el-footer .title{
    color: #fff;
    display: block;
    font-size: 15px;
    margin-bottom: 15px;
    font-weight: 600;
}
.childsBox>li{
    margin-top: 6px;
}
.childsBox>li>a{
    text-align: left;
    color: #fff;
    font-size: 14px;
}
.footBox {
    height: auto !important;
}
.footerBox{
    width: 1200px;
    margin: 0 auto;
    display: block;
}
.footerBox>li{
    display: inline-block;
    vertical-align: text-top;
}
</style>