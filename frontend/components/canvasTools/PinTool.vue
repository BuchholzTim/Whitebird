<template>
  <div></div>
</template>

<script>
import { fabric } from 'fabric'
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
    this.$nuxt.$on(customEvents.canvasTools.pinObject, (payload) => {
      this.canvas.isDrawingMode = false
      this.pinObject(payload)
    })

    this.$nuxt.$on(customEvents.canvasTools.unPinObject, (payload) => {
      this.canvas.isDrawingMode = false
      this.unPinObject(payload)
    })
  },
  methods: {
    pinObject() {
      this.canvas.getActiveObjects().forEach((obj) => {
        // If object are not selectable -> not being pinned
        if (obj.selectable) {
          obj.lockMovementX = true
          obj.lockMovementY = true
          obj.lockRotation = true
          obj.lockScalingX = true
          obj.lockScalingY = true

          obj._controlsVisibility.bringToFront = false
          obj._controlsVisibility.bringForward = false
          obj._controlsVisibility.sendToBack = false
          obj._controlsVisibility.sendBackwards = false

          obj._controlsVisibility.pin = false
          obj._controlsVisibility.unPin = true
          console.log(obj)
          
          obj.editable = false
          // For object group such as StickyNoteTool
          var objGroup = obj._objects
          if (objGroup) {
            var i
            for (i = 0; i < objGroup.length; i++) {
              objGroup[i].editable = false
            }
          }
          
          this.$emit('pin-status')
        }
      })
      this.canvas.discardActiveObject().renderAll()
    },
    unPinObject() {
      this.canvas.getActiveObjects().forEach((obj) => {
        // If object are not selectable -> not being unpinned
        if (obj.selectable) {
          obj.lockMovementX = false
          obj.lockMovementY = false
          obj.lockRotation = false
          obj.lockScalingX = false
          obj.lockScalingY = false
          
          obj._controlsVisibility.bringToFront = true
          obj._controlsVisibility.bringForward = true
          obj._controlsVisibility.sendToBack = true
          obj._controlsVisibility.sendBackwards = true
          
          obj._controlsVisibility.pin = true
          obj._controlsVisibility.unPin = false
          
          obj.editable = true
          // For object group such as StickyNoteTool
          var objGroup = obj._objects
          if (objGroup) {
            var i
            for (i = 0; i < objGroup.length; i++) {
              objGroup[i].editable = true
            }
          }

          this.$emit('pin-status')
        }
      })
      this.canvas.discardActiveObject().renderAll()
    },
  },
}
</script>
