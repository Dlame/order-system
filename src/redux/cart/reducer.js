import { CART_ADD, CART_REMOVE, CART_UPDATE } from '../types';

let initState = { cart: [] };

export default function shopCar(state = initState, action) {
	const { type, payload } = action;
	switch (type) {
		case CART_ADD:
			return {
				...state,
				cart: [...state.cart, payload]
			};
		case CART_UPDATE:
			return {
				...state,
				cart: state.cart.map(item => (item.id === payload.id ? payload : item))
			};
		case CART_REMOVE:
			return {
				...state,
				cart: state.cart.filter(item => item.id !== payload)
			};
		default:
			return state;
	}
}
