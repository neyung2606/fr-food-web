import React, { FC, useState, useEffect, memo } from "react";
import axios from "axios";
import "./index.less";
import { User } from "../../../utils";
import ButtonCreate from "./components/ButtonCreate";
import UserItem from "./components/UserItem";

type Props = {}

const Users: FC<Props> = () => {
  const [users, setUsers] = useState<User[] | null | undefined>();

  useEffect(() => {
    updateUser();
  }, []);

  const updateUser = async () => {
    const userArray = await axios.get("https://evening-wildwood-46158.herokuapp.com/users");
    setUsers(userArray.data)
  };

  return (
    <div className="main-content">
      <div className="list-user">
        {users && 
          users.map((item, index) => (
            <UserItem user={item} key={index}/>
          ))
        }
      </div>
      <div className="button-create">
        <ButtonCreate />
      </div>
    </div>
  );
};
export default memo(Users);
