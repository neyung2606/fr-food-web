import React, { useState, useEffect, memo, useContext } from "react";
import axios from "axios";
import "./index.less";
import { Product } from "@utils";
import { Title } from "@components";
import { PlusOutlined } from "@ant-design/icons";
import { MyContext } from "@stores";
import { Modal, Pagination } from "antd";
import CreateProduct from "@pages/product/components/create-product";
import { Link } from "react-router-dom";
import { url } from '@constants'

const Products = (props) => {
  const token = localStorage.getItem("access-token");
  const [products, setProducts] = useState<Product[] | null | undefined>();
  const { action } = useContext(MyContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
  const [dataTmp, setDataTmp] = useState<Product[] | null | undefined>();
  const [id, setId] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    updateProduct();
    // eslint-disable-next-line
  }, []);
  
  const updateProduct = () => {
    action.updateLoading(true);
    axios
      .get(`${url}/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        action.updateLoading(false);
        setProducts(res.data);
        setDataTmp(res.data);
      });
  };

  const formatPrice = (num: number) => {
    return (
      num
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ"
    );
  };

  const handleInfor = async (e) => {
    const valueId = e.target.dataset.index;
    setIsShow(true);
    action.updateLoading(true);
    axios
      .get(`${url}/products?id=${valueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setVisibleCreate(true);
        action.updateUser(res.data[0]);
        action.updateLoading(false);
      });
  };

  const handleOk = () => {
    setVisible(false);
    action.updateLoading(true);
    axios
      .delete(`${url}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        action.updateLoading(false);
        updateProduct();
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = (e) => {
    setPage(1);
    const key = e.target.value.toLowerCase();
    if (!key) {
      setProducts(dataTmp);
    } else {
      const tmp = dataTmp?.filter((product) =>
        product.name.toLowerCase().includes(key)
      );
      setProducts(tmp);
    }
  };

  const onChange = (page) => {
    setPage(page);
  };
  return (
    <div className="main-content">
      <Title title="Danh sách sản phẩm" />
      <div className="search">
        <div className="search_content">
          <input
            type="text"
            name="search_users"
            className="search_input"
            placeholder="Tìm kiếm"
            onChange={handleSearch}
          />
        </div>
        <div className="button-create">
          <span
            onClick={() => {
              setVisibleCreate(true);
              setIsShow(false);
            }}
            style={{ color: "white", padding: "10px" }}
          >
            <PlusOutlined />
            <span style={{ marginLeft: "5px" }}>New Product</span>
          </span>
        </div>
      </div>
      <div className="list-user">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) =>
                page * 8 - 8 <= index && index <= page * 8 - 1 ? (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>
                      {formatPrice(product.price)}
                    </td>
                    <td>{product.quantity}</td>
                    <td className="combo-button">
                      <button
                        data-index={product.id}
                        className="button-interactive"
                        onClick={handleInfor}
                        style={{ color: "white" }}
                      >
                        Show
                      </button>
                      <button
                        data-index={product.id}
                        className="button-interactive"
                      >
                        <Link to={`/products/edit/${product.id}`}>Edit</Link>
                      </button>
                      <button
                        className="button-interactive"
                        onClick={() => {
                          setVisible(true);
                          setId(product.id);
                        }}
                        style={{ color: "rgba(255,0,0,0.7)" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={index}></tr>
                )
              )}
          </tbody>
        </table>
        <Pagination
          showQuickJumper
          defaultCurrent={1}
          pageSize={8}
          total={products ? products.length : 500}
          onChange={onChange}
          current={page}
          style={{ paddingBottom: "20px" }}
        />
      </div>
      <Modal
        title="Thông báo"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{`Bạn có muốn xóa product này không?`}</p>
      </Modal>
      <CreateProduct
        visible={visibleCreate}
        setVisible={setVisibleCreate}
        updateProduct={updateProduct}
        isShow={isShow}
      />
    </div>
  );
};

export default memo(Products);
