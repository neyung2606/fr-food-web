import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { routes } from './routes';

const RouterComponent = () => {
  return (
    <Router basename="/admin">
      <Suspense fallback={<div>Alo</div>}>
        <Switch>
          {routes.map(({ component, ...routeProps }, index) => (
            <Route
              key={index}
              {...routeProps}
              render={() => {
                console.log(component)
                const Component = React.lazy(() =>
                  import(`../pages/${component}`)
                );
                return <Component />;
              }}
            />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default RouterComponent;
