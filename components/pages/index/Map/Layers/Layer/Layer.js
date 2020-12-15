import React, { useState, useEffect } from "react";
import L, { featureGroup, map } from "leaflet";
import leafletDraw from "leaflet-draw";
import * as toolbarMethod from "./ToolbarControls/ToolbarControls";
import { renderToString } from "react-dom/server";
import DiveSiteInfo from "./DiveSiteInfoPopup/DiveSiteInfoPopup";

const Layer = (props) => {
  // Render the polygon to the page && set default popup content
  const polygon = L.polygon(props.site.boundaryPoints, { color: "red" });
  let polygoncontent = renderToString(<DiveSiteInfo site={props.site} />);
  polygon.bindPopup(polygoncontent);

  const [editMode, setEditMode] = useState(false);
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    props.featureGroup.addLayer(polygon);
    setSiteData({ ...props.site });
  }, []);

  function toolbarToggleHandler() {
    let toolbar = null;
    if (state.editMode === true) {
      props.map.addControl(props.toolbar);
    } else {
      props.map.removeControl(props.toolbar);
    }
    return toolbar;
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
    // console.log("Clicked!");
    // console.log(props.featureGroup);
    setEditMode(!editMode);
  });

  // toolbarToggleHandler();

  console.log(editMode);
  return null;
};

export default Layer;
