import { CART_ADD, CART_REMOVE, CART_UPDATE, CART_UPDATE_COUNT } from '../types';
import { message } from 'antd';

let initState = { cart: [] };

export default function shopCar(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case CART_ADD:
      const goods = state.cart.find((v) => v.id === payload.id);
      if (goods) {
        message.warn('请勿添加重复商品');
        return state;
      }
      message.success('添加成功');
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    case CART_UPDATE:
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === payload.id ? payload : item)),
      };
    case CART_REMOVE:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== payload),
      };
    case CART_UPDATE_COUNT:
      const updateCart = state.cart.find((v) => v.id === payload.id);
      updateCart.count = payload.count;
      updateCart.amount = payload.amount;
      return {
        ...state,
        cart: state.cart.map((item) => (item.id === payload.id ? updateCart : item)),
      };
    default:
      return state;
  }
}
