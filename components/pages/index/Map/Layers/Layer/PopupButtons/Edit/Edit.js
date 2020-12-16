import React from "react";

const Edit = (props) => {
  const clickHandler = () => {
    props.editHandler();
  };

  return (
    <button
      onClick={(e) => {
        console.log("Clicked");
        clickHandler(e);
      }}>
      +
    </button>
  );
};

export default Edit;
