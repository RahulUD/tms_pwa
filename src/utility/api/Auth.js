import Api from './Api';
import { LOGIN, USER, LOGOUT } from './Endpoints';

export default {
  login(payload) {
    return Api().post(LOGIN, payload);
  },
  user(payload) {
    return Api().post(USER, payload);
  },
  logout() {
    return Api().get(LOGOUT);
  }
};
