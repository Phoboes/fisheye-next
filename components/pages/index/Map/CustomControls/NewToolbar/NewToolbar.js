import React, { useState, useRef } from "react";
import L from "leaflet";
import { FeatureGroup, Popup, Polygon } from "react-leaflet";
import { useLeafletContext } from "@react-leaflet/core";
// import leafletDraw from "leaflet-draw";
// import Control from "react-leaflet-control";
import styles from "./NewToolbar.module.css";
import * as toolbarMethod from "./ToolbarControls/ToolbarControls";

const NewPolygon = (props) => {
  const context = useLeafletContext();
  const map = context.map;
  // Control is the wrapper for all of the custom buttons (i.e new dive site)
  const [control, setControl] = useState(null);
  // Toolbar is the toolbar module itself and has nothing to do with 'control'.
  const [toolbar, setToolbar] = useState(null);
  let editBar,
    content = null;
  let fgRef = useRef(null);
  const [polygonData, setPolygonData] = useState(null);
  const [editingPolygon, toggleEditingPolygon] = useState(false);

  if (toolbar !== null && fgRef !== null) {
    map.on("draw:created", (e) => {
      const newPolygon = toolbarMethod.shapeCreated(e, fgRef, setPolygonData);
      props.setCurrentPolygon(newPolygon);
    });
  }

  const addToolbar = () => {
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
        featureGroup: fgRef.current,
      },
      position: "topright",
    });
    map.addControl(newToolbar);
    setToolbar(newToolbar);
    return newToolbar;
  };

  const hideToolbar = (toolbar) => {
    // console.log("Hide toolbar:");
    // console.log(toolbar);
    // Starts the draw method with a click then hides the default toolbar.
    toolbar._toolbars.draw._toolbarContainer.children[0].click();
    toolbar._container.style.display = "none";
  };

  // A generic state setter in 'map' that basically says: The thing we're editing isn't null, but it's also not an existing dive site.
  const addDiveSite = async (map) => {
    await props.setCurrentPolygon("newPolygon");
    const newToolbar = addToolbar();
    hideToolbar(newToolbar);
  };

  if (props.currentlyEditing !== null) {
    if (props.currentlyEditing === "newPolygon") {
      editBar = (
        <div className={styles.editBar}>
          <span>Click to draw.</span>
        </div>
      );
    }
    if (props.currentlyEditing.layerType === "polygon") {
      if (!editingPolygon) {
        console.log(toolbar);
        editBar = (
          <div className={styles.editBar}>
            <button>Save site</button>
            <button
              onClick={() => {
                toolbar._toolbars.edit._toolbarContainer.children[0].click();
                // props.currentlyEditing.layer.editing.enable();
                toggleEditingPolygon(true);
              }}>
              Edit
            </button>
            <button
              onClick={async () => {
                await props.setCurrentPolygon(null).then((e) => {
                  toolbar._toolbars.edit._toolbarContainer.children[1].click();
                  toolbar._toolbars.edit._toolbarContainer.offsetParent
                    .querySelector("ul")
                    .childNodes[2].lastElementChild.click();
                  toolbar.remove();
                  setToolbar(null);
                });
                setFeatureGroup(null);

                // TODO: Reset states properly on cancel.
              }}>
              Cancel
            </button>
          </div>
        );
      } else {
        editBar = (
          <div className={styles.editBar}>
            <button>Save changes</button>
            <button
              onClick={() => {
                toolbar._toolbars.edit._toolbarContainer.children[1].click();
              }}>
              Cancel
            </button>
          </div>
        );
      }
    }
  }

  if (props.currentlyEditing === "newPolygon") {
    content = <FeatureGroup ref={fgRef}></FeatureGroup>;
  } else if (polygonData !== null) {
    content = (
      <FeatureGroup ref={fgRef}>
        <Polygon positions={polygonData.layer._latlngs} color="yellow" />;
      </FeatureGroup>
    );
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
          addDiveSite(map);
        };
        newMarkerButton.title = "Add a temporary marker.";

        buttonWrapper.appendChild(newMarkerButton);
        buttonWrapper.appendChild(newDiveButton);
        return buttonWrapper;
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

  return (
    <>
      {content}
      {editBar}
    </>
  );
};

export default NewPolygon;
