import React from "react";
import "./index.less";
import { Bar } from "react-chartjs-2";

const Dashboard = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Doanh số năm 2020",
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 301, 56, 55, 40],
      },
    ],
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div className="sales">
          <div className="title">Doanh số</div>
          <div>
            <img
              style={{ width: "50px" }}
              alt="icon_money"
              src={require("../../misc/images/icon-chi-phi.png")}
            />
            <span style={{ marginLeft: "20px" }}>400,000,000 đồng</span>
          </div>
        </div>
        <div className="predict">
          <div className="title">Dự đoán</div>
          <div>
            <img
              style={{ width: "50px" }}
              alt="icon_money"
              src={require("../../misc/images/1622846.png")}
            />
            <span style={{ marginLeft: "20px" }}>1,000,000,000 đồng</span>
          </div>
        </div>
      </div>
      <Bar data={data} />
    </>
  );
};

export default Dashboard;
