<template>
  <div></div>
</template>

<script>
import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('Dynamic Share-Page');

export default {
  async asyncData({ redirect, params, store }) {
    logger.log(params.id);
    const canvasId = await store.dispatch('canvas/joinCanvas', params.id);
    if (typeof canvasId !== 'undefined') { redirect('/Whiteboard'); }
    return { };
  },
};
</script>
