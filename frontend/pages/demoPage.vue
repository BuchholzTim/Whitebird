<template>
  <div>
    <span>
      <a id="register-button" class="navbar-item" @click="create">
        <span class="button signup-button rounded secondary-btn raised">
          Create WhiteBoard
        </span>
      </a>
      <a id="register-button" class="navbar-item" @click="join">
        <span class="button signup-button rounded secondary-btn raised">
          Join WhiteBoard
        </span>
      </a>
    </span>
    <br />
    <br />
    <div>Current Canvas ID: {{ canvasID }}</div>

    <NuxtLink to="/Whiteboard">Link to Whiteboard</NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  layout: 'empty',
  data: () => ({
    whiteboardID: null,
  }),
  computed: {
    ...mapState({
      canvasID: (state) => state.canvas.id,
    }),
  },
  methods: {
    create() {
      this.$store.dispatch('canvas/createCanvas').then(() => {
        this.socket = this.$nuxtSocket({
          teardown: false,
          persist: 'whitebirdSocket',
        });

        this.socket.emit('createCanvasObject', {
          sender: 'this.name',
          room: this.canvasID,
          message: 'Joining Whiteboard',
        });
      });
    },
    join() {
      this.$store.dispatch('canvas/joinCanvas', this.canvasID);
    },
  },
};
</script>

<style scoped>
@import '~assets/scss/_header+hero.scss';
@import '~assets/scss/_animations.scss';
</style>
