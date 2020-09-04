import React from "react";
import './styles.less';
import { Link } from 'react-router-dom';

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
              <Link to="/admin/user">
                <span><i className="fas fa-users"></i></span>
                Quản lí khách hàng
              </Link>
            </li>
            <li>
              <Link to="/admin/post">
                <span><i className="fas fa-pen"></i></span>
                Quản lí bài viết
              </Link>
            </li>
            <li>
              <Link to="/admin/product">
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
