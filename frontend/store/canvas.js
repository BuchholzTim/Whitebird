import logger from '../utils/logger';

const CANVASID_NOT_DEFINED = 'Canvas ID is not defined!';
const REFERER = 'STORE: Canvas';

const customToJSON = (canvasObject) => {
  // Axios will call 'toJSON' before sending, as we cannot actually send an Object
  // toJson(), will remove our custom id, so we have to Re-Add it afterwards.
  const customPropertiesToKeep = ['whitebirdData'];
  const asJSON = canvasObject.toJSON(customPropertiesToKeep);
  logger(REFERER, asJSON);
  return asJSON;
};

/* eslint-disable no-shadow */
export const state = () => ({
  id: null,
  testObject: null,
});

export const mutations = {
  SET_CANVAS_ID(state, id) {
    state.id = id;
  },
  SET_TEST_OBJECT(state, object) {
    state.testObject = object;
  },
};

export const actions = {
  // Demo-Reasons
  createTestObject({ commit, state }, object) {
    if (!state.id) {
      console.error(CANVASID_NOT_DEFINED);
      return;
    }
    const asJSON = customToJSON(object);
    commit('SET_TEST_OBJECT', asJSON);
  },
  async createCanvas({ commit, dispatch, state }) {
    await this.$axios.get('/whiteboard/create').then((res) => {
      if (res.status === 200) {
        const canvasID = res.data._id;
        commit('SET_CANVAS_ID', canvasID);
      }
    });
  },
  async joinCanvas({ commit, state }, canvasID) {
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
        logger(REFERER, res);
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
      .then((res) => logger(REFERER, res));
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
      .then((res) => logger(REFERER, res));
  },
};
