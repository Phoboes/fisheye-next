import React from "react";
import Layer from "./Layer/Layer";
import L, { map } from "leaflet";

const Layers = (props) => {
  let layers = props.divesites.divesites.map((site) => {
    const featureGroup = new L.FeatureGroup();
    props.map.addLayer(featureGroup);
    const featureId = featureGroup._leaflet_id;

    const toolbar = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        marker: false,
        rectangle: false,
        marker: false,
        circle: false,
        circlemarker: false,
      },
    });

    return (
      <Layer
        map={props.map}
        site={site}
        key={site._id}
        featureGroup={featureGroup}
        featureId={featureId}
        toolbar={toolbar}
      />
    );
  });

  return <>{layers}</>;
};

export default Layers;
