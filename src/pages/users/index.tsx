import React from "react";
import MenuSider from "../../components/menu-navigation";
import PageContainer from "../../components/header";
import "./index.less";
import { Switch, Route } from "react-router-dom";
import CreateUser from "./create-user";
import Users from './user'

const AdminPage = () => {
  return (
    <div className="page-wrapper">
      <MenuSider />
      <div className="page-container">
        <PageContainer />
        <div className="page-content">
          <div className="section-content">
            <div className="container-fluid">
              <Switch>
                <Route path="/users/create" exact component={ CreateUser } />
                <Route path="/users" exact component={ Users } />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
