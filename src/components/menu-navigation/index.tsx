import React, { useState } from "react";
import "./styles.less";
import { Link } from "react-router-dom";
import { MenuOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const MenuSider = () => {
  const [opened, setOpened] = useState(false);

  const changeSidebar = () => {
    opened ? setOpened(false) : setOpened(true);
  };

  return (
    <div className={opened ? "opened-sidebar init-sidebar" : "init-sidebar"}>
      <div className="menu-sidebar">
        <div className="logo">
          <Link to="/admin" className="sidebar-logo">
            <img src={require("../../misc/logo/logo.png")} alt="Logo Branch" />
          </Link>
        </div>
        <div className="menu-sidebar-content">
          <nav className="navbar-sidebar">
            <ul className="list-unstyled">
              <li>
                <Link to="/users">
                  <span>
                    <i className="fas fa-users"></i>
                  </span>
                  Quản lí khách hàng
                </Link>
              </li>
              <li>
                <Link to="/posts">
                  <span>
                    <i className="fas fa-pen"></i>
                  </span>
                  Quản lí bài viết
                </Link>
              </li>
              <li>
                <Link to="/products">
                  <span>
                    <i className="fas fa-utensils"></i>
                  </span>
                  Quản lí sản phẩm
                </Link>
              </li>
            </ul>
          </nav>
          <div className="close-sidebar" onClick={changeSidebar}>
            <button>
              <ArrowLeftOutlined />
            </button>
          </div>
        </div>
      </div>
      <div className={opened ? "toggle-button button-transition" : "toggle-button"} onClick={changeSidebar}>
        <button>
          <MenuOutlined />
        </button>
      </div>
    </div>
  );
};

export default MenuSider;
