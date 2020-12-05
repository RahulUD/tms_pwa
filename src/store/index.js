import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import post from './modules/post';
Vue.use(Vuex);
import state from './state';
import * as mutations from './mutations';
import * as getters from './getters';

export default new Vuex.Store({
  state,
  mutations,
  getters,
  modules: {
    auth,
    post
  }
});
