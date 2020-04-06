import Layout from '@/layout/admin';
import lazy from '@/components/Lazy';

export default {
  path: '/admin',
  name: 'admin',
  component: Layout,
  auth: true,
  childRoutes: [
    { path: '', component: lazy(() => import('@/views/admin/home')) },
		{ path: 'goods', component: lazy(() => import('@/views/admin/goods')) },
		{ path: 'order', component: lazy(() => import('@/views/admin/order')) },
    { path: 'rider', component: lazy(() => import('@/views/admin/rider')) },
    { path: 'user', component: lazy(() => import('@/views/admin/user')) },
  ],
};
