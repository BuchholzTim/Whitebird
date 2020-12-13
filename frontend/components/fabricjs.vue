<template>
  <div>
    <canvas id="canvas" width="1200px" height="850px"> </canvas>
    <client-only>
      <RectangleTool :canvas="canvas"></RectangleTool>
      <CircleTool :canvas="canvas"></CircleTool>
      <StickyNoteTool :canvas="canvas"></StickyNoteTool>
      <DrawingTool :canvas="canvas"></DrawingTool>
      <ClearTool :canvas="canvas"></ClearTool>
      <DeleteTool :canvas="canvas"></DeleteTool>
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
import customEvents from '~/utils/customEvents';

let width;
let height;

if (process.client) {
  width = window.innerWidth;
  height = window.innerHeight;
}
export default {
  components: {
    StickyNoteTool,
    DrawingTool,
    RectangleTool,
    CircleTool,
    ClearTool,
    DeleteTool,
  },
  data: () => ({
    canvas: null,
  }),
  mounted() {
    console.log('Component created!');
    this.canvas = new fabric.Canvas('canvas');
  },
  methods: {},
};
</script>
