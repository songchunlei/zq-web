import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import action from './modules/action';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    common,
    action
  }
})
