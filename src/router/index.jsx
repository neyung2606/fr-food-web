import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Loading from "src/components/spin";
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
      <Redirect exact from="/" to="/auth/login" />
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((config, index) => {
            return config.protected ? (
              <PrivateRoute
                key={index}
                exact={config.exact}
                path={config.path}
                component={React.lazy(() => import(`../pages`))}
              />
            ) : (
              <PublicRoute
                key={index}
                exact={config.exact}
                path={config.path}
                component={React.lazy(() =>
                  import(`../pages/${config.component}`)
                )}
              />
            );
          })}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;
