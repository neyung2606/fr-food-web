import React from "react";
import "./styles.less";
import { Dropdown, Menu } from "antd";
import { useHistory } from "react-router-dom";
import { routesPath } from "@router";

const HeaderMenu = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("access-token");
    history.push(routesPath.login);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="header-container">
      <div className="container-fluid">
        <div className="header-wrap">
          <div className="account-wrap">
            <div className="image">
              <Dropdown overlay={menu}>
                <img
                  src={require("../../misc/logo/logo.png")}
                  alt="Avatar-User"
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { HeaderMenu };
