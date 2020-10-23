import React, { useContext } from "react";
import "./index.less";
import Title from "src/components/title";
import { MyContext } from "src/stores";
import moment from "moment";

const DetailTable = () => {
  const { check } = useContext(MyContext);

  return (
    <div className={check.open ? "detail-table display-width" : "detail-table"}>
      <Title title="Thông tin khách hàng" />
      <div className="detail-content">
        <div>
          <p className="field">Name</p>
          <p className="data-field">{check.infor.name}</p>
        </div>
        <div>
          <p className="field">Username</p>
          <p className="data-field">{check.infor.username}</p>
        </div>
        <div>
          <p className="field">Date Of Birth</p>
          <p className="data-field">
            {moment(check.infor.dayOfBirth).format("DD-MM-YYYY")}
          </p>
        </div>
        <div>
          <p className="field">Email</p>
          <p className="data-field">{check.infor.email}</p>
        </div>
        <div>
          <p className="field">Địa Chỉ</p>
          <p className="data-field">{check.infor.address}</p>
        </div>
        <div>
          <p className="field">SĐT</p>
          <p className="data-field">{check.infor.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailTable;
