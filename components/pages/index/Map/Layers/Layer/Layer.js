import React, { useState, useRef } from "react";
import L, { featureGroup, map } from "leaflet";
import leafletDraw from "leaflet-draw";
import { Popup, Polygon } from "react-leaflet";
import * as toolbarMethod from "./ToolbarControls/ToolbarControls";
import { renderToString } from "react-dom/server";
import DiveSiteInfo from "./DiveSiteInfoPopup/DiveSiteInfoPopup";

const Layer = (props) => {
  let map = null;
  let polyRef = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [toolbar, setToolbar] = useState(null);
  const [polygonBounds, setPolygonBounds] = useState(props.site.boundaryPoints);

  let polygon = (
    <Polygon ref={polyRef} color="red" positions={polygonBounds}>
      <Popup>
        <DiveSiteInfo
          site={props.site}
          editHandler={toggleEditMode}
          polygon={polyRef}
        />
      </Popup>
    </Polygon>
  );

  if (polyRef.current !== null) {
    map = polyRef.current._map;
  }

  function toolbarToggleHandler() {
    if (editMode === true && toolbar === null) {
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
        edit: {
          featureGroup: props.featureGroup.current,
        },
      });

      map.addControl(toolbar);
      // polyRef.current.editing.enable();
      setToolbar(toolbar);
      props.setCurrentPolygon(props.site._id);

      // debugger;
    } else if (editMode === false && toolbar !== null) {
      map.removeControl(toolbar);
      setToolbar(null);
    }
  }

  function toggleEditMode(e) {
    // console.log(e);
    setEditMode(!editMode);
    // polyRef.editing.enable();
    console.log(polyRef);
  }

  // Toolbar event listeners

  if (map !== null) {
    toolbarToggleHandler();
    // console.log(props);
  }

  if (props.currentPolygon !== props.site._id && editMode === true) {
    setEditMode(false);
  } else if (props.currentPolygon === props.site._id && editMode !== true) {
    setEditMode(true);
  }

  if (map !== null) {
    // map.on("draw:editstart", (e) => {
    //   toolbarMethod.editStart(props.map, polygon, e, props.site);
    // });
    // map.on("draw:editstop", (e) => {
    //   toolbarMethod.editStop(props.map, polygon, e, props.site);
    // });
    // map.on("draw:created", (e) => {
    //   toolbarMethod.shapeCreated(props.map, polygon, e);
    // });
    // map.on("draw:drawstart", (e) => {
    //   toolbarMethod.drawStart(props.map, polygon, e);
    // });
    map.on("draw:drawstop", (e) => {
      toolbarMethod.drawStop(props.map, polygon, e);
    });
  }
  console.log("State of editMode this render: " + editMode);
  return polygon;
};

export default Layer;
