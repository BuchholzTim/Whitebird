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
      if (this.testObject) {
        logger(this, 'Test-Object was already created:');
        logger(this, this.testObject);
        this.$nuxt.$emit(customEvents.canvasTools.enliven, this.testObject);
        return;
      }

      const circle = new fabric.Circle({
        left: 100,
        top: 100,
        radius: 75,
        stroke: options.stroke,
        fill: options.fill,
        mtiData: { id: v4() },
      });
      this.$store.dispatch('canvas/createCanvasObject', circle);

      this.canvas.add(circle).setActiveObject(circle);
      logger(this, circle);
      this.canvas.renderAll();
    },
  },
};
</script>
