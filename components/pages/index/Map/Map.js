import React, { useEffect, useState } from "react";
// import L from "leaflet";
import styles from "./Map.module.css";
import Layers from "./Layers/Layers";
import { MapContainer, TileLayer } from "react-leaflet";
import TileLayers from "./TileLayers/TileLayers";

const MapWrapper = (props) => {
  const [currentPolygon, setCurrentPolygon] = useState(null);

  const setPolygonStateHandler = (polygon = null) => {
    setCurrentPolygon(polygon);
  };

  return (
    <div>
      <p>{`Editing: ${currentPolygon}`}</p>
      <MapContainer
        center={[-34.040441, 151.1988752]}
        zoom={13}
        className={styles["leaflet-container"]}>
        <TileLayers />
        <Layers
          divesites={props.divesites}
          currentPolygon={currentPolygon}
          setCurrentPolygon={setPolygonStateHandler}
        />
      </MapContainer>
    </div>
  );
};
export default MapWrapper;
