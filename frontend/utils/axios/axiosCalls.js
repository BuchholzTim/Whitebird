function createWhiteboard($axios) {
  return $axios.$get('/whiteboard/create');
}

function joinWhiteboard($axios, canvasID) {
  return $axios.$get(`/whiteboard/${canvasID}/join`);
}

function deleteCanvasObject($axios, canvasID, canvasObject) {
  return $axios
    .$delete(`/whiteboard/${canvasID}/canvas/delete`, {
      object: canvasObject,
    })
    .then((res) => console.log(res));
}

module.exports = { createWhiteboard, joinWhiteboard, deleteCanvasObject };
