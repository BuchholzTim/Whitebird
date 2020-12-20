<template>
  <div>
    <span>
      <a id="register-button" class="navbar-item" @click="create">
        <span class="button signup-button rounded secondary-btn raised">
          Create WhiteBoard
        </span>
      </a>
      <span class="button signup-button rounded secondary-btn raised">
        Join WhiteBoard
      </span>
    </span>
    <br />
    <br />
    <br />
    <div>Current Canvas ID: {{ canvasID }}</div>

    <a id="register-button" class="navbar-item" @click="join">
      <span class="button signup-button rounded secondary-btn raised">
        Join WhiteBoard
      </span>
    </a>
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
        this.socket = this.$nuxtSocket({});
        this.socket.emit('joinWhiteboard', {
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
