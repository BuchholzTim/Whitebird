<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex';
import logger from '~/utils/logger';

export default {
  async asyncData({ redirect, params, store }) {
    const canvasId = await store.dispatch('canvas/joinCanvas', params.id);
    if (typeof canvasId !== 'undefined') { redirect('/Whiteboard'); }
    return { };
  },
};
</script>
