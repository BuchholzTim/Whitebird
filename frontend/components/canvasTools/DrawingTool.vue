<template>
  <div></div>
</template>

<script>
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
    this.$nuxt.$on(customEvents.canvasTools.drawing, (payload) => {
      this.canvas.isDrawingMode = payload.drawingMode;
    });

    /* Drawings also need to have unique IDs:
     * Since we do not explicitly create a new Drawing (Path) with new Object,
     * but create new Paths by setting draingMode=true and clicking with the mouse,
     * we have to catch the mouse:up-Event, check if the last Object is a Path and inject the ID.
     */
    this.canvas.on('mouse:up', () => {
      if (this.canvas.isDrawingMode) {
        const canvasObjectCount = this.canvas.getObjects().length;
        if (this.canvas.getObjects()[canvasObjectCount - 1].type === 'path') {
          const PathObject = this.canvas.getObjects()[canvasObjectCount - 1];
          this.canvas.remove(this.canvas.getObjects()[canvasObjectCount - 1]);
          PathObject.whitebirdData = { id: v4() };
          this.canvas.add(PathObject);
        }
      }
    });

    this.$nuxt.$on(customEvents.canvasTools.drawingChangeWidth, (payload) => {
      this.canvas.freeDrawingBrush.width = parseInt(payload.width, 10);
    });
    this.$nuxt.$on(customEvents.canvasTools.drawingChangeColor, (payload) => {
      this.canvas.freeDrawingBrush.color = payload.color;
    });
  },
};
</script>
