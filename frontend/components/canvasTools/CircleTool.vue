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
    this.$nuxt.$on(customEvents.canvasTools.circle, (payload) => {
      this.canvas.isDrawingMode = false;
      this.createCircle(payload);
    });
  },
  methods: {
    createCircle(options) {
      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 75,
        stroke: options.stroke,
        fill: options.fill,
        mtiID: v4(),
      });
      this.canvas.add(circle).setActiveObject(circle);
      this.canvas.renderAll();
    },
  },
};
</script>
