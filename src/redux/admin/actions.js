import { USER_LOGIN, USER_LOGIN_OUT } from '../types';
import { message } from 'antd';
import { $axios } from '@/utils/interceptor';

export const login = (params) => {
  return (dispatch) =>
    $axios.post('/adm/login', params).then((res) => {
      dispatch({
        type: USER_LOGIN,
        payload: res,
      });
      message.success('登录成功, 欢迎您');
      return res;
    });
};

export const loginout = () => ({
  type: USER_LOGIN_OUT,
});
