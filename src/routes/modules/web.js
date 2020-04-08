import Layout from '@/layout/web';
import Home from '@/views/web/home';
import ShoppingCart from '@/views/web/cart';
import Order from '@/views/web/order';

import lazy from '@/components/Lazy';

export default {
	path: '/',
	name: 'home',
	component: Layout,
	childRoutes: [
		{ path: '', component: Home },
		{ path: '/shoppingCart', component: ShoppingCart },
		{ path: '/myorder', component: Order },
		{ path: '*', component: lazy(() => import('@/components/NotFound')) }
	]
};
