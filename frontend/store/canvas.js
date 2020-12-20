const customToJSON = (canvasObject) => {
  // Axios will call 'toJSON' before sending, as we cannot actually send an Object
  // toJson(), will remove our custom mtiID, so we have to Re-Add it afterwards.
  const asJSON = canvasObject.toJSON();
  asJSON.mtiID = canvasObject.mtiID;

  return asJSON;
};

const CANVASID_NOT_DEFINED = 'Canvas ID is not defined!';

/* eslint-disable no-shadow */
export const state = () => ({
  id: null,
});

export const mutations = {
  SET_CANVAS_ID(state, id) {
    state.id = id;
  },
};

export const actions = {
  async createCanvas({ commit, dispatch, state }) {
    await this.$axios.get('/whiteboard/create').then((res) => {
      if (res.status === 200) {
        const canvasID = res.data._id;
        commit('SET_CANVAS_ID', canvasID);
      }
    });
  },
  async joinCanvas({ commit }, canvasID) {
    if (state.id) {
      console.error(CANVASID_NOT_DEFINED);
      return;
    }
    await this.$axios.get(`whiteboard/${canvasID}/join`).then((res) => {
      if (res.status === 200) {
        commit('SET_CANVAS_ID', canvasID);
      }
    });
  },
  // Create a new Canvas-Object on a Whiteboard
  async createCanvasObject({ state }, canvasObject) {
    if (!state.id) {
      console.error(CANVASID_NOT_DEFINED);
      return;
    }

    const asJSON = customToJSON(canvasObject);
    await this.$axios
      .post(`/whiteboard/${state.id}/canvas/object`, {
        object: asJSON,
      })
      .then((res) => {
        console.log(res);
      });
  },

  // Delete an Existing Canvas-Object
  async deleteCanvasObject({ state }, canvasObject) {
    if (!state.id) {
      console.error(CANVASID_NOT_DEFINED);
      return;
    }

    const asJSON = customToJSON(canvasObject);
    await this.$axios
      .$delete(`/whiteboard/${state.id}/canvas/object`, {
        object: asJSON,
      })
      .then((res) => console.log(res));
  },

  // Update an Existing Canvas-Object
  async updateCanvasObject({ state }, canvasObject) {
    if (!state.id) {
      console.error(' Canvas ID is not defined!');
      return;
    }

    const asJSON = customToJSON(canvasObject);
    await this.$axios
      .$put(`/whiteboard/${state.id}/canvas/object`, {
        object: asJSON,
      })
      .then((res) => console.log(res));
  },
};
