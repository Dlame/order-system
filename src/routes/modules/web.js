import Layout from '@/layout/web';
import Home from '@/views/web/home';

import lazy from '@/components/Lazy';

export default {
  path: '/',
  name: 'home',
  component: Layout,
  childRoutes: [
    { path: '', component: Home },
    // { path: 'article/:id', component: Article },
    // { path: 'archives', component: Archives },
    // { path: 'categories', component: Categories },
    // { path: 'categories/:name', component: List },
    // { path: 'tags/:name', component: List },
    // { path: '/github', component: GITHUB.enable && GithubLogining },
    // { path: '/about', component: About },
    { path: '*', component: lazy(() => import('@/components/NotFound')) },
  ],
};
