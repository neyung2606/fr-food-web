import React from "react";
import "./index.less";
import { Form, Input, Button, Checkbox } from "antd";
import Title from "src/components/title";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { routesPath } from "src/router/routes";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { offset: 2, span: 20 },
};

const tailLayout = {
  wrapperCol: { offset: 2, span: 20 },
};

const Login = () => {
  const history = useHistory();

  const onFinish = ({ username, password }) => {
    axios
      .post("http://localhost:3500/auth/login", {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("access-token", res.data);
        history.push(routesPath.users);
      });
  };

  return (
    <div className="login-page">   
      <div className="login-form">
        <Title title="welcome to my market" />
        <Form {...layout} name="basic" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username"/>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password"/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
