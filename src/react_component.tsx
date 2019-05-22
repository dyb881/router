import React from 'react';
import { Redirect, Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import Transition from '@dyb881/transition';

export interface IPage {
  [index: string]: React.ComponentType<any>;
}

interface IProps extends RouteComponentProps {
  page: IPage; // 页面配置列表
  transition?: boolean; // 开启跳转动画
  app?: boolean; // 是否打包成APP，既启用app模拟跳转
}

/**
 * 注册路由
 */
const Router: React.SFC<IProps> = ({ app, transition, page, location, history }) => {
  const keys = Object.keys(page);

  const res = (
    <Switch location={location} key={location.pathname}>
      {keys.map((item, index) => (
        <Route key={index} path={item} component={page[item]} exact />
      ))}
      <Redirect to={keys[0]} />
    </Switch>
  );

  if (transition && keys.some(i => new RegExp(i.split('/:')[0]).test(location.pathname))) {
    const name = app ? (history.action === 'PUSH' ? 'router-go' : 'router-back') : 'fade';
    return <Transition name={name}>{res}</Transition>;
  }

  return res;
};

export default withRouter(Router);
