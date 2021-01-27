<template>
  <div></div>
</template>

<script>
import logger from '~/utils/logger';

export default {
  async asyncData({ redirect, params, store }) {
    logger('Dynamic Share-Page', params.id);
    const canvasId = await store.dispatch('canvas/joinCanvas', params.id);
    if (typeof canvasId !== 'undefined') { redirect('/Whiteboard'); }
    return { };
  },
};
</script>
