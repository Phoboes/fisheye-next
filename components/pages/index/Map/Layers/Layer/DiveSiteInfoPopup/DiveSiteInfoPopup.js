import React from "react";

const DiveSiteInfoPopup = (props) => {
  const site = props.site;
  return (
    <div>
      <h4>{site.name}</h4>
      <p>{site.description}</p>
    </div>
  );
};

export default DiveSiteInfoPopup;
