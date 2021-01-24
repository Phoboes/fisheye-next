import React, { useRef } from "react";
import Layer from "./Layer/Layer";
import L, { map } from "leaflet";
import { FeatureGroup } from "react-leaflet";

const Layers = (props) => {
  let layers = props.divesites.divesites.map((site) => {
    // const featureGroup = new L.FeatureGroup();
    // props.map.addLayer(featureGroup);
    // const featureId = featureGroup._leaflet_id;
    const ref = useRef(null);

    //   const toolbar = new L.Control.Draw({
    //     draw: {
    //       polygon: false,
    //       polyline: false,
    //       // marker: false,
    //       // rectangle: false,
    //       // marker: false,
    //       // circle: false,
    //       circlemarker: false,
    //     },
    //      edit: {
    //           featureGroup: ref
    //   }
    // });

    return (
      <FeatureGroup ref={ref} key={site._id}>
        <Layer
          // map={props.map}
          site={site}
          // key={site._id}
          featureGroup={ref}
          // featureId={featureId}
          // toolbar={toolbar}
          currentPolygon={props.currentPolygon}
          setCurrentPolygon={props.setCurrentPolygon}
        />
      </FeatureGroup>
    );
  });

  return <>{layers}</>;
};

export default Layers;
