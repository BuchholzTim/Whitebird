<template>
  <div class="canvas-wrapper">
    <canvas id="canvas"> </canvas>
    <client-only>
      <RectangleTool :canvas="canvas"></RectangleTool>
      <TextboxTool :canvas="canvas"></TextboxTool>
      <CircleTool :canvas="canvas"></CircleTool>
      <StickyNoteTool :canvas="canvas"></StickyNoteTool>
      <DrawingTool :canvas="canvas"></DrawingTool>
      <DeleteTool :canvas="canvas"></DeleteTool>
    </client-only>
  </div>
</template>

<script>
import { fabric } from 'fabric';
import { mapState } from 'vuex';
import { jsPDF } from 'jspdf';
import StickyNoteTool from '~/components/canvasTools/StickyNoteTool';
import DrawingTool from '~/components/canvasTools/DrawingTool';
import RectangleTool from '~/components/canvasTools/RectangleTool';
import TextboxTool from '~/components/canvasTools/TextboxTool';
import CircleTool from '~/components/canvasTools/CircleTool';
import DeleteTool from '~/components/canvasTools/DeleteTool';
import customEvents from '~/utils/customEvents';
import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('FabricJS.vue');

export default {
  components: {
    StickyNoteTool,
    DrawingTool,
    RectangleTool,
    TextboxTool,
    CircleTool,
    DeleteTool,
  },
  data() {
    return {
      canvas: null,
      joined: false,
    };
  },
  computed: {
    ...mapState({
      canvasId: (state) => state.canvas.id,
    }),
  },
  mounted() {
    this.reloadCanvas();

    if (process.client) {
      window.addEventListener('resize', this.onResize);
    }

    // Socket Reference
    this.socket = this.$nuxtSocket({
      persist: 'whitebirdSocket',
    });

    // Join WhiteBoard - Is this necessary?
    this.socket.emit('joinWhiteboard', {
      sender: this.name,
      room: this.canvasId,
      message: 'Joining Whiteboard',
    });

    this.$nuxt.$on(customEvents.canvasTools.exportImage, () => {
      // This returns the current content as base64-Encoded PNG
      const canvasAsImageB64 = this.canvas.toDataURL();

      // Downloading BLOBS is easy. So we have to decode the base64 to a BLOB
      // The Fetch-API is the most simple way to do this
      fetch(canvasAsImageB64)
        .then((res) => res.blob()).then((blob) => {
          const downloadLink = document.createElement('a');
          downloadLink.href = URL.createObjectURL(blob);
          downloadLink.setAttribute('download', `canvas_${this.canvasId}.png`);
          downloadLink.click();
          URL.revokeObjectURL(downloadLink.href);
        });
    });

    this.$nuxt.$on(customEvents.canvasTools.exportPDF, () => {
      // This returns the current content as base64-Encoded PNG
      const canvasAsImageB64 = this.canvas.toDataURL();

      logger.log(canvasAsImageB64);

      // A4 is 210mm x 297mm
      const pdfDoc = jsPDF({
        orientation: 'l', // p == portrait, l == landscape
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16, // or "smart", default is 16
      });
      // text(text, x, y, optionsopt, transform)
      pdfDoc.text(130, 10, `Canvas: ${this.canvasId}`);

      const widthToHeightRatio = this.canvas.getHeight() / this.canvas.getWidth();

      // addImage(imageData, format, x, y, width, height, alias, compression, rotation)
      const xOffset = 20;
      const yOffset = 25;
      const width = 297 - (2 * xOffset);
      const height = width * widthToHeightRatio;
      pdfDoc.addImage(canvasAsImageB64, 'PNG', xOffset, yOffset, width, height);
      pdfDoc.save(`${this.canvasId}-canvas.pdf`);
    });

    this.canvas = new fabric.Canvas('canvas');

    // First render in Nuxt is Server-Side, so there is no reference to Window
    if (process.client) {
      this.canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    this.$nuxt.$emit(customEvents.canvasTools.setRemoveObjectEventListener, true);

    this.canvas.on('mouse:down', (options) => {
      this.$nuxt.$emit(customEvents.canvasTools.CloseAllWhiteBoardControls, options);
    });

    this.canvas.on('object:added', (options) => {
      const canvasObject = options.target;
      if (canvasObject.whitebirdData !== undefined &&
      canvasObject.whitebirdData.persistedOnServer !== true) {
        if (canvasObject.whitebirdData.tempObject !== true) {
          canvasObject.whitebirdData.persistedOnServer = false;
          logger.log('object:added');
          this.createCanvasObject(canvasObject);
        }
      }
    });

    this.canvas.on('object:modified', (options) => {
      const canvasObject = options.target;
      if (canvasObject.type === 'activeSelection') {
        this.canvas.getActiveObjects().forEach((obj) => {
          const tempLeft = obj.left;
          const tempTop = obj.top;
          obj.left = canvasObject.left + (canvasObject.width / 2) + obj.left;
          obj.top = canvasObject.top + (canvasObject.height / 2) + obj.top;
          this.ObjectModified(obj);
          obj.left = tempLeft;
          obj.top = tempTop;
        });
      } else {
        this.ObjectModified(canvasObject);
      }
    });

    this.$nuxt.$on(customEvents.canvasTools.sendCustomModified, (options) => {
      const canvasObject = options;
      if (canvasObject.whitebirdData !== undefined &&
      canvasObject.whitebirdData.persistedOnServer !== true) {
        if (canvasObject.whitebirdData.tempObject !== true) {
          canvasObject.whitebirdData.persistedOnServer = false;
          logger.log('object:CustomModified');
          this.updateObject(canvasObject);
        }
      }
    });

    this.canvas.on('object:removed', (options) => {
      const canvasObject = options.target;
      if (canvasObject.whitebirdData !== undefined &&
      canvasObject.whitebirdData.persistedOnServer !== true) {
        if (canvasObject.whitebirdData.tempObject !== true) {
          canvasObject.whitebirdData.persistedOnServer = false;
          logger.log('object:removed');
          this.removeObject(canvasObject);
        }
      }
    });

    this.$nuxt.$on(customEvents.canvasTools.enliven, (payload) => {
      this.createObjectsFromJSON(payload);
    });
    this.$nuxt.$on(customEvents.canvasTools.deletedObejctFromServer, (payload) => {
      this.deletedObejctFromServer(payload);
    });
    this.$nuxt.$on(customEvents.canvasTools.updateObjectFromServer, (payload) => {
      this.updateObjectFromServer(payload);
    });
  },

  methods: {
    reloadCanvas() {
      this.$axios.get(`whiteboard/${this.canvasId}`).then((res) => {
        if (res.status === 200) {
          if (res.data.canvasObjects.length > 0) {
            res.data.canvasObjects.forEach((object) => this.createObjectsFromJSON(object));
          }
        }
        return undefined;
      });
    },
    onResize(event) {
      this.canvas.setDimensions({
        width: event.target.innerWidth,
        height: event.target.innerHeight,
      });
    },

    ObjectModified(canvasObject) {
      canvasObject.whitebirdData.persistedOnServer = false;
      if (canvasObject.whitebirdData !== undefined &&
      canvasObject.whitebirdData.persistedOnServer !== true) {
        if (canvasObject.whitebirdData.tempObject !== true) {
          logger.log('object:modified');
          this.updateObject(canvasObject);
        }
      }
    },

    createCanvasObject(canvasObject) {
      const objectAsJson = this.customToJSON(canvasObject);
      const message = {
        sender: '',
        message: objectAsJson,
        room: this.canvasId,
      };
      this.socket.emit('createCanvasObjectClient', message);
    },
    updateObject(canvasObject) {
      const objectAsJson = this.customToJSON(canvasObject);
      const message = {
        sender: '',
        message: objectAsJson,
        room: this.canvasId,
      };
      this.socket.emit('updateCanvasObjectClient', message);
    },
    removeObject(canvasObject) {
      const objectAsJson = this.customToJSON(canvasObject);
      const message = {
        sender: '',
        message: objectAsJson,
        room: this.canvasId,
      };
      this.socket.emit('deleteCanvasObjectClient', message);
    },
    customToJSON(canvasObject) {
      // Axios will call 'toJSON' before sending, as we cannot actually send an Object
      // toJson(), will remove our custom id, so we have to Re-Add it afterwards.
      const customPropertiesToKeep = ['whitebirdData'];
      const asJSON = canvasObject.toJSON(customPropertiesToKeep);
      return asJSON;
    },

    // _______________Server Events_____________
    createObjectsFromJSON(canvasObjectAsJSON) {
      fabric.util.enlivenObjects([canvasObjectAsJSON], (enlivenedObjects) => {
        enlivenedObjects.forEach((enlivenedObject) => {
          if (enlivenedObject.whitebirdData.type === 'StickyNote') {
            this.$nuxt.$emit(customEvents.canvasTools.stickyNoteEnliven, enlivenedObject);
          }
          this.canvas.add(enlivenedObject);
        });
      });
      this.canvas.renderAll();
    },

    deletedObejctFromServer(canvasObject) {
      logger.log('Canvas delete!');
      this.canvas.getObjects().forEach((obj) => {
        if (obj.whitebirdData.id === canvasObject.whitebirdData.id) { this.canvas.remove(obj); }
      });
      this.canvas.renderAll();
    },
    updateObjectFromServer(canvasObject) {
      logger.log('Canvas update!');
      this.canvas.getObjects().forEach((obj) => {
        if (obj.whitebirdData.id === canvasObject.whitebirdData.id) {
          obj.set(canvasObject);
          if (canvasObject.type === 'group') {
            let itemNumber = 0;
            canvasObject.objects.forEach(() => {
              obj.item(itemNumber).set(canvasObject.objects[itemNumber]);
              itemNumber += 1;
            });
          }
          obj.setCoords();
          obj.dirty = true;
        }
      });
      this.canvas.renderAll();
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
