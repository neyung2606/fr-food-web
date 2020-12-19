import React, { FunctionComponent, memo, useContext, useEffect, useRef } from "react";
import { DatePicker, Form, Input, Select, Button, message } from "antd";
import "./index.less";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { routesPath } from "@router";
import { MyContext } from "@stores";
import { User } from "@utils";
import { url, role } from '@constants';


const { Option } = Select;

type Props = {
}

const EditUser: FunctionComponent<Props> = () => {
  const [form] = Form.useForm();
  const formRef = useRef(null)
  const token = localStorage.getItem("access-token");
  const { id } = useParams();
  const history = useHistory();
  const { action } = useContext(MyContext);

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [id]);

  const getData = () => {
    action.updateLoading(true);
    axios
      .get(`${url}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const data: User = res.data;
        action.updateLoading(false);
        form.setFieldsValue({
          name: data.name,
          username: data.username,
          dayOfBirth: moment(data.dayOfBirth),
          address: data.address,
          phone: data.phone,
          email: data.email,
          role: data.role.name,
        });
      });
  };

  const backHandle = () => {
    history.push(routesPath.users);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="86">+84</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (value) => {
    if ((value.password || value.confirm) && value.password !== value.confirm) {
      message.error("Password không trùng khớp");
      return;
    }
    const user = {
      name: value.name,
      username: value.username,
      password: value.password,
      phone: value.phone,
      address: value.address,
      dayOfBirth: moment(value.dayOfBirth),
      role: value.role,
    };
    action.updateLoading(true);
    axios
      .put(`${url}/users/${id}`, user, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        action.updateLoading(false);
        NotificationManager.success("Cập nhật thành công", "Thông báo", 2000);
        history.push(routesPath.users);
      })
      .catch(() => {
        action.updateLoading(false);
        NotificationManager.error("Cập nhật thất bại", "Thông báo", 2000);
      });
  };

  return (
    <div className="form-pd-200">
      <Form
        ref={formRef}
        layout={"vertical"}
        form={form}
        name="global_state"
        onFinish={onFinish}
        initialValues={{
          address: "Đà Nẵng",
          prefix: "84",
          role: "USER",
        }}
        className="form-create"
      >
        <Form.Item style={{ marginBottom: 0 }}>
          <div className="row">
            <Form.Item
              className="center-label form-2"
              name="name"
              label="Họ Tên"
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
            <Form.Item
              className="center-label form-2"
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  message: "Email không hợp lệ",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          className="center-label"
          name="username"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Tên đăng nhập không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập username" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <div className="row">
            <Form.Item
              className="center-label form-2"
              name="password"
              label="Mật khẩu"
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value && value.length < 8) {
                      return Promise.reject("Mật khẩu có ít nhất 8 kí tự");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              className="center-label form-2"
              name="confirm"
              label="Nhập lại mật khẩu"
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Mật khẩu không trùng khớp");
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Xác nhận mật khẩu" />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item
          name="dayOfBirth"
          label="Ngày sinh"
          className="center-label"
          style={{ width: "100%" }}
        >
          <DatePicker
            placeholder={"Chọn ngày sinh"}
            style={{ width: "100%", borderRadius: "10px" }}
            format={"DD-MM-YYYY"}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0px" }}>
          <div className="row">
            <Form.Item
              className="center-label form-2"
              name="phone"
              label="Phone Number"
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              className="center-label form-2"
              name="role"
              label="Quyền"
              rules={[
                {
                  required: true,
                  message: "Ô này không được để trống",
                },
              ]}
            >
              <Select>
                {role.map((item, key) => (
                  <Option key={key} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item name="address" label="Địa chỉ" className="center-label">
          <Select>
            <Option value="Đà Nẵng">Đà Nẵng</Option>
            <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
          </Select>
        </Form.Item>
        <Form.Item style={{ marginBottom: "0px" }}>
          <div className="row">
            <Form.Item className="form-2">
              <Button
                className="border-input"
                type="primary"
                style={{
                  height: "100px",
                  borderRadius: "100%",
                  width: "100px",
                }}
                onClick={backHandle}
              >
                Hủy
              </Button>
            </Form.Item>

            <span className="inline-feild"></span>
            <Form.Item className="form-2">
              <Button
                className="border-input"
                type="primary"
                htmlType="submit"
                style={{
                  height: "100px",
                  borderRadius: "100%",
                  width: "100px",
                }}
              >
                Lưu
              </Button>
            </Form.Item>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default memo(EditUser);
