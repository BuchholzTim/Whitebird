<template>
  <div class="canvas-wrapper">
    <canvas id="canvas"> </canvas>
    <client-only>
      <RectangleTool :canvas="canvas"></RectangleTool>
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
import CircleTool from '~/components/canvasTools/CircleTool';
import ClearTool from '~/components/canvasTools/ClearTool';
import DeleteTool from '~/components/canvasTools/DeleteTool';
import EnlivenTool from '~/components/canvasTools/EnlivenTool';
import customEvents from '~/utils/customEvents';

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
  },
  methods: {},
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
