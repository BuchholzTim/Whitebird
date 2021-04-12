<template>
  <div></div>
</template>

<script>
import { v4 } from 'uuid'
import customEvents from '~/utils/customEvents'

export default {
  props: {
    canvas: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.$nuxt.$on(customEvents.canvasTools.bringObjectToFront, (payload) => {
      this.canvas.isDrawingMode = false
      this.bringObjectToFront(payload)
    })

    this.$nuxt.$on(customEvents.canvasTools.bringObjectForward, (payload) => {
      this.canvas.isDrawingMode = false
      this.bringObjectForward(payload)
    })

    this.$nuxt.$on(customEvents.canvasTools.sendObjectToBack, (payload) => {
      this.canvas.isDrawingMode = false
      this.sendObjectToBack(payload)
    })

    this.$nuxt.$on(customEvents.canvasTools.sendObjectBackwards, (payload) => {
      this.canvas.isDrawingMode = false
      this.sendObjectBackwards(payload)
    })
  },
  methods: {
    bringObjectToFront() {
      this.canvas.getActiveObjects().forEach((obj) => {
        // If object are not selectable -> not movable
        if (obj.selectable) {
          this.canvas.bringToFront(obj)
        }
      })
      this.canvas.discardActiveObject().renderAll()
    },
    bringObjectForward() {
      this.canvas.getActiveObjects().reverse().forEach((obj) => {
        // If object are not selectable -> not movable
        if (obj.selectable) {
          this.canvas.bringForward(obj)
        }
      })
      this.canvas.discardActiveObject().renderAll()
    },
    sendObjectToBack() {
      this.canvas.getActiveObjects().reverse().forEach((obj) => {
        // If object are not selectable -> not movable
        if (obj.selectable) {
          this.canvas.sendToBack(obj)
        }
      })
      this.canvas.discardActiveObject().renderAll()
    },
    sendObjectBackwards() {
      this.canvas.getActiveObjects().forEach((obj) => {
        // If object are not selectable -> not movable
        if (obj.selectable) {
          this.canvas.sendBackwards(obj)
        }
      });
      this.canvas.discardActiveObject().renderAll()
    },
  },
}
</script>
