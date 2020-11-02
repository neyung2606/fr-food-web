import React, { FunctionComponent } from "react";
import {
  Drawer,
  Button,
  Form,
  Row,
  Col,
  Input,
  TimePicker,
  InputNumber,
} from "antd";
import { useForm } from "antd/lib/form/Form";

type Props = {
  visible: boolean;
  setVisible: any;
};

const CreateProduct: FunctionComponent<Props> = ({ visible, setVisible }) => {
  const [form] = useForm();
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      placement="right"
      title="Create Product"
      width={700}
      closable={false}
      onClose={onClose}
      visible={visible}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onClose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button onClick={onClose} type="primary">
            Submit
          </Button>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="price" label="Price">
              <InputNumber
                defaultValue={1000}
                formatter={(value) =>
                  `${value}$`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="openTime" label="Mở cửa">
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="closeTime" label="Đóng cửa">
              <TimePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                rows={4}
                placeholder="please enter url description"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
};

export default CreateProduct;
