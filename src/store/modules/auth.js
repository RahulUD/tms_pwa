import { LOGIN_LOADING_TEXT } from './../../utility/Constants';
import {
  LOGIN_FAILED,
  LOGIN_RECEIVE,
  LOGIN_REQUEST,
  LOGIN_TOKEN_RECEIVE,
  LOGIN_TOKEN_REQUEST,
  LOGIN_TOKEN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_RECEIVE,
  LOGOUT_FAILED,
  ERROR,
  LOADING
} from './../../utility/actionType';
import Auth from './../../utility/api/Auth';
import router from '../../router';
const state = {
  isAuthSuccessful: false,
  isLoading: false,
  hasError: false,
  errors: [],
  token: '',
  user: {},
  message: LOGIN_LOADING_TEXT,
  codeBreak: false,
  code: 200
};
const getters = {
  getAuth: (state) => state
};
const actions = {
  async login({ commit }, payload) {
    commit(LOGIN_REQUEST);
    commit(LOADING, true);
    Auth.login(payload)
      .then(function(response) {
        if (response.data.code === 200) {
          localStorage.setItem('auth', response.data.result.token);
          commit('TOAST', { code: response.data.code, title: 'Success', message: response.data.message });
          commit(LOGIN_RECEIVE, response);
          commit(LOADING, false);
        } else {
          commit(LOGIN_FAILED, response);
          commit('TOAST', { code: response.data.code, title: 'Worning', message: response.data.message });
          commit(LOADING, false);
        }
      })
      .catch(function(error) {
        commit(ERROR, error);
        commit('TOAST', { code: 400, title: 'Fail', message: error.message });
        commit(LOADING, false);
      });
  },
  async user({ commit }, payload) {
    commit(LOGIN_TOKEN_REQUEST);
    commit('TOAST', { code: '300', title: 'title', message: 'message' });
    Auth.user(payload)
      .then(function(response) {
        commit(LOGIN_TOKEN_RECEIVE, response);
        commit('TOAST', { code: response.data.result.code, title: 'Success', message: response.data.result.message });
      })
      .catch(function(error) {
        commit(LOGIN_TOKEN_FAILED, error);
        commit('TOAST', { code: 400, title: 'Fail', message: error.message });
        localStorage.removeItem('auth');
      });
  },
  async logout({ commit }) {
    console.log('this is logout');
    commit(LOGOUT_REQUEST);
    commit(LOADING, true);
    Auth.logout()
      .then(function() {
        localStorage.removeItem('auth');
        commit('TOAST', { code: 200, title: 'Success', message: 'Logged out' });
        commit(LOGOUT_RECEIVE);
        commit(LOADING, false);
        router.push({ path: '/' });
      })
      .catch(function(error) {
        commit(LOGOUT_FAILED, error);
        commit('TOAST', { code: 400, title: 'Fail', message: 'Logged out Fail' });
        commit(LOADING, false);
      });
  }
};
const mutations = {
  LOGIN_REQUEST: (state) => (
    (state.isAuthSuccessful = false),
    (state.isLoading = true),
    (state.hasError = false),
    (state.errors = []),
    (state.token = ''),
    (state.user = {}),
    (state.message = LOGIN_LOADING_TEXT),
    (state.codeBreak = false),
    (state.code = 200)
  ),
  LOGIN_RECEIVE: (state, payload) => (
    (state.isAuthSuccessful = true),
    (state.isLoading = false),
    (state.hasError = false),
    (state.errors = []),
    (state.token = payload.data.result.token),
    (state.user = payload.data.result.user),
    (state.message = payload.data.message),
    (state.codeBreak = false),
    (state.code = 200)
  ),
  LOGIN_FAILED: (state, payload) => (
    (state.isAuthSuccessful = false),
    (state.isLoading = false),
    (state.hasError = true),
    (state.errors = []),
    (state.token = ''),
    (state.user = {}),
    (state.message = payload.data.message),
    (state.codeBreak = false),
    (state.code = 300)
  ),

  LOGIN_TOKEN_REQUEST: (state) => (state.isLoading = true),
  LOGIN_TOKEN_RECEIVE: (state, payload) => (
    (state.isAuthSuccessful = true),
    (state.user = payload.data),
    (state.token = localStorage.getItem('auth')),
    (state.isLoading = false)
  ),
  LOGIN_TOKEN_FAILED: (state) => (
    (state.isAuthSuccessful = false),
    (state.isLoading = false),
    (state.hasError = false),
    (state.errors = []),
    (state.token = ''),
    (state.user = {}),
    (state.codeBreak = true),
    (state.code = 400)
  ),
  LOGOUT_REQUEST: (state) => (state.isLoading = true),
  LOGOUT_RECEIVE: (state) => (
    (state.isAuthSuccessful = false),
    (state.isLoading = false),
    (state.hasError = false),
    (state.errors = []),
    (state.token = ''),
    (state.user = {}),
    (state.message = 'Logged out Successfully'),
    (state.codeBreak = false),
    (state.code = 200)
  ),
  LOGOUT_FAILED: () => ((state.hasError = true), (state.message = 'Logout Failed'), (state.code = 300)),
  ERROR: (state, payload) => (
    (state.isAuthSuccessful = false),
    (state.isLoading = false),
    (state.hasError = false),
    (state.errors = payload.errors),
    (state.token = ''),
    (state.user = {}),
    (state.message = payload.message),
    (state.codeBreak = true),
    (state.code = 400)
  )
};
export default {
  state,
  getters,
  actions,
  mutations
};
