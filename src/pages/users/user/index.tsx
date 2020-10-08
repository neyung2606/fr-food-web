import React, { FC, useState, useEffect, memo } from "react";
import axios from "axios";
import "./index.less";
import { User } from "../../../utils";
import ButtonCreate from "./components/ButtonCreate";
import Title from "src/components/title";

type Props = {};

const Users: FC<Props> = () => {
  const [users, setUsers] = useState<User[] | null | undefined>();

  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = () => {
    const token =  localStorage.getItem("access-token");
    axios.get(
      "https://evening-wildwood-46158.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}`}
      }
    ).then((res) => {
      setUsers(res.data);
    });
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
          />
        </div>
      </div>
      <div className="list-user">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Day Of Birth</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.dayOfBirth}</td>
                  <td></td>
                  <td className="combo-button">
                    <p>Show</p>
                    <p>Edit</p>
                    <p>Delete</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="button-create">
        <ButtonCreate />
      </div>
    </div>
  );
};
export default memo(Users);
