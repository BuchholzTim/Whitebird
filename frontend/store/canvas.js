import logger from '../utils/logger';
import customEvents from '../utils/customEvents';

const CANVASID_NOT_DEFINED = 'Canvas ID is not defined!';
const REFERER = 'STORE: Canvas';

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
  // Sends a Request to the Backend-Server to create a new Canvas
  // Sets CanvasId if successful
  async createCanvas({ commit }) {
    await this.$axios.get('/whiteboard/create').then((res) => {
      if (res.status === 200) {
        const canvasID = res.data._id;
        commit('SET_CANVAS_ID', canvasID);
      }
    });
  },
  // Sends a Request to the Backend-Server to join a Canvas
  // Sets CanvasId if successful
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
  // Triggered when a Client receives the corresponding Event from Server-Socket
  async createCanvasObjectServer({ state }, canvasObject) {
    if (!state.id) {
      console.error(CANVASID_NOT_DEFINED);
      return;
    }

    // Emit Event to revive the Object
    this.$customEmit(customEvents.canvasTools.enliven, canvasObject);
  },

  // Delete an Existing Canvas-Object
  async deleteCanvasObject({ state }, canvasObject) {
    if (!state.id) {
      console.error(CANVASID_NOT_DEFINED);
      return;
    }

    // Logik zum entfernen eines Elements
    // TODO
    this.$customEmit('EVENT', canvasObject);
  },

  // Update an Existing Canvas-Object
  async updateCanvasObject({ state }, canvasObject) {
    if (!state.id) {
      console.error(' Canvas ID is not defined!');
      return;
    }

    // Logik zum Updaten eines Elements
    // TODO
    this.$customEmit('EVENT', canvasObject);
  },
};
