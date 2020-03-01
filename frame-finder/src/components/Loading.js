import React from "react";

function Loading() {
  return (
    <>
      <div className="lds-ellipsis-visible">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

export default Loading;
