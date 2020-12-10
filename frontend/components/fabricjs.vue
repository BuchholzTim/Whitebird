<template>
  <div>
    <canvas id="canvas" width="1200px" height="850px"> </canvas>
    <client-only>
      <Rectangle :canvas="canvas"></Rectangle>
      <StickyNote :canvas="canvas"></StickyNote>
      <Drawing :canvas="canvas"></Drawing>
    </client-only>
  </div>
</template>

<script>
import { fabric } from 'fabric';
import StickyNote from '~/components/canvasTools/StickyNote';
import Drawing from '~/components/canvasTools/Drawing';
import Rectangle from '~/components/canvasTools/Rectangle';
import customEvents from '~/utils/customEvents';

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
    Rectangle,
  },
  data: () => ({
    canvas: null,
  }),
  mounted() {
    console.log('Component created!');
    this.canvas = new fabric.Canvas('canvas');

    // Activate Event-Listener for 'Delete-Key', when Mouse is over canvas
    this.canvas.on('mouse:over', (event) => {
      if (event.target === null) {
        this.activateRemoveObjectEventListener();
      }
    });
    // Remove Event-Listener for 'Delete-Key', when Mouse is outside Canvas
    this.canvas.on('mouse:out', (event) => {
      if (event.target === null) {
        this.deactivateRemoveObjectEventListener();
      }
    });

    this.$nuxt.$on(
      customEvents.canvasTools.setRemoveObjectEventListener,
      (payload) => {
        if (payload) {
          this.activateRemoveObjectEventListener();
        } else {
          this.deactivateRemoveObjectEventListener();
        }
      },
    );
  },
  methods: {
    // Removes all Selected Objects on the Canvas on 'Delete'-Key
    deleteObject(event) {
      if (event.key === 'Delete') {
        this.canvas.getActiveObjects().forEach((obj) => {
          console.log(`delete: ${obj.type}Object`);
          this.canvas.remove(obj);
        });
        this.canvas.discardActiveObject().renderAll();
      }
    },
    activateRemoveObjectEventListener() {
      if (typeof window !== 'undefined') {
        window.addEventListener('keydown', this.deleteObject);
      }
    },
    deactivateRemoveObjectEventListener() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', this.deleteObject);
      }
    },
  },
};
</script>
