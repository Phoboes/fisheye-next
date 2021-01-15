import React, { useEffect } from "react";
import EditButton from "../PopupButtons/Edit/Edit";

const DiveSiteInfoPopup = (props) => {
  const site = props.site;

  return (
    <div>
      <h4>{site.name}</h4>
      <p>{site.description}</p>
      <EditButton editHandler={props.editHandler} polygon={props.polygon}>
        +
      </EditButton>
    </div>
  );
};

export default DiveSiteInfoPopup;
