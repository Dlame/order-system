import { message } from 'antd';
import { CART_ADD, CART_REMOVE, CART_UPDATE } from '../types';

export const addToCart = payload => {
	message.success('添加成功');
	return {
		type: CART_ADD,
		payload
	};
};

export const removeFromCart = id => {
	message.success('删除成功');
	return {
		type: CART_REMOVE,
		payload: id
	};
};

export const updateCart = payload => {
	return {
		type: CART_UPDATE,
		payload: payload
	};
};
