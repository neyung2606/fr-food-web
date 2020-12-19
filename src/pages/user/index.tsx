import React, {
  useState,
  useEffect,
  memo,
  useContext,
  FunctionComponent,
} from "react";
import axios from "axios";
import "./index.less";
import { User } from "@utils";
import { Title } from "@components";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { MyContext } from "@stores";
import { Tag, Modal, Pagination } from "antd";
import CreateUser from "@pages/user/components/create-user";
import { Link } from "react-router-dom";
import { url } from "@constants";

const Users: FunctionComponent = () => {
  const token = localStorage.getItem("access-token");
  const [users, setUsers] = useState<User[] | null | undefined>();
  const { action } = useContext(MyContext);
  const [visible, setVisible] = useState<boolean>(false);
  const [dataTmp, setDataTmp] = useState<User[] | null>();
  const [id, setId] = useState<any>();
  const [page, setPage] = useState<number>(1);
  const [visiCreate, setVisiCreate] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);

  useEffect(() => {
    updateUser();
    // eslint-disable-next-line
  }, []);

  const updateUser = () => {
    action.updateLoading(true);
    axios
      .get(`${url}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setDataTmp(res.data);
        action.updateLoading(false);
      }).catch(() => console.log('err'));
  };

  const handleInfor = async (e) => {
    const valueId = e.target.dataset.index;
    setIsShow(true);
    action.updateLoading(true);
    axios
      .get(`https://evening-wildwood-46158.herokuapp.com/users/${valueId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setVisiCreate(true);
        action.updateUser(res.data);
        action.updateLoading(false);
      });
  };

  const handleOk = () => {
    setVisible(false);
    action.updateLoading(true);
    axios
      .delete(`${url}/users/${id}`, {
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
      const tmp = dataTmp?.filter((user) => user.username.includes(key));
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
          <span
            onClick={() => {
              setIsShow(false);
              setVisiCreate(true);
            }}
            style={{ color: "white", padding: "10px" }}
          >
            <PlusOutlined />
            <span style={{ marginLeft: "5px" }}>New User</span>
          </span>
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
                page * 8 - 8 <= index && index <= page * 8 - 1 ? (
                  <tr key={index}>
                    <td>{user.name ?? ""}</td>
                    <td>{user.username ?? ""}</td>
                    <td>
                      {moment(user.dayOfBirth).format("DD-MM-YYYY") ?? ""}
                    </td>
                    <td>
                      <Tag className="tag">{user.role.name}</Tag>
                    </td>
                    <td className="combo-button">
                      <button
                        data-index={user.id}
                        className="button-interactive"
                        onClick={handleInfor}
                        style={{ color: "white" }}
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
      <CreateUser
        visible={visiCreate}
        setVisiable={setVisiCreate}
        updateUser={updateUser}
        isShow={isShow}
      />
    </div>
  );
};
export default memo(Users);
