<template>
    <div id="homeBox" class="text-center overflow-h">
      <el-carousel indicator-position="inside" height="350px" class="bannerBox">
        <el-carousel-item v-for="(item, index) in banners" :key="item.id">
          <img :src="item.imgUrl"/>
        </el-carousel-item>
      </el-carousel>
      
      <div class="c-main-box block-center m-t-sm">
        <el-row :gutter="40">
          <el-col :span="12">
            <div class="grid-content fixed-height bg-purple">
              <el-tabs v-model="activeOneIndex" @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in firstTabs" :label="item.name" :name="item.id">
                  <ul class="tab-list-box">
                    <li v-for="(item, index) in tabList" v-if="index <= 5">
                      <router-link :to="{path: '/detail/' + item.id}">
                        <el-row :gutter="20">
                          <el-col :span="18">
                            <span class="line-titile"><i class="iconfont icon-arrow-left-copy"></i>{{item.title}}</span>
                          </el-col>
                          <el-col :span="6">
                            <span class="line-titile text-right">{{item.createTime}}</span>
                          </el-col>
                        </el-row>
                      </router-link>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content fixed-height bg-purple ">
              <el-tabs v-model="activeTwoIndex" @tab-click="handleClick">
                <el-tab-pane label="集团风采" name="first">
                  <el-carousel type="card" indicator-position="inside" height="350px" class="bannerBox">
                    <el-carousel-item v-for="(item, index) in banners" :key="item.id">
                      <img :src="item.imgUrl"/>
                    </el-carousel-item>
                  </el-carousel>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row :gutter="60" class="homeBtns m-t-md">
        <el-col :span="2">&nbsp;</el-col>
        <el-col :span="4" v-for="(item, index) in homeBtns">
          <router-link class="i-span" :to="{path: item.link}">
            <i :class="'iconfont ' + item.icon"></i>
            <span>{{item.name}}</span>
          </router-link>
        </el-col>
        <el-col :span="2">&nbsp;</el-col>
      </el-row>

      <div class="c-main-box block-center m-t-sm">
        <el-row :gutter="60" class="m-t-md">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-tabs v-model="activeThreeIndex" @tab-click="handleClick">
                <el-tab-pane label="成员单位" name="firstT">
                  <ul class="member-box">
                    <li v-for="(item, index) in members">
                      <a href="javascript:void(0);">{{item.name}}</a>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
import api from '@/api';

// 第一个模块的标题
const firstTabs = () => [
  { name: '集团新闻', id: 'tab1', type: 'news', dataUrl: ''},
  { name: '媒体报道', id: 'tab2', type: 'newsbd', dataUrl: ''},
  { name: '热点专题', id: 'tab3', type: 'newshot', dataUrl: ''},
  { name: '正常法规', id: 'tab4', type: 'newsfg', dataUrl: ''}
]

// 第一个模块的标题
const homeBtns = () => [
  { name: '酒店', id: '001', icon: 'icon-jiudian', link: ''},
  { name: '培训中心', id: '002', icon: 'icon-peixunzhongxin', link: ''},
  { name: '养老休闲', id: '003', icon: 'icon-leisure', link: ''},
  { name: '长租公寓', id: '004', icon: 'icon-gongyuyuding', link: ''},
  { name: '物业租赁', id: '005', icon: 'icon-lease', link: ''}
]

// 成员单位
const members = () => [
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" },
  { name: "浙勤西溪宾馆", link: "" }
]

export default {
  data () {
    return {
      banners: [], // 跑马灯
      firstTabs: firstTabs(),
      activeOneIndex: '',
      activeTwoIndex: 'first',
      activeThreeIndex: 'firstT',

      tabDataUrl: '', // 获取第一栏位数据的 地址
      tabList: [], // 数据

      homeBtns: homeBtns(), // 快捷菜单
      members: members(), // 成员单位
    }
  },
   components: {
  },
  watch: {
    activeOneIndex () {
      for (let i=0;i<this.firstTabs.length;i++) {
        if (this.firstTabs[i].id === this.activeOneIndex) {
          this.getTabList(this.firstTabs[i].url || this.tabDataUrl, this.activeOneIndex);
        }
      }
      
    }
  },
  mounted () {
    this.getBanners();
    this.init();
  },
  methods: {
    init () {
      this.activeOneIndex = this.firstTabs[0].id;
    },
    getBanners () {
      let _this = this;
      api.getBannersApi(function (res) {
        _this.banners = res.data.data.banners;
      })
    },
    // 获取列表数据
    getTabList (url, id) {
      debugger;
      let _this = this;
      api.getTabListDataApi(url, id, function (res) {
        _this.tabList = res.data.data
      })
    },

    handleClick () {

    }
  }
}
  
</script>

<style lang="scss">
  @import '../../assets/css/app.scss';

 .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
  .el-tabs__item {
    font-size: 17px;
    font-weight: 600;
  }
  .c-main-box { 
    width: $c-size;
  }
  ul.tab-list-box{
    display: block;
    width: 100%;
    text-align: left;
  }
  ul.tab-list-box>li {
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    position: relative;
    font-size: 14px;
    border-bottom: #e5e5e5 solid 1px;
  }
  ul.tab-list-box>li:first-child~li{
    
  }
  .line-titile {
    color: $title-color;
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis; 
    white-space: nowrap;
    display: inline-block;
  }
  .line-titile:hover {
    color: $title-color-active;
  }
  .fixed-height .el-tabs__content{
    height: 250px;
  }

  .i-span {
    text-align: center;
    display: block;
    padding: 10px;
  }
  .i-span>i {
    color: $theme-color;
    margin: 0 auto 20px;
  }
  .homeBtns i{
    font-size: 60px;
    font-weight: 600;
  }
  .homeBtns span{
    color: #000;
    font-weight: 600;
    display: block;
    margin-top: 25px;
    font-size: 20px;
    letter-spacing: 1px;
  }
  .homeBtns{
    height: 290px;
    background: #f5f5f5;
    padding-top: 60px;
  }
  ul.member-box {
    display: block;
    padding: 4px 0;
    text-align: left;
  }
  ul.member-box>li {
    height: 30px;
    display: inline-block;
    line-height: 30px;
  }
  ul.member-box>li:first-child~li{
    margin-left: 10px;
  }
  ul.member-box>li>a{
    text-align: center;
    color: $title-color;
  }
  ul.member-box>li>a:hover{
    color: $title-color-active
  }
</style>