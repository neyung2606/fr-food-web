import React, {
  FunctionComponent,
  useRef,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  Drawer,
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  Modal,
  Spin,
  Select,
  Image,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { MyContext } from "@stores";
import { category, url } from "@constants";

type Props = {
  visible: boolean;
  setVisible: any;
  updateProduct: any;
  isShow: boolean;
};

const { Option } = Select;

const CreateProduct: FunctionComponent<Props> = ({
  visible,
  setVisible,
  updateProduct,
  isShow,
}) => {
  const { check } = useContext(MyContext);
  const token = localStorage.getItem("access-token");
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [product, setProduct] = useState<any>();
  const [upload, setUpload] = useState({
    previewVisible: false,
    previewTitle: "",
    previewImage: "",
    fileList: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    isShow ? fillData() : initValue();
    // eslint-disable-next-line
  }, [isShow, check, loading]);

  const initValue = () => {
    form.setFieldsValue({
      price: 1000,
    });
  };

  const fillData = async () => {
    form.setFieldsValue({
      name: check.infor.name,
      price: check.infor.price,
      description: check.infor.description,
      quantity: check.infor.quantity,
    });
    if (check.infor.category) {
      form.setFieldsValue({
        category: check.infor.category[0]?.name ?? "FOOD",
      });
    }
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
    setVisible(false);
    form.resetFields();
  };

  const onChangeField = () => {
    const name = form.getFieldValue("name");
    const price = form.getFieldValue("price");
    const quantity = form.getFieldValue("quantity");
    const description = form.getFieldValue("description");
    setProduct({
      ...product,
      name,
      price,
      quantity,
      description,
    });
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

  const handleRemove = ({ response }: any) => {
    axios.post(`${url}/upload/delete`, {
      link: response.public_id,
    });
  };

  const onFinish = async () => {
    const url_img = await upload.fileList.map(
      (file: any) => file.response.secure_url
    );
    setLoading(true);
    axios
      .post(
        `${url}/products/create`,
        { ...product, image: url_img },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        form.resetFields();
        NotificationManager.success("Tạo mới thành công", "Thông báo", 2000);
        setLoading(false);
        setVisible(false);
        updateProduct();
      })
      .catch(() => {
        NotificationManager.success("Tạo mới thất bại", "Thông báo", 2000);
      });
  };

  return (
    <Drawer
      placement="right"
      title="Create Product"
      width={700}
      closable={false}
      onClose={onClose}
      visible={visible}
      forceRender
    >
      <Spin tip="Loading..." spinning={loading}>
        <Form
          ref={formRef}
          form={form}
          layout={"vertical"}
          className="form-create"
          onFinish={onFinish}
          onChange={onChangeField}
          initialValues={{
            category: "FOOD",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Nhập tên sản phẩm" }]}
          >
            <Input
              placeholder="Please enter user name"
              disabled={isShow ? true : false}
            />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <InputNumber
              disabled={isShow ? true : false}
              formatter={(value) =>
                `${value}$`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value: any) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
          <Form.Item label="Ảnh">
            {isShow ? (
              check.infor.image !== [] ? (
                check.infor.image?.map((image, key) => (
                  <Image width={100} key={key} src={image} />
                ))
              ) : (
                ""
              )
            ) : (
              <Upload
                fileList={upload.fileList}
                listType="picture-card"
                onPreview={handlePreview}
                onChange={handleChange}
                action={`${url}/upload`}
                onRemove={handleRemove}
                disabled={isShow ? true : false}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            )}
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
            <InputNumber disabled={isShow ? true : false} />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea
              rows={4}
              placeholder="please enter url description"
              disabled={isShow ? true : false}
            />
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
              disabled={isShow ? true : false}
              onChange={(e) => setProduct({ ...product, category: e })}
            >
              {category.map((item, key) => (
                <Option key={key} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            {isShow ? (
              <Button className="border-input" onClick={onClose}>
                Hủy
              </Button>
            ) : (
              <div className="row">
                <Form.Item className="form-2" style={{ marginBottom: 0 }}>
                  <Button className="border-input" onClick={onClose}>
                    Hủy
                  </Button>
                </Form.Item>

                <span className="inline-feild"></span>
                <Form.Item className="form-2" style={{ marginBottom: 0 }}>
                  <Button
                    className="border-input"
                    type="primary"
                    htmlType="submit"
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

export default CreateProduct;
