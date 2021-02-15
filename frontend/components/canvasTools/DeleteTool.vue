<template>
  <div></div>
</template>

<script>
import customEvents from '~/utils/customEvents';

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  mounted() {
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
          // If object are not selectable -> not deleteable
          if (obj.selectable) {
            this.canvas.remove(obj);
          }
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
