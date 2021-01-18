import logger from '~/utils/logger';

const REFERER = 'Plugin: socketStoreInjecter';

export default (context, inject) => {
  inject('customEmit', (eventName, payload) => {
    logger(REFERER, [eventName, payload]);
    $nuxt.$emit(eventName, payload);
  });
};
