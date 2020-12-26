import React, { FC, useContext } from "react";
import "./index.less";
import { Modal, Table } from "antd";
import { MyContext } from "@stores";
import moment from "moment";

interface Props {
  visible: boolean;
  setVisible: Function;
  formatPrice: Function;
}

const { Column } = Table;

const ShowOrder: FC<Props> = ({ visible, setVisible, formatPrice }) => {
  const { check } = useContext(MyContext);

  return (
    <Modal
      title="Chi tiết đơn hàng"
      centered
      visible={visible}
      onCancel={() => setVisible(false)}
      width={700}
    >
      <>
        <div className="infor__order">
          <div>
            <p>Khách hàng: {check.infor?.name}</p>
          </div>
          <div>
            <p>Mã đơn hàng: {check.infor?.id}</p>
          </div>
          <div>
            <p>
              Ngày mua: {moment(check.infor?.created_at).format("DD-MM-YYYY")}
            </p>
          </div>
          <div>
            <p>
              Tổng tiền: {check.infor?.totalMoney}
            </p>
          </div>
        </div>
        <Table dataSource={check.infor?.product}>
          <Column title="Sản phẩm" dataIndex="name" key="id" />
          <Column title="Sản phẩm" dataIndex="price" key="product" />
          <Column title="Số lượng" dataIndex="quantity" key="quantity" />
          <Column title="Thành tiền" dataIndex="totalMoney" key="money" />
        </Table>
      </>
    </Modal>
  );
};

export default ShowOrder;
