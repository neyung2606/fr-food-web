import React, { useState, useEffect, memo, useContext } from "react";
import axios from "axios";
import "./index.less";
import { User } from "../../utils";
import Title from "src/components/title";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { routesPath } from "src/router/routes";
import { MyContext } from "src/stores";
import { Tag, Modal, Pagination } from "antd";

const Users = () => {
  const token = localStorage.getItem("access-token");
  const [users, setUsers] = useState<User[] | null | undefined>();
  const { check, action } = useContext(MyContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataTmp, setDataTmp] = useState<User[] | null>();
  const [id, setId] = useState<any>();
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    updateUser();
    return () => {}
  }, []);

  const updateUser = () => {
    action.updateLoading(true);
    axios
      .get("https://evening-wildwood-46158.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setDataTmp(res.data);
        action.updateLoading(false);
      });
  };

  const handleInfor = async (e) => {
    const valueId = e.target.dataset.index;
    setId(valueId)
    if (valueId === id && check.open) closeInfor();
    else {
      action.updateLoading(true);
      axios
        .get(`https://evening-wildwood-46158.herokuapp.com/users/${valueId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          action.updateOpen(true);
          action.updateUser(res.data);
          action.updateLoading(false);
        });
    }
  };

  const closeInfor = () => {
    action.updateOpen(false);
  };

  const handleOk = () => {
    setVisible(false);
    action.updateLoading(true);
    axios
      .delete(`http://evening-wildwood-46158.herokuapp.com/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        action.updateLoading(false);
        updateUser();
      });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSearch = async (e) => {
    setPage(1);
    const key = e.target.value;
    if (!key) {
      setUsers(dataTmp);
    } else {
      const tmp = dataTmp?.filter(
        (user) => user.username.includes(key)
      );
      setUsers(tmp);
    }
  };

  const onChange = (page) => {
    setPage(page);
  };


  return (
    <div className="main-content">
      <Title title="Danh sách khách hàng" />
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
          <Link to={routesPath.createUser}>
            <PlusOutlined />
            <span style={{ marginLeft: "5px" }}>New User</span>
          </Link>
        </div>
      </div>
      <div className="list-user">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Day Of Birth</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) =>
                page * 10 - 10 <= index && index <= page * 10 - 1 ? (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{moment(user.dayOfBirth).format("DD-MM-YYYY")}</td>
                    <td>
                      {user.role === "admin" ? (
                        <Tag color="volcano">{user.role}</Tag>
                      ) : (
                        <Tag color="blue">{user.role}</Tag>
                      )}
                    </td>
                    <td className="combo-button">
                      <button
                        data-index={user.id}
                        className="button-interactive"
                        onClick={handleInfor}
                      >
                        Show
                      </button>
                      <button
                        data-index={user.id}
                        className="button-interactive"
                      >
                        <Link to={`/users/edit/${user.id}`}>Edit</Link>
                      </button>
                      <button
                        className="button-interactive"
                        onClick={() => {
                          setVisible(true);
                          setId(user.id);
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
          total={users ? users.length : 500}
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
    </div>
  );
};
export default memo(Users);
