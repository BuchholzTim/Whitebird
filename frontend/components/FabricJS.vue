<template>
  <div id="canvas-wrapper"
    class="canvas-wrapper"
    :class="backgroundImage">
    <canvas id="canvas"> </canvas>
    <client-only>
      <RectangleTool :canvas="canvas"></RectangleTool>
      <TextboxTool :canvas="canvas"></TextboxTool>
      <CircleTool :canvas="canvas"></CircleTool>
      <StickyNoteTool :canvas="canvas"></StickyNoteTool>
      <DrawingTool :canvas="canvas"></DrawingTool>
      <DeleteTool :canvas="canvas"></DeleteTool>
      <PinTool :canvas="canvas"
        v-on:pin-status="pinStatus = !pinStatus"></PinTool>
      <LayerTool :canvas="canvas"></LayerTool>
      <UndoRedoTool :canvas="canvas"></UndoRedoTool>
    </client-only>
    <ChangeFontFam v-if="editingText"
      v-for="(container, index) in containers"
      :key="index"
      :options="container.options"
      :top-offset="container.topOffset"
      :left-offset="container.leftOffset"
      :fontstyles="container.fontstyles"
      :object-font="container.objectFont"
      :object-font-style="container.objectFontStyle"
      :canvas="canvas"
    />
    <ControlIcon v-on:delete-img="deleteImg = $event"
      v-on:bringToFront-img="bringToFrontImg = $event"
      v-on:bringForward-img="bringForwardImg = $event"
      v-on:sendToBack-img="sendToBackImg = $event"
      v-on:sendBackwards-img="sendBackwardsImg = $event"
      v-on:pin-img="pinImg = $event"
      v-on:unPin-img="unPinImg = $event"
      v-on:clone-img="cloneImg = $event"></ControlIcon>
  </div>
</template>

<script>
import { fabric } from 'fabric'
import { mapState } from 'vuex'
import { jsPDF } from 'jspdf'
import { v4 } from 'uuid'
import FontFaceObserver from 'fontfaceobserver'
import StickyNoteTool from '~/components/canvasTools/StickyNoteTool'
import DrawingTool from '~/components/canvasTools/DrawingTool'
import RectangleTool from '~/components/canvasTools/RectangleTool'
import TextboxTool from '~/components/canvasTools/TextboxTool'
import CircleTool from '~/components/canvasTools/CircleTool'
import DeleteTool from '~/components/canvasTools/DeleteTool'
import PinTool from '~/components/canvasTools/PinTool'
import LayerTool from '~/components/canvasTools/LayerTool'
import UndoRedoTool from '~/components/canvasTools/UndoRedoTool'
import customEvents from '~/utils/customEvents'
import WhitebirdLogger from '~/utils/WhitebirdLogger'
import ChangeFontFam from '~/components/canvasTools/ChangeFontFam'
import ControlIcon from '~/components/canvasTools/ControlIcon'

const logger = new WhitebirdLogger('FabricJS.vue')

export default {
  components: {
    StickyNoteTool,
    DrawingTool,
    RectangleTool,
    TextboxTool,
    CircleTool,
    DeleteTool,
    PinTool,
    LayerTool,
    UndoRedoTool,
    ChangeFontFam,
    ControlIcon,
  },
  data() {
    return {
      canvas: null,
      joined: false,
      backgroundImage: 'dots', /* defaults to dots */
      containers: [],
      pinStatus: false,
      editingText: false,
      deleteImg: null,
      bringToFrontImg: null,
      bringForwardImg: null,
      sendToBackImg: null,
      sendBackwardsImg: null,
      pinImg: null,
      unPinImg: null,
      cloneImg: null,
      cornerSize: 24,
      pausePanning: null,
      pan: true,
    }
  },
  computed: {
    ...mapState({
      canvasId: (state) => state.canvas.id,
    }),
  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas')
    fabric.disableStyleCopyPaste = true

    // Setting object control handle
    fabric.Object.prototype.transparentCorners = false
    fabric.Object.prototype.cornerColor = 'blue'
    fabric.Object.prototype.cornerStyle = 'circle'

    // Drawing delete icon
    fabric.Object.prototype.controls.delete = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: 16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.deleteObject,
      render: this.renderIcon(this.deleteImg),
      cornerSize: this.cornerSize,
    })

    // Drawing bringToFront icon
    fabric.Object.prototype.controls.bringToFront = new fabric.Control({
      x: 0.1,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.bringObjectToFront,
      render: this.renderIcon(this.bringToFrontImg),
      cornerSize: this.cornerSize,
    })

    // Drawing bringFroward icon
    fabric.Object.prototype.controls.bringForward = new fabric.Control({
      x: -0.1,
      y: -0.5,
      offsetX: -16,
      offsetY: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.bringObjectForward,
      render: this.renderIcon(this.bringForwardImg),
      cornerSize: this.cornerSize,
    })

    // Drawing sendToBack icon
    fabric.Object.prototype.controls.sendToBack = new fabric.Control({
      x: -0.5,
      y: -0.5,
      offsetY: -16,
      offsetX: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.sendObjectToBack,
      render: this.renderIcon(this.sendToBackImg),
      cornerSize: this.cornerSize,
    })

    // Drawing sendBackwards icon
    fabric.Object.prototype.controls.sendBackwards = new fabric.Control({
      x: -0.3,
      y: -0.5,
      offsetX: -16,
      offsetY: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.sendObjectBackwards,
      render: this.renderIcon(this.sendBackwardsImg),
      cornerSize: this.cornerSize,
    })
    
    // Drawing pin icon
    fabric.Object.prototype.controls.pin = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetX: -16,
      offsetY: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.pinObject,
      render: this.renderIcon(this.pinImg),
      cornerSize: this.cornerSize,
    })

    // Drawing unPin icon
    fabric.Object.prototype.controls.unPin = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetX: -16,
      offsetY: -16,
      cursorStyle: 'pointer',
      mouseUpHandler: this.unPinObject,
      render: this.renderIcon(this.unPinImg),
      cornerSize: this.cornerSize,
      visible: false,
    })

    // Drawing clone icon
    // fabric.Object.prototype.controls.clone = new fabric.Control({
    //   x: -0.5,
    //   y: -0.5,
    //   offsetY: -16,
    //   offsetX: -16,
    //   cursorStyle: 'pointer',
    //   mouseUpHandler: this.cloneObject,
    //   render: this.renderIcon(this.cloneImg),
    //   cornerSize: this.cornerSize,
    // })

    this.reloadCanvas()

    if (process.client) {
      window.addEventListener('resize', this.onResize)
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

    // First render in Nuxt is Server-Side, so there is no reference to Window
    if (process.client) {
      this.canvas.setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    this.$nuxt.$emit(customEvents.canvasTools.setRemoveObjectEventListener, true);

    this.canvas.on('selection:created', (options) => {
      var selectedGroup = options.target

      if (selectedGroup.type && selectedGroup.type === 'activeSelection') {
        const invisibleControls = ['mt', 'mr', 'ml', 'mb', 'tr', 'tl', 'bl', 'br', 'mtr']
        invisibleControls.forEach((side) => {
          selectedGroup.setControlVisible(side, false)
        })

        // Only the unlocked objects can be moved in the selected group.
        var selectedObjs = selectedGroup._objects
        var i
        for (i = 0; i < selectedObjs.length; i++) {
          if (selectedObjs[i].lockRotation) {
            selectedGroup.removeWithUpdate(selectedObjs[i])
          }
        }

        // Deselect all objects if only the locked objects are selected.
        if (selectedObjs.length == 1 && selectedObjs[0].lockRotation) {
          this.canvas.discardActiveObject()
        }
      }
    })

    // Disabled the object group selection by shift key. 
    this.canvas.selectionKey = null

    this.canvas.on('mouse:down', (options) => {
      this.$nuxt.$emit(customEvents.canvasTools.CloseAllWhiteBoardControls, options)
      const canvasObject = options.target
      if (canvasObject !== null) {
        if (canvasObject.whitebirdData !== undefined) {
          if (canvasObject.whitebirdData.type === 'StickyNote' ||
            canvasObject.whitebirdData.type === 'textboxGroup' ||
            (canvasObject.type === 'textbox' &&
            canvasObject.whitebirdData.type !== 'StickyNoteTextBox')
          ) {
            this.containers.pop()
            this.createStickyToolBox(canvasObject)
          }
        }
      } else {
        this.containers.pop()
      }

      // Press alt key to trigger the pan.
      var e = options.e
      if (e.altKey === true || this.pan) {
        this.canvas.isDragging = true
        this.canvas.selection = false

        console.log()
        if (e.touches && e.targetTouches.length >= 2) {
          this.canvas.lastPosX = e.targetTouches.item(0).clientX
          this.canvas.lastPosY = e.targetTouches.item(0).clientY
        } else if (e.clientX) {
          this.canvas.lastPosX = e.clientX
          this.canvas.lastPosY = e.clientY
        }
      }
    })

    this.canvas.on('mouse:move', (options) => {
      // Pan around the canvas on mouse move.
      if (this.canvas.isDragging) {
        var e = options.e
        var vpt = this.canvas.viewportTransform

        if (e.touches && e.targetTouches.length >= 2) {
          vpt[4] += e.targetTouches.item(0).clientX - this.canvas.lastPosX
          vpt[5] += e.targetTouches.item(0).clientY - this.canvas.lastPosY
          this.canvas.lastPosX = e.targetTouches.item(0).clientX
          this.canvas.lastPosY = e.targetTouches.item(0).clientY
        } else if (e.clientX) {
          vpt[4] += e.clientX - this.canvas.lastPosX
          vpt[5] += e.clientY - this.canvas.lastPosY
          this.canvas.lastPosX = e.clientX
          this.canvas.lastPosY = e.clientY
        }
        // console.log(e.touches[0].clientX + ' ' + e.touches[0].clientY)

        this.canvas.requestRenderAll()
      }
    })

    this.canvas.on('mouse:up', (options) => {
      // On mouse up we want to recalculate new interaction.
      // For all objects, so we call setViewportTransform.
      this.canvas.setViewportTransform(this.canvas.viewportTransform)
      this.canvas.isDragging = false
      this.canvas.selection = true
    })

    /*
    this.canvas.on({
        'touch:gesture': (e) => {
            if (e.e.touches && e.e.touches.length == 2) {
                this.pausePanning = true;
                var point = new fabric.Point(e.self.x, e.self.y);
                if (e.self.state == "start") {
                    this.canvas.zoomStartScale = self.canvas.getZoom();
                }
                var delta = this.canvs.zoomStartScale * e.self.scale;
                self.canvas.zoomToPoint(point, delta);
                this.pausePanning = false;
            }
        },
        'object:selected': () => {
            this.pausePanning = true;
        },
        'selection:cleared': () => {
            this.pausePanning = false;
        },
        'touch:drag': (e) => {
            if (this.pausePanning == false && undefined != e.e.layerX && undefined != e.e.layerY) {
                this.canvas.currentX = e.e.layerX;
                this.canvas.currentY = e.e.layerY;
                this.canvas.xChange = this.canvas.currentX - this.canvas.lastX;
                this.canvas.yChange = this.canvas.currentY - this.canvas.lastY;

                if( (Math.abs(this.canvas.currentX - this.canvas.lastX) <= 50) && (Math.abs(this.canvas.currentY - this.canvas.lastY) <= 50)) {
                    var delta = new fabric.Point(this.canvas.xChange, this.canvas.yChange);
                    this.canvas.relativePan(delta);
                }

                this.canvas.lastX = e.e.layerX;
                this.canvas.lastY = e.e.layerY;
            }
        }
    });
    */

    /** callback for sticky notes and textbox */
    const canvasModifiedCallback = (options) => {
      const canvasObject = options.target
      this.containers.pop()
      if (canvasObject.whitebirdData !== undefined) {
        if (canvasObject.whitebirdData.type === 'StickyNote' ||
          canvasObject.whitebirdData.type === 'textboxGroup' ||
          canvasObject.type === 'textbox') 
        {
          this.createStickyToolBox(canvasObject)
        }
      }
    }

    const canvasModifyingCallback = (options) => {
      const canvasObject = options.target
      if (canvasObject.whitebirdData !== undefined) {
        if (canvasObject.whitebirdData.type === 'StickyNote' ||
          canvasObject.whitebirdData.type === 'textboxGroup' ||
          canvasObject.type === 'textbox')
        {
          this.containers.pop()
        }
      }
    }

    /** Object FINISHED changing */
    this.canvas.on('object:moved', canvasModifiedCallback);
    this.canvas.on('object:scaled', canvasModifiedCallback);
    this.canvas.on('object:rotated', canvasModifiedCallback);

    /** Object IS changing  */
    this.canvas.on('object:moving', canvasModifyingCallback);
    this.canvas.on('object:scaling', canvasModifyingCallback);
    this.canvas.on('object:rotating', canvasModifyingCallback);

    this.canvas.on('object:added', (options) => {
      const canvasObject = options.target;
      if (canvasObject.whitebirdData !== undefined &&
      canvasObject.whitebirdData.persistedOnServer !== true) {
        if (canvasObject.whitebirdData.tempObject !== true) {
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
      const canvasObject = options
      if (canvasObject.whitebirdData !== undefined) {
        if (canvasObject.whitebirdData.tempObject !== true) {
          canvasObject.whitebirdData.persistedOnServer = false
          logger.log('object:CustomModified')
          this.updateObject(canvasObject)

          // Only display the font setting widget if the object is being edited.
          this.editingText = !this.editingText
        }
      }
    })

    this.canvas.on('object:removed', (options) => {
      const canvasObject = options.target;
      if (canvasObject.whitebirdData !== undefined) {
        if (canvasObject.whitebirdData.tempObject !== true) {
          canvasObject.whitebirdData.persistedOnServer = false;
          logger.log('object:removed');
          this.removeObject(canvasObject);
        }
        if (canvasObject.whitebirdData.type === 'StickyNote' ||
          canvasObject.whitebirdData.type === 'textboxGroup' ||
          canvasObject.type === 'textbox') {
          this.containers.pop()
        }
      }
    });

    this.$nuxt.$on(customEvents.canvasTools.enliven, (payload) => {
      this.createObjectsFromJSON(payload);
    });
    this.$nuxt.$on(customEvents.canvasTools.deletedObjectFromServer, (payload) => {
      this.deletedObjectFromServer(payload);
    });
    this.$nuxt.$on(customEvents.canvasTools.updateObjectFromServer, (payload) => {
      this.updateObjectFromServer(payload);
    });

    this.$nuxt.$on('imageBackgroundChanged', (payload) => {
      this.backgroundImage = payload;
    });

    this.addDragAndDrop();
  },

  methods: {
    reloadCanvas() {
      this.$nuxt.$emit(customEvents.canvasTools.updatingDataState, true);
      this.loadFonts().then(() => {
        this.$axios.get(`whiteboard/${this.canvasId}`).then((res) => {
          if (res.status === 200) {
            if (res.data.canvasObjects.length > 0) {
              res.data.canvasObjects.forEach((object) => this.createObjectsFromJSON(object));
            }
          }
          this.$nuxt.$emit(customEvents.canvasTools.updatingDataState, false);
          return undefined;
        });
      });
    },
    async loadFonts() {
      const fonts = ['Pacifico', 'VT323', 'Quicksand', 'Inconsolata', 'Roboto'];
      fonts.forEach((font) => {
        const myfont = new FontFaceObserver(font);
        const errorText = this.$t('whiteboard.fontLoadError', font);
        myfont.load().catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorText,
          });
        });
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
      if (canvasObject.whitebirdData !== undefined) {
        if (canvasObject.whitebirdData.tempObject !== true) {
          canvasObject.whitebirdData.persistedOnServer = false;
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
      const customPropertiesToKeep = ['whitebirdData', 'selectable', 'evented'];
      const asJSON = canvasObject.toJSON(customPropertiesToKeep);
      return asJSON;
    },

    // _______________Server Events_____________
    createObjectsFromJSON(canvasObjectAsJSON) {
      fabric.util.enlivenObjects([canvasObjectAsJSON], (enlivenedObjects) => {
        enlivenedObjects.forEach((enlivenedObject) => {
          if (enlivenedObject.whitebirdData.type === 'StickyNote') {
            this.$nuxt.$emit(customEvents.canvasTools.stickyNoteEnliven, enlivenedObject);
          } else if (enlivenedObject.type === 'textbox') {
            const invisibleControls = ['mt', 'mr', 'ml', 'mb'];
            invisibleControls.forEach((side) => {
              enlivenedObject.setControlVisible(side, false);
            });
          }
          this.canvas.add(enlivenedObject);
        });
      });
      this.canvas.renderAll();
    },

    deletedObjectFromServer(canvasObject) {
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
    createStickyToolBox(obj) {
      let ObjectFont = 'Arial';
      let ObjectFontStyle = 'normal';
      if (obj.whitebirdData.type === 'StickyNote' ||
        obj.whitebirdData.type === 'textboxGroup') {
        if (obj.item(1) === undefined) {
          // console.log('obj.item(1) undefinde')
        } else {
          ObjectFont = obj.item(1).get('fontFamily');
          ObjectFontStyle = obj.item(1).get('fontStyle');
        }
      } else {
        ObjectFont = obj.get('fontFamily');
        ObjectFontStyle = obj.get('fontStyle');
      }
      const objCenter = obj.getCenterPoint();
      const newContainer = {
        options: ['Pacifico', 'VT323', 'Quicksand', 'Inconsolata', 'Roboto', 'Arial'],
        topOffset: objCenter.y + (obj.height * 0.5 * obj.scaleY) + 50,
        leftOffset: objCenter.x - (obj.width * 0.5 * obj.scaleX),
        fontstyles: ['italic', 'bold', 'normal'],
        objectFont: ObjectFont,
        objectFontStyle: ObjectFontStyle,
      }

      this.containers.push(newContainer)
    },

    addDragAndDrop() {
      const canvasWrapper = document.getElementById('canvas-wrapper');
      canvasWrapper.addEventListener('drop', (e) => {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        }
        const dt = e.dataTransfer;
        const { files } = dt;
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();

          // eslint-disable-next-line no-shadow
          if (file.type === 'image/svg+xml') {
            reader.readAsText(file);
            reader.onload = (svgElement) => {
              const _ = fabric.loadSVGFromString(svgElement.target.result, (objects, options) => {
                const SVGObject = fabric.util.groupSVGElements(objects, options);
                SVGObject.whitebirdData = { id: v4() };
                this.canvas.centerObject(SVGObject);
                this.canvas.add(SVGObject);
              });
            };
          } else if (file.type === 'image/jpeg' || file.type === 'image/png') {
            reader.readAsDataURL(file);
            reader.onload = (imgElement) => {
              const image = new Image();
              image.src = imgElement.target.result;
              const _ = fabric.Image.fromObject(image, (img) => {
                img.set({
                  whitebirdData: { id: v4() },
                  left: 0,
                  top: 0,
                  angle: 0,
                });
                this.canvas.centerObject(img);
                this.canvas.add(img);
              });
            };
          } else {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: this.$t('whiteboard.unsupportedType'),
            });
          }
        }
        return false;
      });
      canvasWrapper.addEventListener('dragover', this.cancel);
      canvasWrapper.addEventListener('dragenter', this.cancel);
    },
    cancel(e) {
      if (e.preventDefault) { e.preventDefault(); }
      return false;
    },
    renderIcon(icon) {
      return (ctx, left, top, styleOverride, fabricObject) => {
        var size = this.cornerSize
        ctx.save()
        ctx.translate(left, top)
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle))
        ctx.drawImage(icon, -size/2, -size/2, size, size)
        ctx.restore()
      }
    },
    deleteObject() {
      this.$nuxt.$emit(customEvents.canvasTools.removeObject)
	  },
    bringObjectToFront() {
      this.$nuxt.$emit(customEvents.canvasTools.bringObjectToFront)
    },
    bringObjectForward() {
      this.$nuxt.$emit(customEvents.canvasTools.bringObjectForward)
    },
    sendObjectToBack() {
      this.$nuxt.$emit(customEvents.canvasTools.sendObjectToBack)
    },
    sendObjectBackwards() {
      this.$nuxt.$emit(customEvents.canvasTools.sendObjectBackwards)
    },
    pinObject() {
      this.$nuxt.$emit(customEvents.canvasTools.pinObject)
    },
    unPinObject() {
      this.$nuxt.$emit(customEvents.canvasTools.unPinObject)
    },
    cloneObject(eventData, transform) {
      var target = transform.target
      var canvas = target.canvas
      target.clone((cloned) => {
        cloned.left += 10
        cloned.top += 10
        canvas.add(cloned)
      })
    },
  },
}

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
@import url('https://fonts.googleapis.com/css?family=Quicksand&display=swap');
@import url('https://fonts.googleapis.com/css?family=Inconsolata');
@import url('https://fonts.googleapis.com/css?family=VT323');
@import url('https://fonts.googleapis.com/css?family=Pacifico');

.canvas-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.canvas-wrapper.dots {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='54' height='54' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='13' height='13' fill-opacity='0.1' fill='%23000000'/%3E%3C/svg%3E");
}

.canvas-wrapper.eisenhower {
  background-image: url('https://svgshare.com/i/9Eo.svg');
}

.canvas-wrapper.blank {
  background-image: none;
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
