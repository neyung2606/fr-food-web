import React, { FC } from "react";
import { Link } from "react-router-dom";
import { routesPath } from "src/router/routes";
import { PlusOutlined } from "@ant-design/icons";
import "./styles.less";

const ButtonCreate: FC = () => {
  return (
    <div className="icon-add">
      <Link to={routesPath.createUser}>
        <PlusOutlined />
      </Link>
    </div>
  );
};

export default ButtonCreate;
