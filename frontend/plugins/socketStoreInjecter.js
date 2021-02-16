import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('Plugin: socketStoreInjecter');

export default (context, inject) => {
  inject('customEmit', (eventName, payload) => {
    logger.log(eventName);
    $nuxt.$emit(eventName, payload);
  });
};
