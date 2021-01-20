// Triggered on the edit shape button being clicked
export function editStart(map, shape, e) {
  console.log("An edit has started.");
}

// Triggered on the save button being hit
export function editStop(map, shape, e, data) {
  console.log("An edit has been completed.");
  // Save to db
  // Return new shape
  // -> Update the view
  //   console.log(e);
  // console.log(location.href);
  // console.log("------------- OLD SHAPE -------------");
  // console.log(data);
  // console.log("------------- NEW SHAPE -------------");
  // console.log(shape);

  // const res = await fetch(`${process.env.BASE_URL}/api/divesites`);

  // const newBoundaryPoints = shape.props.positions;
  const newShapeData = { ...data, boundaryPoints: shape.ref.current._latlngs };

  // If there's a shape with that ID in the database:
  // Update that shape in the database

  // Else
  // Create that new shape, post it to the database

  // Example POST method implementation:
  async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    // return response.json(); // parses JSON response into native JavaScript objects
  }

  debugger;

  console.log(`http://localhost:3000/api/divesites/${newShapeData._id}`);
  postData(
    `http://localhost:3000/api/divesites/${newShapeData._id}`,
    newShapeData,
  ).then((res) => {
    console.log(res); // JSON data parsed by `data.json()` call
  });

  // debugger;
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
export function shapeCreated(map, featureGroup, e) {
  console.log("A new shape has been added.");
  console.log("From NEW TOOLBAR.");
  console.log(map);
  map.addLayer(e.layer);
  // console.log(e.layer);
  return e;
  // Save to db
  // Return new shape
}
