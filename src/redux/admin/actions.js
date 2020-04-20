import { USER_LOGIN, USER_LOGIN_OUT } from '../types';
import { message } from 'antd';
import { $axios } from '@/utils/interceptor';

export const login = (params, callback) => {
	return dispatch =>
		$axios.post('/adm/login', params).then(res => {
			if (res.code !== 200) {
				message.error(res.desc);
				return;
			}
			dispatch({
				type: USER_LOGIN,
				payload: res
			});
			typeof callback === 'function' && callback();
			message.success('登录成功, 欢迎您');
			return res;
		});
};

export const loginout = () => ({
	type: USER_LOGIN_OUT
});
