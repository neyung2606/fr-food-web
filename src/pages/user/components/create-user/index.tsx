import React, {
  FC,
  memo,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { Button, DatePicker, Form, Input, Select, Drawer, Spin } from "antd";
import "./index.less";
import moment, { Moment } from "moment";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { role, url } from "@constants";
import { MyContext } from "@stores";

type Props = {
  visible: boolean;
  setVisiable: any;
  updateUser: any;
  isShow: boolean;
};

const { Option } = Select;

const CreateUser: FC<Props> = ({
  visible,
  setVisiable,
  updateUser,
  isShow,
}) => {
  const [form] = Form.useForm();
  const { check } = useContext(MyContext);
  const token = localStorage.getItem("access-token");
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef(null);

  useEffect(() => {
    isShow ? fillData() : initValue();
    // eslint-disable-next-line
  }, [isShow, check, loading]);
  const initValue = () => {
    form.setFieldsValue({
      dayOfBirth: moment(),
    });
    if (!user) return;
  };
  const fillData = () => {
    form.setFieldsValue({
      name: check.infor.name,
      username: check.infor.username,
      email: check.infor.email,
      dayOfBirth: moment(check.infor.dayOfBirth),
      phone: check.infor.phone,
      address: check.infor.address,
      role: check.infor.role?.name
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} disabled={isShow ? true : false}>
        <Option value="84">+84</Option>
        <Option value="86">+84</Option>
      </Select>
    </Form.Item>
  );

  const onFinish = (value) => {
    setLoading(true);
    axios
      .post(`${url}/users/create`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((req) => {
        setLoading(false);
        NotificationManager.success("Thêm mới thành công", "Thông báo", 2000);
        setVisiable(false);
        updateUser();
        form.resetFields();
      })
      .catch(() => {
        setLoading(false);
        NotificationManager.error("Tạo mới thất bại", "Thông báo", 2000);
        setVisiable(false);
        form.resetFields();
      });
  };

  const onChangeField = () => {
    const name = form.getFieldValue("name");
    const username = form.getFieldValue("username");
    const password = form.getFieldValue("password");
    const dayOfBirth: Moment = form.getFieldValue("dayOfBirth");
    const phone = form.getFieldValue("phone");
    const email = form.getFieldValue("email");
    const newUser = {
      ...user,
      name,
      username,
      password,
      dayOfBirth,
      phone,
      role,
      email,
    };

    setUser(newUser);
  };

  const onClose = () => {
    setVisiable(false);
    form.resetFields();
  };

  return (
    <Drawer
      placement="right"
      title="Create User"
      width={700}
      closable={false}
      onClose={onClose}
      visible={visible}
      forceRender
      // footer={
      //   isShow ? (
      //     <div
      //       style={{
      //         textAlign: "right",
      //       }}
      //     >
      //       <Button onClick={onClose} style={{ marginRight: 8 }}>
      //         Cancel
      //       </Button>
      //     </div>
      //   ) : (
      //     <div
      //       style={{
      //         textAlign: "right",
      //       }}
      //     >
      //       <Button onClick={onClose} style={{ marginRight: 8 }}>
      //         Cancel
      //       </Button>
      //       <Button onClick={onFinish} type="primary" >
      //         Submit
      //       </Button>
      //     </div>
      //   )
      // }
    >
      <Spin tip="Loading..." spinning={loading}>
        <Form
          ref={formRef}
          layout={"vertical"}
          form={form}
          name="global_state"
          onChange={onChangeField}
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
                <Input
                  placeholder="Nhập tên"
                  disabled={isShow ? true : false}
                />
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
                <Input
                  placeholder="Nhập email"
                  disabled={isShow ? true : false}
                />
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
                message: "Tên đăng nhập không được để trống"
              },
              () => ({
                validator(rule, value) {
                  const reg = new RegExp("^([a-z0-9]{6,})$")
                  if (!reg.test(value) && value !== "") {
                    return Promise.reject("Tên đăng nhập không hợp lệ")
                  }
                  return Promise.resolve()
                }
              })
            ]}
          >
            <Input
              placeholder="Nhập username"
              disabled={isShow ? true : false}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <div className="row">
              <Form.Item
                className="center-label form-2"
                name="password"
                label="Mật khẩu"
                rules={[
                  {
                    min: 8,
                    message: "Mật khẩu tối thiếu 8 kí tự",
                  },
                  {
                    required: true,
                    message: "Mật khẩu không được để trống",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (
                        getFieldValue("confirm") !== undefined &&
                        getFieldValue("confirm") !== value
                      ) {
                        return Promise.reject("Mật khẩu không trùng khớp");
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  disabled={isShow ? true : false}
                />
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
                <Input.Password
                  placeholder="Xác nhận mật khẩu"
                  disabled={isShow ? true : false}
                />
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
              disabled={isShow ? true : false}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: "20px" }}>
            <div className="row">
              <Form.Item
                className="center-label form-2"
                name="phone"
                label="Phone Number"
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{ width: "100%" }}
                  disabled={isShow ? true : false}
                />
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
                <Select disabled={isShow ? true : false} onChange={e => setUser({...user, role: e})}>
                  {role.map((item, key) => (
                    <Option key={key} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Select disabled={isShow ? true : false} onChange={e => setUser({...user, address: e})}>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
              <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            {isShow ? (
              <Button
                className="border-input"
                // style={{
                //   height: "100px",
                //   borderRadius: "100%",
                //   width: "100px",
                // }}
                onClick={onClose}
              >
                Hủy
              </Button>
            ) : (
              <div className="row">
                <Form.Item className="form-2" style={{ marginBottom: 0 }}>
                  <Button
                    className="border-input"
                    // style={{
                    //   height: "100px",
                    //   borderRadius: "100%",
                    //   width: "100px",
                    // }}
                    onClick={onClose}
                  >
                    Hủy
                  </Button>
                </Form.Item>

                <span className="inline-feild"></span>
                <Form.Item className="form-2" style={{ marginBottom: 0 }}>
                  <Button
                    className="border-input"
                    type="primary"
                    htmlType="submit"
                    // style={{
                    //   height: "100px",
                    //   borderRadius: "100%",
                    //   width: "100px",
                    // }}
                  >
                    Lưu
                  </Button>
                </Form.Item>
              </div>
            )}
          </Form.Item>
        </Form>
      </Spin>
    </Drawer>
  );
};

export default memo(CreateUser);
