import React from "react";
import "./styles.less";

const HeaderMenu = () => {
  return (
    <header className="header-container">
      <div className="section-content">
        <div className="container-fluid">
          <div className="header-wrap">
            <form className="form-header">
              <input
                className="form-control"
                type="text"
                name="search"
                placeholder="Search for data"
              />
              <button type="submit" className="btn-submit">
                <span>
                  <i className="fas fa-search"></i>
                </span>
              </button>
            </form>
            <div className="account-wrap">
              <div className="account-item">
                <div className="image">
                  <img
                    src={require("../../misc/logo/logo.png")}
                    alt="Avatar-User"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderMenu;
