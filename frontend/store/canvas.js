import customEvents from '../utils/customEvents';
import WhitebirdLogger from '~/utils/WhitebirdLogger';

const CANVASID_NOT_DEFINED = 'Canvas ID is not defined!';

const logger = new WhitebirdLogger('Canvas.js');

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
  async joinCanvas({ commit }, canvasID) {
    if (!canvasID) {
      logger.error(CANVASID_NOT_DEFINED);
      return undefined;
    }

    const request = this.$axios.get(`whiteboard/${canvasID}`).then((res) => {
      if (res.status === 200) {
        commit('SET_CANVAS_ID', canvasID);
        return canvasID;
      }
      return undefined;
    });

    return request;
  },
  // Triggered when a Client receives the corresponding Event from Server-Socket
  async createCanvasObjectServer({ state }, message) {
    if (!state.id) {
      logger.error(CANVASID_NOT_DEFINED);
      return;
    }
    const canvasObject = message.message;
    // Emit Event to revive the Object
    this.$customEmit(customEvents.canvasTools.enliven, canvasObject);
  },

  // Delete an Existing Canvas-Object
  async deleteCanvasObjectServer({ state }, message) {
    if (!state.id) {
      logger.error(CANVASID_NOT_DEFINED);
      return;
    }

    const canvasObject = message.message;
    // Emit Event to revive the Object
    this.$customEmit(customEvents.canvasTools.deletedObejctFromServer, canvasObject);
  },

  // Update an Existing Canvas-Object
  async updateCanvasObjectServer({ state }, message) {
    if (!state.id) {
      logger.error(CANVASID_NOT_DEFINED);
      return;
    }

    const canvasObject = message.message;
    // Emit Event to revive the Object
    logger.log('updateCanvasObject');
    this.$customEmit(customEvents.canvasTools.updateObjectFromServer, canvasObject);
  },
};
