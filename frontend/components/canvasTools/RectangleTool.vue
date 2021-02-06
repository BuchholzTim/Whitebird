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
  mounted() {
    this.$nuxt.$on(customEvents.canvasTools.rectangle, (payload) => {
      this.canvas.isDrawingMode = false;
      this.createRectangle(payload);
    });
  },
  methods: {
    createRectangle(options) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        width: 150,
        height: 120,
        stroke: options.stroke,
        fill: options.fill,
        whitebirdData: { id: v4() },
      });

      this.canvas.add(rect).setActiveObject(rect);
      this.canvas.renderAll();
    },
  },
};
</script>
