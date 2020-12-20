/* eslint-disable no-shadow */
export const state = () => ({});

export const mutations = {};

export const actions = {
  messageToClient({ commit, state }, payload) {
    console.log('Received messageToClient');
    console.log(payload);
  },
  createCanvasObject({ commit, state }) {
    console.log('Received CREATE_CANVAS_OBJECT');
  },
  deleteCanvasObject({ commit, state }) {
    console.log('Received DELETE_CANVAS_OBJECT');
  },
  updateCanvasObject({ commit, state }) {
    console.log('Received UPDATE_CANVAS_OBJECT');
  },
};
