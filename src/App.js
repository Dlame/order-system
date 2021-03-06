import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CommonComponent from '@/components/common';

// config
import routes from './routes';

function App() {
  const adminToken = useSelector((state) => state.admin.token);
  // const userToken = useSelector((state) => state.user.token);

  const renderRoutes = (routes, contextPath) => {
    const children = [];
    const renderRoute = (item, routeContextPath) => {
      // 根路径
      let newContextPath = item.path ? `${routeContextPath}/${item.path}` : routeContextPath;
      newContextPath = newContextPath.replace(/\/+/g, '/');
      // 未登录
      if (newContextPath.includes('admin') && !adminToken) {
        item = {
          ...item,
          component: () => <Redirect to="/login" />,
          children: [],
        };
      }
      // 未登录
      // if (
      //   (newContextPath.includes('myorder') || newContextPath.includes('shoppingCart')) &&
      //   !userToken
      // ) {
      //   item = {
      //     ...item,
      //     component: () => <Redirect to="/" />,
      //     children: [],
      //   };
      // }

      if (item.component) {
        if (item.childRoutes) {
          const childRoutes = renderRoutes(item.childRoutes, newContextPath);
          children.push(
            <Route
              key={newContextPath}
              render={(props) => <item.component {...props}>{childRoutes}</item.component>}
              path={newContextPath}
            />
          );
          item.childRoutes.forEach((r) => renderRoute(r, newContextPath));
        } else {
          children.push(
            <Route key={newContextPath} component={item.component} path={newContextPath} exact />
          );
        }
      }
    };
    routes.forEach((item) => renderRoute(item, contextPath));

    return <Switch>{children}</Switch>;
  };
  const children = renderRoutes(routes, '/');
  return (
    <BrowserRouter>
      {children}
      <CommonComponent />
    </BrowserRouter>
  );
}

export default App;
