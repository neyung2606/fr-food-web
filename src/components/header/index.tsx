import React from "react";
import "./styles.less";

const HeaderMenu = () => {
  return (
    <header className="header-container">
      <div className="container-fluid">
        <div className="header-wrap">
          <div className="account-wrap">
            <div className="image">
              <img
                src={require("../../misc/logo/logo.png")}
                alt="Avatar-User"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
