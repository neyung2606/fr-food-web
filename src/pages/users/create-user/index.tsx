import React, { FC, useEffect, useState } from "react";
import { Button, Cascader, DatePicker, Form, Input, Select } from "antd";
import "./index.less";
import moment, { Moment } from "moment";
import { User } from "@utils";
import { NotificationManager } from "react-notifications";

type Props = {};

const { Option } = Select;

const CreateUser: FC<Props> = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    initValue();
  }, []);

  const initValue = async () => {
    form.setFieldsValue({
      dayOfBirth: moment(),
    });
    if (!user) return;
  };

  const residences = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            {
              value: "xihu",
              label: "West Lake",
            },
          ],
        },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [
            {
              value: "zhonghuamen",
              label: "Zhong Hua Men",
            },
          ],
        },
      ],
    },
  ];

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="84">+84</Option>
        <Option value="86">+84</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = () => {
    NotificationManager.success("Thêm mới thành công", "Thông báo", 2000);
  };

  const onChangeField = () => {
    const name = form.getFieldValue("name");
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    const dayOfBirth: Moment = form.getFieldValue("dayOfBirth");

    if (!dayOfBirth) return;

    const newUser: User = {
      _id: "1",
      name,
      username,
      password,
      dayOfBirth: dayOfBirth.toDate().getTime(),
      avatar: "",
      address: "",
      phone: "",
      role: "user",
    };

    setUser(newUser);
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
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "84",
        }}
      >
        <Form.Item
          className="center-label"
          name="name"
          label="Tên"
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
                {
                  min: 6,
                  message: "Mật khẩu tối thiếu 6 kí tự",
                },
                {
                  required: true,
                  message: "Mật khẩu không được để trống",
                },
              ]}
            >
              <Input.Password placeholder="Nhập mật khẩu" />
            </Form.Item>

            <Form.Item
              className="center-label form-2"
              name="confirm"
              label="Nhập lại mật khẩu"
              rules={[
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
          rules={[
            {
              required: true,
              message: "Ngày sinh không được để trống",
            },
          ]}
          style={{ width: "100%" }}
        >
          <DatePicker
            placeholder={"Chọn ngày sinh"}
            style={{ width: "100%", borderRadius: "10px" }}
            format={"DD-MM-YYYY"}
            onChange={onChangeField}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: "0" }}>
          <div className="row">
            <Form.Item
              className="center-label form-2"
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              className="center-label form-2"
              name="address"
              label="Địa chỉ"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "Vui lòng chọn địa chỉ",
                },
              ]}
            >
              <Cascader options={residences} />
            </Form.Item>
          </div>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
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

export default CreateUser;
