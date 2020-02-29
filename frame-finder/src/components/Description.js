import React from "react";
import Logo from "../img/logo.png";

function Description() {
  return (
    <>
      <div className="descWrapper">
        <img src={Logo} class="descLogo" />

        <div class="descSeparator"></div>
        <div class="descSection">
          <div class="descHeading">Rationale</div>
          <div class="descText">Blah blah blah blah</div>
        </div>
      </div>
    </>
  );
}

export default Description;
