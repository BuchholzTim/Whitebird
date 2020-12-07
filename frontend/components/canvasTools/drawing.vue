<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  mounted() {
    this.$nuxt.$on('drawingTool', (payload) => {
      this.canvas.isDrawingMode = !this.canvas.isDrawingMode;
    });
  },
};
</script>
