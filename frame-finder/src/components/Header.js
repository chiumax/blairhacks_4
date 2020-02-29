import React from "react";

import Logo from "../img/logo.png";

function Header() {
  return (
    <>
      <div className="bottomBorder"></div>
      <div className="leftHeader">
        <img src={Logo} className="logo"></img>

        <div className="logoText">SPIMTEXT</div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div></div>
    </>
  );
}

export default Header;
