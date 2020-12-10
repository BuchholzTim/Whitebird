<template>
  <div @mousemove="updateCoordinates">
    <div>
      <canvas id="canvas" width="1200px" height="850px"> </canvas>
    </div>
    <br />
    <button :style="{ color: drawingColor }" @click="drawingTool">Drawing</button>
    <button @click="rectangleTool">Rectangle</button>
    <button @click="deleteAll">deleteAll</button>
    <button @click="stickyNoteTool">Sticky</button>
    <client-only>
      <StickyNote :canvas="canvas"></StickyNote>
      <Drawing :canvas="canvas"></Drawing>
    </client-only>
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
    points: {
      from: null,
      to: null,
    },
    x: 0,
    y: 0,
    drawingMode: false,
    drawingColor: '#ff0000',
  }),
  mounted() {
    console.log('Component created!');
    this.canvas = new fabric.Canvas('canvas');
    this.canvas.on('mouse:dblclick', (options) => {
      console.log('Canvas mouse:dblclick');
    });

    // Add Window.Event for deleting Object with ENFT KEY
    this.canvas.on('mouse:over', (event) => {
      if (event.target === null) {
        if (typeof window !== 'undefined') {
          this.$nuxt.$emit('keydown_Event_Stop', false);
        }
      }
    });
    this.canvas.on('mouse:out', (event) => {
      if (event.target === null) {
        if (typeof window !== 'undefined') {
          this.$nuxt.$emit('keydown_Event_Stop', true);
        }
      }
    });
    this.$nuxt.$on('keydown_Event_Stop', (payload) => {
      if (payload === true) {
        window.removeEventListener('keydown', this.deleteObject);
      } else {
        window.addEventListener('keydown', this.deleteObject);
      }
    });
  },

  methods: {
    deleteObject(event) {
      if (event.key === 'Delete') {
        this.canvas.getActiveObjects().forEach((obj) => {
          // eslint-disable-next-line prefer-template
          console.log('delete: ' + obj.type + 'Object');
          this.canvas.remove(obj);
        });

        this.canvas.discardActiveObject().renderAll();
      }
    },
    stickyNoteTool() {
      this.$nuxt.$emit('stickyNoteTool');
    },
    drawingTool() {
      this.drawingMode = !this.drawingMode;
      if (this.drawingMode === true) {
        this.drawingColor = '#2a8108';
      } else {
        this.drawingColor = '#ff0000';
      }
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
      console.log(rect);
      this.canvas.renderAll();
    },

    updateCoordinates(event) {
      // pass event object, bound to mouse move with updat
      this.x = event.clientX;
      this.y = event.clientY;
    },

    deleteAll(event) {
      this.canvas.clear();
    },
  },
};
</script>

<style>
#canvas {
  border: 1px solid;
}
#Test {
  color: #2a8108;
}
</style>
