import React, { useEffect, useState } from "react";
import L from "leaflet";
import styles from "./Map.module.css";
import Layers from "./Layers/Layers";

const Map = (props) => {
  const accessToken = process.env.leaflet_api_key;
  let mymap = null;
  let layers = null;

  const [mapObj, setMapObj] = useState(null);

  useEffect(() => {
    setMapObj(L.map("mapid").setView([-34.040441, 151.1988752], 13));
  }, []);

  const streets = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      id: "mapid",
      attribution: null,
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      detectRetina: true,
      accessToken,
    },
  );

  const satellite = L.tileLayer(
    `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`,
    {
      id: "mapid",
      attribution: null,
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      detectRetina: true,
      accessToken,
    },
  );

  if (mapObj !== null) {
    const baseMaps = {
      Satellite: satellite,
      Streets: streets,
    };
    mapObj.layers = [streets, satellite];

    L.control.layers(baseMaps).addTo(mapObj);
    streets.addTo(mapObj);
    layers = <Layers map={mapObj} divesites={props.divesites} />;
  }

  return (
    <div id="mapid" className={styles.map}>
      {layers}
    </div>
  );
};
export default Map;
