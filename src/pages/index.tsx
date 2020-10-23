import React, { useContext } from "react";
import MenuSider from "../components/menu-navigation";
import PageContainer from "../components/header";
import "./index.less";
import { Switch, Route } from "react-router-dom";
import CreateUser from "./users/create-user";
import Users from "./users";
import DetailTable from "./users/components/detail-table";
import { Spin } from "antd";
import { MyContext } from "src/stores";
import { routesPath } from "src/router/routes";
import Products from "./products";

const AdminPage = () => {
  const { check } = useContext(MyContext);
  return (
    <div className="page-wrapper">
      <MenuSider />
      <div className="page-container">
        <PageContainer />
        <Spin tip="Loading..." spinning={check.loading}>
          <div className="page-content">
            <div className="section-content">
              <div className="container-fluid">
                <Switch>
                  <Route path={routesPath.createUser} exact component={CreateUser} />
                  <Route path={routesPath.users} exact component={Users} />
                  <Route path={routesPath.editUser} exact component={CreateUser} />
                  <Route path={routesPath.products} exact component={Products} />
                </Switch>
              </div>
            </div>
          </div>
        </Spin>
      </div>
      <DetailTable />
    </div>
  );
};

export default AdminPage;
