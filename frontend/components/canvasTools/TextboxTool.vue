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
    this.$nuxt.$on(customEvents.canvasTools.textbox, (payload) => {
      this.canvas.isDrawingMode = false;
      this.createTextBox(payload);
    });
  },
  methods: {
    createTextBox() {
      const tbox = new fabric.Textbox('hello world', {
        left: 100,
        top: 100,
        fill: 'rgb(0,0,0)',
        fontFamily: 'Arial',
        whitebirdData: { id: v4() },
      });
      const invisibleControls = ['mt', 'mr', 'ml', 'mb'];
      invisibleControls.forEach((side) => {
        tbox.setControlVisible(side, false);
      });

      this.canvas.add(tbox).setActiveObject(tbox);
      this.canvas.renderAll();
    },
  },
};
</script>
