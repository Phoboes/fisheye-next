import React from "react";

const Edit = (props) => {
  const clickHandler = (e) => {
    props.editHandler(e);
    console.log(props.polygon);
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
