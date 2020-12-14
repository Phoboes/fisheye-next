// Triggered on the edit shape button being clicked
export function editStart(map, shape, e) {
  console.log("An edit has started.");
}

// Triggered on the save button being hit
export function editStop(map, shape, e) {
  console.log("An edit has been completed.");
  // Save to db
  // Return new shape
  // -> Update the view
  //   console.log(e);
  debugger;
}

// Draw events, these are things like polygon points being added
export function drawStart(map, shape, e) {
  console.log("A draw event has started.");
}

// This is when a drawing is completed, ie the last point on the polygon path has been clicked.
export function drawStop(map, shape, e) {
  console.log("A draw event has stopped.");
}

// Triggered once a shape is completed
export function shapeCreated(map, shape, e) {
  console.log("A new shape has been added.");
  // Save to db
  // Return new shape
  // -> Update the view
}
