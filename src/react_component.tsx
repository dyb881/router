import React, { useMemo } from 'react';
import { Redirect, Route, Switch, matchPath, useHistory, useLocation } from 'react-router-dom';
import Transition from '@dyb881/transition';

interface IRouters {
  [index: string]: React.ComponentType<any>;
}

interface IProps {
  routers: IRouters; // 页面配置列表
  transition?: boolean; // 开启跳转动画
  app?: boolean; // 是否打包成APP，既启用app模拟跳转
}

/**
 * 注册路由
 */
const Router: React.SFC<IProps> = ({ app, transition, routers }) => {
  const location = useLocation();
  const history = useHistory();
  const keys = Object.keys(routers);

  const res = useMemo(
    () => (
      <Switch location={location} key={location.pathname}>
        {keys.map((item, index) => (
          <Route key={index} path={item} component={routers[item]} exact />
        ))}
        <Redirect to={keys[0]} />
      </Switch>
    ),
    [location.pathname]
  );

  const isTransition = useMemo(
    () => transition && keys.some(i => !!matchPath(location.pathname, { path: i, exact: true })),
    [transition, location.pathname]
  );

  if (isTransition) {
    const name = useMemo(() => (app ? (history.action === 'POP' ? 'router-back' : 'router-go') : 'router-fade'), [
      app,
      history.action,
    ]);

    return <Transition name={name}>{res}</Transition>;
  }

  return res;
};

export default Router;
