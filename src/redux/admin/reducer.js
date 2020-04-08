import { USER_LOGIN, USER_LOGIN_OUT } from '../types';
import { save, get, remove } from '@/utils/storage';

let initState = {
	token: ''
};

const adminInfo = get('adminInfo');

if (adminInfo) {
	initState = { ...initState, ...adminInfo };
}

export default function userReducer(state = initState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOGIN:
			const token = payload.data;
			save('adminInfo', { token });
			return { ...state, token };
		case USER_LOGIN_OUT:
			remove('adminInfo');
			return { ...state, token: '' };
		default:
			return state;
	}
}
