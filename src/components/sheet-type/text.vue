<template>
    <div id="coverList">
        <div class="htmlBox" v-html="textData.desc">
        </div>
    </div>
</template>

<script>
import api from '@/api';

export default {
    name: 'zq-text',
    data () {
        return {
            textData: '', // 文本数据
        }
    },
    props: ['json', 'params', 'type'],
    computed: {

    },
    mounted () {
        this.getTextData();
    },
    watch: {
        json (val) {
            this.getTextData();
        }
    },
    methods: {
        // 获取列表数据
        getTextData () {
          let _this = this;
          let json = this.json;
          let params = this.params || {};
          api.getTextDataApi(json.url, params, function (res) {
            _this.textData = res.data.data;
          })
        },
        
    }
}
</script>

<style lang="scss">
.htmlBox{
    font-size: 14px;
}
</style>