// Create a New Whiteboard
function createWhiteboard($axios) {
  return $axios.$get('/whiteboard/create');
}

// Join an Existing Whiteboard
function joinWhiteboard($axios, canvasID) {
  return $axios.$get(`/whiteboard/${canvasID}/join`);
}

// Create a new Canvas-Object on a Whiteboard
function createCanvasObject($axios, canvasID, canvasObject) {
  return $axios
    .$post(`/whiteboard/${canvasID}/canvas/object`, {
      object: canvasObject,
    })
    .then((res) => console.log(res));
}

// Delete an Existing Canvas-Object
function deleteCanvasObject($axios, canvasID, canvasObject) {
  return $axios
    .$delete(`/whiteboard/${canvasID}/canvas/object`, {
      object: canvasObject,
    })
    .then((res) => console.log(res));
}

// Update an Existing Canvas-Object
function updateCanvasObject($axios, canvasID, canvasObject) {
  return $axios
    .$put(`/whiteboard/${canvasID}/canvas/object`, {
      object: canvasObject,
    })
    .then((res) => console.log(res));
}

module.exports = {
  createWhiteboard,
  joinWhiteboard,
  createCanvasObject,
  updateCanvasObject,
  deleteCanvasObject,
};
