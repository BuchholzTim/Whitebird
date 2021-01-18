import logger from '~/utils/logger';

const REFERER = 'STORE: Socket';
/* eslint-disable no-shadow */
export const state = () => ({});

export const mutations = {};

export const actions = {
  messageToClient({ commit, state }, payload) {
    const messages = ['Received messageToClient'];
    logger(REFERER, messages);
  },
};
