import React, {
  FunctionComponent,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import { Button, Form, Input, InputNumber, Upload, Modal, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { MyContext } from "@stores";
import { useHistory, useParams } from "react-router-dom";
import { routesPath } from "@router";
import { NotificationManager } from "react-notifications";
import { url, category } from '@constants'

type Props = {};

const { Option } = Select;

const EditProduct: FunctionComponent<Props> = () => {
  const history = useHistory();
  const { action } = useContext(MyContext);
  const token = localStorage.getItem("access-token");
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const [upload, setUpload] = useState<any>({
    previewVisible: false,
    previewTitle: "",
    previewImage: "",
    fileList: [
    ],
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fillData();
    // eslint-disable-next-line
  }, [loading]);

  const fillData = async () => {
    action.updateLoading(true);
    axios
      .get(`${url}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        action.updateLoading(false);
        form.setFieldsValue({
          name: res.data.name,
          price: res.data.price,
          description: res.data.description,
          quantity: res.data.quantity,
        });
        if (res.data.category) {
          form.setFieldsValue({
            category: res.data.category[0]?.name ?? "VEGETABLE",
          });
        }
        const imgs = res.data.image?.map((img, key) => ({
          uid: key,
          status: "done",
          name: "img.png",
          url: img,
        }));
        setUpload({ ...upload, fileList: imgs });
      });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const onClose = () => {
    history.push(routesPath.products);
  };

  const handleChange = async ({ fileList }: any) => {
    setUpload({ ...upload, fileList: fileList });
  };
  const handleCancel = () => setUpload({ ...upload, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setUpload({
      ...upload,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const onFinish = async (value) => {
    const url_img = await upload.fileList.map((file: any) =>
      file.response ? file.response.secure_url : file.url
    );
    setLoading(true);
    const productUpdate = {
      name: value.name,
      price: value.price,
      quantity: value.quantity,
      description: value.description,
      category: value.category,
      image: url_img,
    };
    axios
      .put(`${url}/products/${id}`, productUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        history.push(routesPath.products);
        setLoading(false);
        NotificationManager.success("Cập nhật thành công", "Thông báo", 2000);
      })
      .catch(() => {
        setLoading(false);
        NotificationManager.error("Cập nhật thất bại", "Thông báo", 2000);
      });
  };

  return (
    <Form
      ref={formRef}
      form={form}
      layout={"vertical"}
      className="form-create"
      onFinish={onFinish}
      //   onChange={onChangeField}
      initialValues={{
        category: "FOOD",
      }}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Bắt buộc" }]}
      >
        <Input placeholder="Please enter user name" />
      </Form.Item>
      <Form.Item name="price" label="Price">
        <InputNumber
          formatter={(value) =>
            `${value}$`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
        />
      </Form.Item>
      <Form.Item label="Ảnh">
        <Upload
          fileList={upload.fileList}
          listType="picture-card"
          onPreview={handlePreview}
          onChange={handleChange}
          action={`${url}/upload`}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
        <Modal
          visible={upload.previewVisible}
          title={upload.previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="example"
            style={{ width: "100%" }}
            src={upload.previewImage}
          />
        </Modal>
      </Form.Item>
      <Form.Item name="quantity" label="Quantity">
        <InputNumber />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="please enter url description" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
            message: "Ô này không được để trống",
          },
        ]}
      >
        <Select
        // onChange={(e) => setProduct({ ...product, category: e })}
        >
          {category.map((item, key) => (
            <Option key={key} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <div className="row">
          <Form.Item className="form-2" style={{ marginBottom: 0 }}>
            <Button className="border-input" onClick={onClose}>
              Hủy
            </Button>
          </Form.Item>

          <span className="inline-feild"></span>
          <Form.Item className="form-2" style={{ marginBottom: 0 }}>
            <Button className="border-input" type="primary" htmlType="submit">
              Lưu
            </Button>
          </Form.Item>
        </div>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
