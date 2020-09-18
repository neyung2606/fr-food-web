import React from "react";
import './styles.less';
import { Link } from 'react-router-dom';
import { routesPath } from '../../router/routes'

const MenuSlider = () => {
  return (
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
                <span><i className="fas fa-users"></i></span>
                Quản lí khách hàng
              </Link>
            </li>
            <li>
              <Link to="/posts">
                <span><i className="fas fa-pen"></i></span>
                Quản lí bài viết
              </Link>
            </li>
            <li>
              <Link to="/products">
                <span><i className="fas fa-utensils"></i></span>
                Quản lí sản phẩm
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MenuSlider;
