import { CART_ADD, CART_REMOVE, CART_UPDATE } from '../types';

export const addToCart = (payload) => {
  return {
    type: CART_ADD,
    payload,
  };
};

export const removeFromCart = (id) => {
  return {
    type: CART_REMOVE,
    payload: id,
  };
};

export const updateCart = (payload) => {
  return {
    type: CART_UPDATE,
    payload: payload,
  };
};

export const updateCartCount = (id, count, amount) => {
  return {
    type: CART_UPDATE,
    payload: { id, count, amount },
  };
};
