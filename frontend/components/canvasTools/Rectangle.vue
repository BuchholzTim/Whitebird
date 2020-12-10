<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import customEvents from '~/utils/customEvents';

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  mounted() {
    this.$nuxt.$on(customEvents.canvasTools.rectangle, (payload) => {
      this.createRectangle();
    });
  },
  methods: {
    createRectangle() {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 150,
        height: 120,
        fill: 'red',
      });
      this.canvas.add(rect).setActiveObject(rect);
      this.canvas.renderAll();
    },
  },
};
</script>
