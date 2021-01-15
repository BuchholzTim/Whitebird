<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { mapState } from 'vuex';
import customEvents from '~/utils/customEvents';
import logger from '~/utils/logger';

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  data: () => ({}),
  computed: {
    ...mapState({
      canvasID: (state) => state.canvas.id,
      testObject: (state) => state.canvas.testObject,
    }),
  },
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
        whitebirdData: { id: v4() },
      });

      this.canvas.add(circle).setActiveObject(circle);
      logger(this, circle);
      this.canvas.renderAll();
    },
  },
};
</script>
