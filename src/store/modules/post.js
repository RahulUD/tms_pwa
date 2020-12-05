import {
  ERROR,
  LOADING,
  POSTS_FAILED,
  POSTS_RECEIVE,
  POSTS_REQUEST,
  POST_REQUEST,
  POST_RECEIVE,
  POST_FAILED
} from '../../utility/actionType';
import Posts from '../../utility/api/Posts';

const state = {
  posts: [],
  post: {},
  loading: false,
  failed: false
};
const getters = {
  getAllPosts: (state) => state.posts,
  getPostById: (state) => state.post
};
const actions = {
  async getPosts({ commit }, payload) {
    commit(POSTS_REQUEST);
    commit(LOADING, true);
    Posts.getPosts(payload)
      .then(function(response) {
        if (response.data.code === 200) {
          commit('TOAST', { code: response.data.code, title: 'Success', message: response.data.message });
          commit(POSTS_RECEIVE, response);
          commit(LOADING, false);
        } else {
          commit(POSTS_FAILED, response);
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

  async getPost({ commit }, payload) {
    commit(POST_REQUEST);
    commit(LOADING, true);
    Posts.getPost(payload)
      .then(function(response) {
        if (response.data.code === 200) {
          commit('TOAST', { code: response.data.code, title: 'Success', message: response.data.message });
          commit(POST_RECEIVE, response);
          commit(LOADING, false);
        } else {
          commit(POST_FAILED, response);
          commit('TOAST', { code: response.data.code, title: 'Worning', message: response.data.message });
          commit(LOADING, false);
        }
      })
      .catch(function(error) {
        commit(ERROR, error);
        commit('TOAST', { code: 400, title: 'Fail', message: error.message });
        commit(LOADING, false);
      });
  }
};
const mutations = {
  POSTS_REQUEST: (state) => ((state.posts = []), (state.loading = true), (state.failed = false)),
  POSTS_RECEIVE: (state, payload) => (
    (state.posts = payload.data.result.posts), (state.loading = false), (state.failed = false)
  ),
  POSTS_FAILED: (state) => ((state.posts = []), (state.loading = false), (state.failed = true)),

  POST_REQUEST: (state) => ((state.post = {}), (state.loading = true), (state.failed = false)),
  POST_RECEIVE: (state, payload) => (
    (state.post = payload.data.result.post), (state.loading = false), (state.failed = false)
  ),
  POST_FAILED: (state) => ((state.post = {}), (state.loading = false), (state.failed = true))
};
export default {
  state,
  getters,
  actions,
  mutations
};
