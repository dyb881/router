import React from 'react';
import { Redirect, Route, Switch, matchPath, withRouter, RouteComponentProps } from 'react-router-dom';
import { Location } from 'history';
import Transition from '@dyb881/transition';

type TRouters = {
  [index: string]: React.ComponentType<any>;
};

type TProps = RouteComponentProps & {
  routers: TRouters; // 页面配置列表
  transition?: boolean; // 开启跳转动画
  app?: boolean; // 是否打包成APP，既启用app模拟跳转
};

type TState = {
  start: boolean;
  prevLocation: Location;
  location: Location;
  isTransition: boolean;
  name: string;
};

/**
 * 注册路由
 */
class Router extends React.Component<TProps, TState> {
  RenderRoute: React.SFC<{ location?: Location }>;

  constructor(props: TProps) {
    super(props);
    const { transition, routers, location } = props;
    const keys = Object.keys(routers);
    const isTransition = !!transition && keys.some(i => matchPath(location.pathname, { path: i, exact: true }));
    this.RenderRoute = ({ location }) => (
      <Switch location={location}>
        {keys.map((item, index) => (
          <Route key={index} path={item} component={routers[item]} exact />
        ))}
        <Redirect to={keys[0]} />
      </Switch>
    );
    this.state = { start: false, isTransition, name: this.getName(), location, prevLocation: location };
  }

  getName = () => {
    const { app, history } = this.props;
    const { action } = history;
    return app && action !== 'REPLACE' ? (action === 'PUSH' ? 'router-go' : 'router-back') : 'router-fade';
  };

  componentDidUpdate(prevProps: TProps) {
    const prevLocation = prevProps.location;
    const { location } = this.props;
    if (prevLocation.pathname !== location.pathname) {
      this.setState({ start: false, prevLocation, location, name: this.getName() }, () => {
        this.setState({ start: true });
      });
    }
  }

  render() {
    const { RenderRoute, state } = this;
    const { start, prevLocation, location, isTransition, name } = state;

    if (isTransition) {
      const locationData = start ? location : prevLocation;
      return (
        <Transition name={name}>
          <RenderRoute location={locationData} key={locationData.pathname} />
        </Transition>
      );
    }

    return <RenderRoute />;
  }
}

export default withRouter(Router);
