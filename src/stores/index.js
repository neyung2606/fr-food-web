import React, { createContext, useState } from "react";

const MyContext = createContext();
const MyContextProvider = (props) => {
  const [open, setOpen] = useState(false);
  const [infor, setInfor] = useState({});
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');

  const updateOpen = (check) => {
    setOpen(check);
  };
  const updateUser = (check) => {
    setInfor(check);
  };
  const updateLoading = (check) => {
    setLoading(check);
  };
  const updateRole = (check) => {
    setRole(check);
  }

  return (
    <MyContext.Provider
      value={{
        check: {
          open,
          infor,
          loading,
          role
        },
        action: {
          updateOpen,
          updateUser,
          updateLoading,
          updateRole
        },
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
