import React, { FC } from "react";
import { User } from "../../../../utils";
import UserAvatar from 'react-user-avatar';
import { Dropdown, Menu } from "antd";
import { Link } from "react-router-dom";
import { routesPath } from "src/router/routes";
import './styles.less'

type Props = {
  user: User;
};

const UserItem: FC<Props> = (props) => {
  const menu = (
    <Menu className="menu1">
      <Menu.Item key="0">
        <Link to={routesPath}>Xem</Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to={routesPath}>Sửa</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to={routesPath}>Xóa</Link>
      </Menu.Item>
    </Menu>
  );

  const { user } = props;

  console.log(user)

  return (
    <div className="user-inner">
       <div className="image">
        <UserAvatar size={60} name={user.name} />
      </div>
      <div className="infor-user">
        <span className="name">{user.name}</span>
        <span className="address">{user.address}</span>
      </div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="option">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserItem;
