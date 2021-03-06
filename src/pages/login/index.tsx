import React, { useContext, useState } from "react";
import "./index.less";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { routesPath } from "@router";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { NotificationManager } from "react-notifications";
import { url } from "@constants";
import { MyContext } from "@stores";

const Login = () => {
  const { action } = useContext(MyContext);
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const [form] = Form.useForm();

  const onFinish = ({ username, password }) => {
    setLoading(true);
    axios
      .post(`${url}/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        action.updateRole(res.data.role);
        if (res.data.role === "ADMIN" || res.data.role === "MOD") {
          localStorage.setItem("access-token", res.data.token);
          res.data.role === "ADMIN"
            ? history.push(routesPath.users)
            : history.push(routesPath.products);
          setLoading(false);
        } else {
          NotificationManager.error("Đăng nhập thất bại", "Thông báo", 2000);
          form.setFieldsValue({
            username: "",
            password: "",
          });
          setLoading(false);
        }
      })
      .catch(() => {
        NotificationManager.error("Đăng nhập thất bại", "Thông báo", 2000);
        form.setFieldsValue({
          username: "",
          password: "",
        });
        setLoading(false);
      });
  };

  return (
    <div className="login-page">
      <div className="login_content">
        <div className="header-form">
          <img src={require("../../misc/logo/logo1.png")} alt="logo_market" />
        </div>
        <div className="login-form">
          <Form
            form={form}
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
                loading={loading}
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
