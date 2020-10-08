import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { routes, routesPath } from "./routes";

const RouterComponent = () => {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("access-token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={routesPath.login} />
        );
      }}
    />
  );

  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) => {
        return localStorage.getItem("access-token") && rest.path !== "*" ? (
          <Redirect to={routesPath.users} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
  return (
    <Router basename="/admin">
      <Suspense fallback={<div>Alo</div>}>
        <Switch>
          {routes.map((config, index) => {
            const component = React.lazy(() =>
              import(`../pages/${config.component}`)
            );

            return config.protected ? (
              <PrivateRoute
                key={index}
                exact={config.exact}
                path={config.path}
                component={component}
              />
            ) : (
              <PublicRoute
                key={index}
                exact={config.exact}
                path={config.path}
                component={component}
              />
            );
          })}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;
