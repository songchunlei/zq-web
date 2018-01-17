const state = {
    menus: [], // 系统菜单
    activeMenu: {}, // 当前选中的一级菜单
    activeMenuEnd: {} // 当前选中的最后一级菜单
}

const mutations = {
    // 保存菜单栏
    ['MENUS_SAVE'] (state, menus){
        state.menus = menus;
    },
    // 清空菜单栏
    ['MENUS_DELETE'] (state){
        state.menus = null;
    },

    // 保存选中的一级菜单
    ['ACTIVE_MENUS_SAVE'] (state, activeMenu){
        state.activeMenu = activeMenu;
    },
    // 清空选中的一级菜单
    ['ACTIVE_MENUS_DELETE'] (state){
        state.activeMenu = null;
    },

    // 保存选中的最后一级菜单
    ['ACTIVE_MENUS_END_SAVE'] (state, activeMenuEnd){
        state.activeMenuEnd = activeMenuEnd;
    },
    // 清空选中的最后一级菜单
    ['ACTIVE_MENUS_END_DELETE'] (state){
        state.activeMenuEnd = null;
    },
}

export default {
    state,
    mutations
}
