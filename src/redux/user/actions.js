import { USER_LOGIN, USER_LOGIN_OUT } from '../types';
import { message } from 'antd';
import { $axios } from '@/utils/interceptor';

export const login = (params) => {
  return (dispatch) =>
    $axios.post('/api/login', params).then((res) => {
      let data = res.data;
      dispatch({
        type: USER_LOGIN,
        payload: data,
      });
      message.success(`登录成功, 欢迎您 ${data.name}`);
    });
};

export const register = (params) => {
  return (dispatch) =>
    $axios.post('/api/register', params).then((res) => {
      message.success('注册成功，请重新登录您的账号！');
    });
};

export const loginout = () => ({
  type: USER_LOGIN_OUT,
});
