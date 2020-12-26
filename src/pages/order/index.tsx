import React, {
  useState,
  useEffect,
  memo,
  useContext,
  FunctionComponent,
} from "react";
import axios from "axios";
import "./index.less";
import { Order } from "@utils";
import { Title } from "@components";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { MyContext } from "@stores";
import { Tag, Modal, Pagination } from "antd";
import CreateUser from "@pages/user/components/create-user";
import { url } from "@constants";
import ShowOrder from "./components/show-order";

const Orders: FunctionComponent = () => {
  const token = localStorage.getItem("access-token");
  const [orders, setOrders] = useState<Order[] | null | undefined>();
  const { action } = useContext(MyContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataTmp, setDataTmp] = useState<Order[] | null>();
  const [id, setId] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [visiCreate, setVisiCreate] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    updateOrder();
    // eslint-disable-next-line
  }, []);

  const updateOrder = () => {
    action.updateLoading(true);
    axios
      .get(`${url}/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setDataTmp(res.data);
        action.updateLoading(false);
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

  const handleInfor = (e) => {
    const valueId = e.target.dataset.index;
    action.updateLoading(true);
    axios
      .get(
        `https://evening-wildwood-46158.herokuapp.com/orders?id=${valueId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        const data: Order = res.data[0];
        const detail: any = {
          name: data.user?.name,
          totalMoney: formatPrice(data.totalMoney),
          created_at: data.created_at,
          id: data.id,
          product: data.orderDetail?.map((item) => {
            return {
              quantity: item.quantity,
              name: item.product.name,
              price: formatPrice(item.product.price),
              totalMoney: formatPrice(item.quantity * item.product.price),
            };
          }),
        };
        action.updateUser(detail);
        setIsShow(true);
        action.updateLoading(false);
      });
  };

  const handleOk = () => {
    setVisible(false);
    action.updateLoading(true);
    axios
      .delete(`${url}/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        action.updateLoading(false);
        updateOrder();
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = async (e) => {
    setPage(1);
    const key = e.target.value;
    if (!key) {
      setOrders(dataTmp);
    } else {
      const tmp = dataTmp?.filter((order) => order.user?.name.includes(key));
      setOrders(tmp);
    }
  };

  const onChange = (page) => {
    setPage(page);
  };

  return (
    <div className="main-content">
      <Title title="Danh sách đơn hàng" />
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
              setIsShow(false);
              setVisiCreate(true);
            }}
            style={{ color: "white", padding: "10px" }}
          >
            <PlusOutlined />
            <span style={{ marginLeft: "5px" }}>New Order</span>
          </span>
        </div>
      </div>
      <div className="list-user">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Người mua</th>
              <th>Ngày mua</th>
              <th>Tổng tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order, index) =>
                page * 8 - 8 <= index && index <= page * 8 - 1 ? (
                  <tr key={index}>
                    <td>{order.id ?? ""}</td>
                    <td>{order.user.name}</td>
                    <td>
                      {moment(order.created_at).format("DD-MM-YYYY") ?? ""}
                    </td>
                    <td>
                      <Tag className="tag">{formatPrice(order.totalMoney)}</Tag>
                    </td>
                    <td className="combo-button">
                      <button
                        data-index={order.id}
                        className="button-interactive"
                        onClick={handleInfor}
                        style={{ color: "white" }}
                      >
                        Show
                      </button>
                      <button
                        className="button-interactive"
                        onClick={() => {
                          setVisible(true);
                          setId(order.id);
                        }}
                        style={{ color: "rgba(255,0,0,0.5)" }}
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
          total={orders ? orders.length : 500}
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
        <p>{`Bạn có muốn xóa đơn hàng này không?`}</p>
      </Modal>
      <CreateUser
        visible={visiCreate}
        setVisiable={setVisiCreate}
        updateUser={updateOrder}
        isShow={isShow}
      />
      <ShowOrder visible={isShow} setVisible={setIsShow} formatPrice={formatPrice} />
    </div>
  );
};
export default memo(Orders);
