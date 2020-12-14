import React from "react";
import Layer from "./Layer/Layer";

const Layers = (props) => {
  let layers = props.divesites.divesites.map((site) => {
    return <Layer map={props.map} site={site} key={site._id} />;
  });

  return <>{layers}</>;
};

export default Layers;
