import React, { useState, useRef } from "react";
import L, { FeatureGroup } from "leaflet";
import { useLeafletContext } from "@react-leaflet/core";
import leafletDraw from "leaflet-draw";
// import Control from "react-leaflet-control";
import styles from "./NewToolbar.module.css";
import * as toolbarMethod from "./ToolbarControls/ToolbarControls";

const NewPolygon = (props) => {
  const context = useLeafletContext();
  const map = context.map;
  const [control, setControl] = useState(null);
  const [toolbar, setToolbar] = useState(null);
  let editBar,
    featureGroup = null;
  const [polygon, setPolygon] = useState(null);

  if (toolbar !== null) {
    featureGroup = toolbar._toolbars.edit.options.featureGroup;
    map.on("draw:created", (e) => {
      const newPolygon = toolbarMethod.shapeCreated(map, featureGroup, e);
      props.setCurrentPolygon(newPolygon);
    });
  }

  const addDiveSite = (map) => {
    props.setCurrentPolygon("newPolygon");
  };

  if (props.currentlyEditing !== null) {
    if (props.currentlyEditing.layerType === "polygon") {
      if (!props.currentlyEditing.layer.editing.enabled()) {
        editBar = (
          <div className={styles.editBar}>
            <button>Save</button>
            <button
              onClick={() => {
                setPolygon({ ...props.currentlyEditing });
                props.currentlyEditing.layer.editing.enable();
              }}>
              Edit
            </button>
            <button
              onClick={async () => {
                toolbar.remove();
                map.removeLayer(props.currentlyEditing.layer);
                await props.setCurrentPolygon(null).then((e) => {
                  setToolbar(null);
                });
              }}>
              Cancel
            </button>
          </div>
        );
      } else {
        editBar = (
          <div className={styles.editBar}>
            <button>Save</button>
            <button>Undo</button>
            <button
              onClick={() => {
                console.log(map);
                console.log(polygon.layer._latlngs);
                console.log(props.currentlyEditing.layer._latlngs);
                console.log(toolbar);
                map.removeLayer(props.currentlyEditing.layer);
                // map.addLayer(polygon.layer);
                props.setCurrentPolygon(polygon);
              }}>
              Cancel
            </button>
          </div>
        );
      }
    }
  }

  if (props.currentlyEditing === "newPolygon" && toolbar === null) {
    const newFeatureGroup = new L.FeatureGroup();
    const newToolbar = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        marker: false,
        rectangle: false,
        marker: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: newFeatureGroup,
      },
    });
    map.addControl(newToolbar);
    setToolbar(newToolbar);
  }

  // Creates the HTML elements for the custom map buttons
  if (props.currentlyEditing === null && control === null) {
    L.Control.NewDiveControl = L.Control.extend({
      onAdd: function (map) {
        const buttonWrapper = L.DomUtil.create(
          "div",
          `${styles.buttonWrapper}`,
        );
        const newDiveButton = L.DomUtil.create(
          "div",
          `${styles.newPolygon} ${styles.customUtilityButton}`,
        );
        const newMarkerButton = L.DomUtil.create(
          "div",
          `${styles.newMarker} ${styles.customUtilityButton} ${styles.disabled}`,
        );

        newDiveButton.title = "Add a new dive site.";
        newDiveButton.onclick = () => {
          // console.log("Click.");
          addDiveSite(map);
        };
        newMarkerButton.title = "Add a temporary marker.";

        buttonWrapper.appendChild(newMarkerButton);
        buttonWrapper.appendChild(newDiveButton);
        // console.log(newDiveButton);
        return buttonWrapper;
      },

      onRemove: function (map) {
        // Nothing to do here
      },
    });

    L.control.newDiveControl = function (opts) {
      return new L.Control.NewDiveControl(opts);
    };

    // Adds the new controls creeated above to the map itself
    const newControl = L.control
      .newDiveControl({ position: "topright" })
      .addTo(map);
    setControl(newControl);
  } else if (props.currentlyEditing !== null && control !== null) {
    control.remove();
    setControl(null);
  }

  console.log(props.currentlyEditing);

  return <>{editBar}</>;
};

export default NewPolygon;
