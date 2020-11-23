import React from "react";
import "./index.less";
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";

const Loading = () => {
    const antIcon = <LoadingOutlined style={{ fontSize: "10rem"}} spin/>
  return (
    <div className="example">
      <Spin indicator={antIcon}/>
    </div>
  );
};

export { Loading };
