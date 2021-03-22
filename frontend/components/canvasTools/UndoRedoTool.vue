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
  data() {
    return {
      config: {
        canvasState             : [],
        currentStateIndex       : -1,
        undoStatus              : false,
        redoStatus              : false,
        undoFinishedStatus      : 1,
        redoFinishedStatus      : 1,
        undoButton              : '',
        redoButton              : '',
      },
    }
  },
  mounted() {
    this.$nuxt.$on(customEvents.canvasTools.undo, (payload) => {
      this.canvas.isDrawingMode = false
      this.undo(payload)
    })

    this.$nuxt.$on(customEvents.canvasTools.redo, (payload) => {
      this.canvas.isDrawingMode = false
      this.redo(payload)
    })

    this.canvas.on(
      'object:modified', () => {
        this.updateCanvasState()
      }
    )

    this.canvas.on(
      'object:added', () => {
        this.updateCanvasState()
      }
    )
  },
  methods: {
    updateCanvasState() {
      if((this.config.undoStatus == false && this.config.redoStatus == false)){
          var jsonData        = this.canvas.toJSON();
          var canvasAsJson        = JSON.stringify(jsonData);
          if(this.config.currentStateIndex < this.config.canvasState.length-1){
            var indexToBeInserted                  = this.config.currentStateIndex+1;
            this.config.canvasState[indexToBeInserted] = canvasAsJson;
            var numberOfElementsToRetain           = indexToBeInserted+1;
            this.config.canvasState                    = this.config.canvasState.splice(0,numberOfElementsToRetain);
          }else{
            this.config.canvasState.push(canvasAsJson);
          }
          this.config.currentStateIndex = this.config.canvasState.length-1;
          if((this.config.currentStateIndex == this.config.canvasState.length-1) && this.config.currentStateIndex != -1){
            //this.config.redoButton.disabled= "disabled";
          }
        }
    },
    undo() {
      if(this.config.undoFinishedStatus){
        if(this.config.currentStateIndex == -1){
          this.config.undoStatus = false;
        }
        else{
          if (this.config.canvasState.length >= 1) {
            this.config.undoFinishedStatus = 0;
            if(this.config.currentStateIndex != 0){
              this.config.undoStatus = true;
              this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex-1], () => {
                  var jsonData = JSON.parse(this.config.canvasState[this.config.currentStateIndex-1]);
                  this.canvas.renderAll();
                  this.config.undoStatus = false;
                  this.config.currentStateIndex -= 1;
                  //this.config.undoButton.removeAttribute("disabled");
                  if(this.config.currentStateIndex !== this.config.canvasState.length-1){
                    //this.config.redoButton.removeAttribute('disabled');
                  }
                this.config.undoFinishedStatus = 1;
              });
            }
            else if(this.config.currentStateIndex == 0){
              this.canvas.clear();
              this.config.undoFinishedStatus = 1;
              //this.config.undoButton.disabled= "disabled";
              //this.config.redoButton.removeAttribute('disabled');
              this.config.currentStateIndex -= 1;
            }
          }
        }
      }
    },
    redo() {
      if(this.config.redoFinishedStatus){
        if((this.config.currentStateIndex == this.config.canvasState.length-1) && this.config.currentStateIndex != -1){
          //this.config.redoButton.disabled= "disabled";
        }else{
          if (this.config.canvasState.length > this.config.currentStateIndex && this.config.canvasState.length != 0){
            this.config.redoFinishedStatus = 0;
            this.config.redoStatus = true;
            this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex+1], () => {
                var jsonData = JSON.parse(this.config.canvasState[this.config.currentStateIndex+1]);
                this.canvas.renderAll();
                this.config.redoStatus = false;
                this.config.currentStateIndex += 1;
                if(this.config.currentStateIndex != -1){
                  //this.config.undoButton.removeAttribute('disabled');
                }
              this.config.redoFinishedStatus = 1;
              if((this.config.currentStateIndex == this.config.canvasState.length-1) && this.config.currentStateIndex != -1){
                //this.config.redoButton.disabled= "disabled";
              }
            })
          }
        }
      }
    },
  },
}
</script>
