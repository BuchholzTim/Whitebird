<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
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
  mounted() {
    this.$nuxt.$on(customEvents.canvasTools.enliven, (payload) => {
      this.recreateFromJSON(payload);
    });
  },
  methods: {
    recreateFromJSON(canvasObjectAsJSON) {
      fabric.util.enlivenObjects([canvasObjectAsJSON], (enlivenedObjects) => {
        enlivenedObjects.forEach((enlivenedObject) => {
          logger(this, enlivenedObject);
          this.canvas.add(enlivenedObject);
        });
      });
      this.canvas.renderAll();
    },
  },
};
</script>
