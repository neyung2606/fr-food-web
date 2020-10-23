import React from "react";
import "./index.less";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { routesPath } from "src/router/routes";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NotificationManager } from 'react-notifications'

const Login = () => {
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = ({ username, password }) => {
    axios
      .post("http://evening-wildwood-46158.herokuapp.com/auth/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.role === "admin") {
          localStorage.setItem("access-token", res.data.token);
          history.push(routesPath.users);
        } else {
          NotificationManager.error("Đăng nhập thất bại", "Thông báo", 2000);
          form.setFieldsValue({
            username: "",
            password: ""
          })
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login_content">
        <div className="header-form">
          <img src={require("../../misc/logo/logo1.png")} alt="logo_market"/>
        </div>
        <div className="login-form">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
