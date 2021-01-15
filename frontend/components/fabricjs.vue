<template>
  <div class="canvas-wrapper">
    <canvas id="canvas"> </canvas>
    <client-only>
      <RectangleTool :canvas="canvas"></RectangleTool>
      <TextboxTool :canvas="canvas"></TextboxTool>
      <CircleTool :canvas="canvas"></CircleTool>
      <StickyNoteTool :canvas="canvas"></StickyNoteTool>
      <DrawingTool :canvas="canvas"></DrawingTool>
      <ClearTool :canvas="canvas"></ClearTool>
      <DeleteTool :canvas="canvas"></DeleteTool>
      <EnlivenTool :canvas="canvas"></EnlivenTool>
    </client-only>
  </div>
</template>

<script>
import { fabric } from 'fabric';
import StickyNoteTool from '~/components/canvasTools/StickyNoteTool';
import DrawingTool from '~/components/canvasTools/DrawingTool';
import RectangleTool from '~/components/canvasTools/RectangleTool';
import TextboxTool from '~/components/canvasTools/TextboxTool';
import CircleTool from '~/components/canvasTools/CircleTool';
import ClearTool from '~/components/canvasTools/ClearTool';
import DeleteTool from '~/components/canvasTools/DeleteTool';
import EnlivenTool from '~/components/canvasTools/EnlivenTool';
import customEvents from '~/utils/customEvents';
import logger from '~/utils/logger';

export default {
  components: {
    StickyNoteTool,
    DrawingTool,
    RectangleTool,
    CircleTool,
    ClearTool,
    DeleteTool,
    EnlivenTool,
  },
  data: () => ({
    canvas: null,
  }),
  mounted() {
    this.canvas = new fabric.Canvas('canvas');

    // First render in Nuxt is Server-Side, so there is no reference to Window
    if (process.client) {
      this.canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    this.$nuxt.$emit(customEvents.canvasTools.setRemoveObjectEventListener, true);

    this.canvas.on('object:added', (options) => {
      if (options.target.whitebirdData !== undefined) {
        if (options.target.whitebirdData.persistedOnServer !== true) {
          if (options.target.whitebirdData.tempObject !== true) {
            options.target.whitebirdData.persistedOnServer = false;
            logger(this, 'object:added');
            logger(this, options.target);
            this.createCanvasObject(options.target);
          }
        }
      }
    });

    this.canvas.on('object:modified', (options) => {
      if (options.target.whitebirdData !== undefined) {
        if (options.target.whitebirdData.tempObject !== true) {
          logger(this, 'object:modified');
          logger(this, JSON.stringify(options.target.type));
        }
      }
    });

    this.$nuxt.$on(customEvents.canvasTools.sendCustomModified, (options) => {
      if (options.target.whitebirdData !== undefined) {
        logger(this, 'object:CustomModified');
        logger(this, JSON.stringify(options.type));
      }
    });

    this.canvas.on('object:removed', (options) => {
      if (options.target.whitebirdData !== undefined) {
        if (options.target.whitebirdData.tempObject !== true) {
          logger(this, 'object:removed');
          logger(this, JSON.stringify(options.target.type));
        }
      }
    });
  },

  methods: {
    createCanvasObject(canvasObject) {
      this.$store.dispatch('canvas/createCanvasObject', canvasObject);
    },
  },
};

</script>

<style scoped>
.canvas-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.canvas-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  height: 100% !important;
}

.canvas-warpper .canvas-container canvas {
  position: absolute;
  top: 0;
  left: 0;
}

canvas {
  display: inline-block;
}
</style>
