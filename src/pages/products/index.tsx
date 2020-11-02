import React, { useState, useEffect, memo, useContext } from "react";
import axios from "axios";
import "./index.less";
import { Product } from "../../utils";
import Title from "src/components/title";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { MyContext } from "src/stores";
import { Tag, Modal, Pagination } from "antd";
import CreateProduct from "./components/create-product";

const Products = () => {
  const token = localStorage.getItem("access-token");
  const [products, setProducts] = useState<Product[] | null | undefined>();
  const { check, action } = useContext(MyContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleCreate, setVisibleCreate] = useState<boolean>(false);
  const [dataTmp, setDataTmp] = useState<Product[] | null | undefined>();
  const [id, setId] = useState<any>();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    updateProduct();
  }, []);

  const updateProduct = () => {
    action.updateLoading(true);
    axios
      .get("http://evening-wildwood-46158.herokuapp.com/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        action.updateLoading(false);
        setProducts(res.data);
        setDataTmp(res.data);
      });
  };

  const handleInfor = async (e) => {
    const valueId = e.target.dataset.index;
    setId(valueId);
    if (valueId === id && check.open) closeInfor();
    else {
      action.updateLoading(true);
      axios
        .get(
          `https://evening-wildwood-46158.herokuapp.com/product/${valueId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          action.updateOpen(true);
          action.updateUser(res.data);
          action.updateLoading(false);
        });
    }
  };

  const closeInfor = () => {
    action.updateOpen(false);
    document.removeEventListener("click", closeInfor);
  };

  const handleOk = () => {
    setVisible(false);
    action.updateLoading(true);
    axios
      .delete(`http://evening-wildwood-46158.herokuapp.com/products/${id}`, {
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
          <span onClick={() => setVisibleCreate(true)} style={{color: "white", padding: "10px"}}>
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
              <th>Tag</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) =>
                page * 10 - 10 <= index && index <= page * 10 - 1 ? (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.tag}</td>
                    <td>
                      <Tag color="volcano">{product.status}</Tag>
                    </td>
                    <td className="combo-button">
                      <button
                        data-index={product.id}
                        className="button-interactive"
                        onClick={handleInfor}
                      >
                        Show
                      </button>
                      <button
                        data-index={product.id}
                        className="button-interactive"
                      >
                        <Link to={`/users/edit/${product.id}`}>Edit</Link>
                      </button>
                      <button
                        className="button-interactive"
                        onClick={() => {
                          setVisible(true);
                          setId(product.id);
                        }}
                        style={{ color: "red" }}
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
        <p>{`Bạn có muốn xóa user này không?`}</p>
      </Modal>
      <CreateProduct visible={visibleCreate} setVisible={setVisibleCreate} />
    </div>
  );
};

export default memo(Products);
