import React, { useState, useEffect } from "react";
import "./styles.less";
import { Link, useHistory } from "react-router-dom";
import {
  MenuOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Image, Avatar } from "antd";
import axios from "axios";
import { url } from "../../constants";
import { User } from "../../utils";
import { routesPath } from "../../router";

const MenuSider = () => {
  const token = localStorage.getItem("access-token");
  const [opened, setOpened] = useState(false);
  const [user, setUser] = useState<User>();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${url}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      });
  }, [token]);

  const changeSidebar = () => {
    opened ? setOpened(false) : setOpened(true);
  };

  const _logout = () => {
    localStorage.removeItem("access-token");
    history.push(routesPath.login);
  };

  return (
    <div className={opened ? "opened-sidebar init-sidebar" : "init-sidebar"}>
      <div className="menu-sidebar">
        <div className="logo">
          {user && user.avatar ? (
            <Avatar size={100}>{user.username}</Avatar>
          ) : (
            <Avatar size={100} src={<Image src={user?.avatar} />} />
          )}
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
              <li className="btn-logout" onClick={_logout}>
                <span>
                  <i
                    className="fas fa-sign-out-alt"
                    style={{ fontSize: 16 }}
                  ></i>
                </span>
                <span style={{ fontSize: 16}}>
                  Đăng xuất
                </span>
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
      <div
        className={opened ? "toggle-button button-transition" : "toggle-button"}
        onClick={changeSidebar}
      >
        <button>
          <MenuOutlined />
        </button>
      </div>
    </div>
  );
};

export { MenuSider };
