import React, { useContext } from "react";
import { MenuSider } from "../../components";
import "./index.less";
import { Spin } from "antd";
import { MyContext } from "../../stores";
import { Switch, Route } from 'react-router-dom'
import { routesPath } from "../../router";
import Users from '../users';
import EditUser from '../users/components/edit-user'
import Products from '../products'
import EditProduct from "../products/components/edit-product";

const Layout = () => {
  const { check } = useContext(MyContext);
  return (
    <div className="page-wrapper">
      <MenuSider />
      <div className="page-container">
        <Spin tip="Loading..." spinning={check.loading}>
          <div className="page-content">
            <div className="section-content">
              <div className="container-fluid">
                <Switch>
                  <Route path={routesPath.users} exact component={Users}/>
                  <Route path={routesPath.editUser} exact component={EditUser} />
                  <Route path={routesPath.products} exact component={Products} />
                  <Route path={routesPath.editProduct} exact component={EditProduct} />
                </Switch>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Layout;
