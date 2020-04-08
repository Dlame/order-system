import webRoutes from './modules/web';
import adminRoutes from './modules/admin';
import othersRoutes from './modules/others';

export default [adminRoutes, ...othersRoutes, webRoutes];
