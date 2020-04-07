import { USER_LOGIN, USER_LOGIN_OUT } from '../types';
import { save, get, remove } from '@/utils/storage';

let initState = {
  userId: '',
  name: '',
  loginEmail: '',
  headUrl: '',
  token: '',
};

const userInfo = get('userInfo');

if (userInfo) {
  initState = { ...initState, ...userInfo };
}

export default function userReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOGIN:
      const { userId, name, loginEmail, headUrl, token } = payload;
      save('userInfo', { name, userId, loginEmail, headUrl, token });
      return { ...state, name, userId, loginEmail, headUrl, token };
    case USER_LOGIN_OUT:
      remove('userInfo');
      return { ...state, userId: '', name: '', loginEmail: '', headUrl: '', token: '' };
    default:
      return state;
  }
}
