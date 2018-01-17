<template>
    <div id="muenThird">
        
    </div>
</template>

<script>
import api from '@/api';
import { mapState, mapActions } from 'vuex';


export default {
    data () {
        return {
            id: '', // 业务id
            type: '', // 内容类型
        }
    },
    computed: {
		...mapState({
            menus: state => state.action.menus,
            actionMenu: state => state.action.actionMenu
        })
	},
    mounted () {
        this.init();
    },
    methods: {
        init () {
            this.id = this.$route.id;
            this.type = this.actionMenu.type;
        },
        getData () {
            if (this.type === 'list') {

            } else {

            }
        }
    }
}
</script>

<style>
</style>