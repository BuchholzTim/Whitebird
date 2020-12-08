<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric';
import { v4 } from 'uuid';

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    mouse_down: false,
    rubbermode: false,
  }),
  mounted() {
    this.$nuxt.$on('rubberTool', (payload) => {
      this.canvas.isDrawingMode = false;
      this.rubber();
      this.canvas.remove(this.canvas.getActiveObject());
    });

    this.canvas.on('mouse:down', (options) => {
      this.mouse_down = true;
    });
    this.canvas.on('mouse:up', (options) => {
      this.mouse_down = false;
    });
    this.canvas.on('mouse:move', (options) => {
      if (this.mouse_down === true) { console.log('hello'); }
    });
  },
  methods: {
    rubber() {
      this.rubbermode = !this.rubbermode;
    },
  },
};
</script>
