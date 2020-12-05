import Api from './Api';
import { POSTS, PAGINATION, POST } from './Endpoints';

export default {
  getPosts(payload) {
    return Api().get(POSTS + PAGINATION + payload);
  },
  getPost(payload) {
    return Api().get(POST + payload);
  }
};
