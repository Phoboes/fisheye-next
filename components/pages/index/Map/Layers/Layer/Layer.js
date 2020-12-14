import React, { useState, useEffect } from "react";
import L from "leaflet";
import leafletDraw from "leaflet-draw";
import * as toolbarMethod from "./ToolbarControls/ToolbarControls";
import { renderToString } from "react-dom/server";
import DiveSiteInfo from "./DiveSiteInfoPopup/DiveSiteInfoPopup";

const Layer = (props) => {
  // Render the polygon to the page && set default popup content
  const polygon = L.polygon(props.site.boundaryPoints, { color: "red" });
  let polygoncontent = renderToString(<DiveSiteInfo site={props.site} />);
  polygon.bindPopup(polygoncontent);

  // The map layer in which all the rest is stored for THIS item
  const [featureGroup, setFeatureGroup] = useState(null);

  if (featureGroup === null) {
    let newFeatureGroup = new L.FeatureGroup();
    props.map.addLayer(newFeatureGroup);
    setFeatureGroup(newFeatureGroup);
  }

  useEffect(() => {
    featureGroup.addLayer(polygon);
  }, []);

  const [editState, toggleEditState] = useState(false);
  const [toolbar, setToolbar] = useState(null);
  const [polygonData, setPolygonData] = useState({ ...props.site });

  let drawControl = null;

  // Toolbar display
  if (editState && toolbar === null) {
    drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        marker: false,
        rectangle: false,
        marker: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: featureGroup,
      },
    });
    props.map.addControl(drawControl);
    setToolbar(drawControl);
    console.log(props.map);
    debugger;
    // polygonDisplayHandler(toolbar, false);
    console.log("The toolbar should be set here");
    console.log("State at time of render:" + editState);
  } else if (toolbar !== null && !editState) {
    console.log("The toolbar is unset here.");
    toolbar.remove();
    setToolbar(null);
  }

  // Toolbar event listeners

  props.map.on("draw:editstart", (e) => {
    toolbarMethod.editStart(props.map, polygon, e);
  });
  props.map.on("draw:editstop", (e) => {
    toolbarMethod.editStop(props.map, polygon, e);
  });
  props.map.on("draw:created", (e) => {
    toolbarMethod.shapeCreated(props.map, polygon, e);
  });
  props.map.on("draw:drawstart", (e) => {
    toolbarMethod.drawStart(props.map, polygon, e);
  });
  props.map.on("draw:drawstop", (e) => {
    toolbarMethod.drawStop(props.map, polygon, e);
  });

  polygon.on("click", (e) => {
    // polygonDisplayHandler(polygon, editState);
    // console.log("Click");
    console.log(toolbar !== null ? "Toolbar exists" : "Toolbar is null");
    console.log("State at time of click:" + editState);
    toggleEditState(!editState);
  });

  function polygonDisplayHandler(polygon, display = true) {
    if (!display) {
      featureGroup.removeLayer(polygon);
    } else {
      featureGroup.addLayer(polygon);
    }
  }
  console.log(toolbar);
  return null;
};

export default Layer;
