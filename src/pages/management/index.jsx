import React from "react";
import MenuSlider from "../../components/menu-navigation";
import PageContainer from "../../components/header";
import "./index.less";
import { Switch, Route } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="page-wrapper">
      <MenuSlider />
      <div className="page-container">
        <PageContainer />
        <div className="page-content">
            <div className="section-content">
                <div className="container-fluid">
                    <Switch>
                        <Route to=""/>
                        <Route to=""/>
                        <Route to=""/>
                    </Switch>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
