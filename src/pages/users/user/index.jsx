import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './index.less'


const User = () => {
  const [users, setUsers] = useState([])
  const myRef = useRef(null);

  useEffect(() => {
    axios.get('https://evening-wildwood-46158.herokuapp.com/users').then(res => {
      setUsers(res.data)
    });
  }, [])

  return (
    <div className="table-content">
      <table style={{minWidth: "100%"}} ref={myRef}>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Username</th>
            <th>Tuổi</th>
            <th>Địa Chỉ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, i) => (
              <tr key={i}>
                <td>{user['name']}</td>
                <td>{user['username']}</td>
                <td>{user['age']}</td>
                <td>{user['address']}</td>
                <td>
                  <div className="table-button">
                    <Link to={`/admin/student/${user.id}`} className="show">Show</Link>
                    <Link to={`/admin/student/${user.id}/edit`} className="edit">Edit</Link>
                    <Link to="" className="delete">Delete</Link>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
export default User;
