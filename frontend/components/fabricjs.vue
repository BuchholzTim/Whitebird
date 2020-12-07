<template>
  <div @mousemove="updateCoordinates">
    <canvas id="canvas" width="1200px" height="850px"> </canvas> <br />
    <button @click="rectangleTool">Rectangle</button>
    <button @click="drawingTool">Drawing</button>
    <button @click="clear">Clear</button>
    <button @click="stickyNoteTool">Sticky</button>
    <client-only>
      <StickyNote :canvas="canvas"></StickyNote>
      <Drawing :canvas="canvas"></Drawing
    ></client-only>
    <br />
    Coordinates: {{ x }} / {{ y }} <br />
  </div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';
import { log } from 'util';
import StickyNote from '~/components/canvasTools/stickyNote';
import Drawing from '~/components/canvasTools/drawing';

let width;
let height;

if (process.client) {
  width = window.innerWidth;
  height = window.innerHeight;
}
export default {
  components: {
    StickyNote,
    Drawing,
  },
  data: () => ({
    canvas: null,
    drawingMode: false,
    points: {
      from: null,
      to: null,
    },
    x: 0,
    y: 0,
  }),
  mounted() {
    console.log('Component created!');
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.on('mouse:dblclick', (options) => {
      console.log('Canvas mouse:dblclick');
    });
  },

  methods: {
    stickyNoteTool() {
      this.$nuxt.$emit('stickyNoteTool');
    },
    drawingTool() {
      this.$nuxt.$emit('drawingTool');
    },
    rectangleTool(event) {
      const rect = new fabric.Rect({
        left: width / 2,
        top: height / 2,
        width: 150,
        height: 120,
        fill: 'red',
      });
      rect.on('mousedown', (options) => {
        console.log('rect event');
      });
      this.canvas.add(rect).setActiveObject(rect);
      this.canvas.renderAll();
    },

    updateCoordinates(event) {
      // pass event object, bound to mouse move with updat
      this.x = event.clientX;
      this.y = event.clientY;
    },

    clear(event) {
      this.canvas.clear();
    },
  },
};
</script>

<style>
#canvas {
  border: 1px solid;
}
</style>
