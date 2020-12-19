<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
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
    this.$nuxt.$on(customEvents.canvasTools.enliven, (payload) => {
      this.recreateFromJSON(payload);
    });
  },
  methods: {
    recreateFromJSON(canvasObjectAsJSON) {
      const { mtiID } = canvasObjectAsJSON;
      fabric.util.enlivenObjects([canvasObjectAsJSON], (enlivenedObjects) => {
        enlivenedObjects.forEach((enlivenedObject) => {
          enlivenedObject.mti = mtiID;
          this.canvas.add(enlivenedObject);
        });
      });
      this.canvas.renderAll();
    },
  },
};
</script>
