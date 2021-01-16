<template>
  <div>
    <span>
      <a id="register-button" class="navbar-item" @click="create">
        <span class="button signup-button rounded secondary-btn raised">
          Create WhiteBoard
        </span>
      </a>
      <a id="join-button" class="navbar-item" @click="join">
        <span class="button signup-button rounded secondary-btn raised">
          Join WhiteBoard
        </span>
      </a>
      <textarea v-model="whiteboardID"></textarea>
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
      this.$store.dispatch('canvas/createCanvas');
    },
    join() {
      this.$store.dispatch('canvas/joinCanvas', this.whiteboardID);
    },
  },
};
</script>

<style scoped>
@import '~assets/scss/_header+hero.scss';
@import '~assets/scss/_animations.scss';
</style>
