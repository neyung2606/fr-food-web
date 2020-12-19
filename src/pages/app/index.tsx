import React, { useContext } from "react";
import { MenuSider } from "@components";
import "./index.less";
import { Spin } from "antd";
import { MyContext } from "@stores";
import { Switch, Route } from "react-router-dom";
import { routesPath } from "@router";
import Users from "@pages/user";
import EditUser from "@pages/user/components/edit-user";
import Products from "@pages/product";
import EditProduct from "@pages/product/components/edit-product";
import Dashboard from "@pages/dashboard";
import Orders from '@pages/order';

const Layout = () => {
  const { check } = useContext(MyContext);
  return (
    <Spin tip="Loading..." spinning={check.loading}>
      <div className="page-wrapper">
        <MenuSider />
        <div className="page-container">
          <div className="page-content">
            <div className="section-content">
              <div className="container-fluid">
                <Switch>
                  <Route path={routesPath.users} exact component={Users} />
                  <Route
                    path={routesPath.editUser}
                    exact
                    component={EditUser}
                  />
                  <Route
                    path={routesPath.products}
                    exact
                    component={Products}
                  />
                  <Route
                    path={routesPath.editProduct}
                    exact
                    component={EditProduct}
                  />
                  <Route
                    path={routesPath.dashboard}
                    exact
                    component={Dashboard}
                  />
                  <Route
                    path={routesPath.orders}
                    exact
                    component={Orders}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Layout;
