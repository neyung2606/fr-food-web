import React, { FC, memo, useContext, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select } from "antd";
import "./index.less";
import moment, { Moment } from "moment";
import { User } from "@utils";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { routesPath } from "src/router/routes";
import { MyContext } from "src/stores";

type Props = {};

const { Option } = Select;

const CreateUser: FC<Props> = () => {
  const token = localStorage.getItem("access-token");
  const { id } = useParams();
  const history = useHistory();
  const [form] = Form.useForm();
  const [user, setUser] = useState<User>();
  const { action } = useContext(MyContext);

  useEffect(() => {
    id ? getData() : initValue();
  }, [id]);

  const initValue = () => {
    form.setFieldsValue({
      dayOfBirth: moment(),
    });
    if (!user) return;
  };

  const getData = () => {
    action.updateLoading(true);
    axios
      .get(`https://evening-wildwood-46158.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        action.updateLoading(false);
        form.setFieldsValue({
          name: res.data.name,
          username: res.data.username,
          dayOfBirth: moment(res.data.dayOfBirth),
          address: res.data.address,
          phone: res.data.phone,
          email: res.data.email,
        });
      });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="86">+84</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = () => {
    try {
      const token = localStorage.getItem("access-token");
      id
        ? axios
            .patch(
              `http://evening-wildwood-46158.herokuapp.com/users/${id}`,
              user,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then(() => {
              NotificationManager.success(
                "Cập nhật thành công",
                "Thông báo",
                2000
              );
              history.push(routesPath.users);
            })
            .catch(() => {
              console.log(user)
              NotificationManager.error(
                "Thêm mới thành công",
                "Thông báo",
                2000
              );
            })
        : axios
            .post(
              "http://evening-wildwood-46158.herokuapp.com/users/create",
              user
            )
            .then((req) => {
              NotificationManager.success(
                "Thêm mới thành công",
                "Thông báo",
                2000
              );
              history.push(routesPath.users);
            });
    } catch (e) {
      NotificationManager.error("Thêm mới thất bại", "Thông báo", 2000);
    }
  };

  const onChangeField = () => {
    const name = form.getFieldValue("name");
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    const dayOfBirth: Moment = form.getFieldValue("dayOfBirth");
    const address = form.getFieldValue("address");
    const phone = form.getFieldValue("phone");
    const email = form.getFieldValue("email");

    if (!dayOfBirth) return;

    const newUser: User = {
      id: "",
      name,
      username,
      password,
      dayOfBirth: dayOfBirth.toDate().getTime(),
      address,
      phone,
      role: "user",
      email,
    };

    setUser(newUser);
  };

  const backHandle = () => {
    history.push(routesPath.users);
  };

  return (
    <div className="form-pd-200">
      <Form
        layout={"vertical"}
        form={form}
        name="global_state"
        onChange={onChangeField}
        onFinish={onFinish}
        initialValues={{
          address: "Đà Nẵng",
          prefix: "84",
        }}
      >
        <Form.Item style={{ marginBottom: 0 }}>
          <div className="row">
            <Form.Item
              className="center-label form-2"
              name="name"
              label="Họ Tên"
              rules={[
                {
                  required: true,
                  message: "Tên không được để trống",
                },
              ]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>
            <Form.Item
              className="center-label form-2"
              name="email"
              label="Email"
              rules={
                id
                  ? []
                  : [
                      {
                        required: true,
                        message: "Email không được để trống",
                      },
                      {
                        type: "email",
                        message: "Email không hợp lệ",
                      },
                    ]
              }
            >
              <Input placeholder="Nhập tên" />
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
              rules={
                id
                  ? []
                  : [
                      {
                        min: 6,
                        message: "Mật khẩu tối thiếu 6 kí tự",
                      },
                      {
                        required: true,
                        message: "Mật khẩu không được để trống",
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          console.log(getFieldValue("confirm"));
                          if (
                            getFieldValue("confirm") !== undefined &&
                            getFieldValue("confirm") !== value
                          ) {
                            return Promise.reject("Mật khẩu không trùng khớp");
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]
              }
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              className="center-label form-2"
              name="confirm"
              label="Nhập lại mật khẩu"
              rules={
                id
                  ? []
                  : [
                      {
                        required: true,
                        message: "Mật khẩu không được để trống",
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Mật khẩu không trùng khớp");
                        },
                      }),
                    ]
              }
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
            onChange={onChangeField}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: "20px" }}>
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
              name="address"
              label="Địa chỉ"
            >
              <Select>
                <Option value="Đà Nẵng">Đà Nẵng</Option>
                <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              </Select>
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item>
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

export default memo(CreateUser);
