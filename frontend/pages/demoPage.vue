<template>
  <div>
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
  </div>
</template>

<script>
import { createWhiteboard, joinWhiteboard } from '~/utils/axios/axiosCalls.js';

export default {
  layout: 'empty',
  data: () => ({
    whiteboardID: null,
  }),
  methods: {
    create() {
      createWhiteboard(this.$axios).then((res) => {
        console.log(res);
        this.whiteboardID = res._id;
      });
    },
    join() {
      joinWhiteboard(this.$axios, this.whiteboardID).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
@import '~assets/scss/_header+hero.scss';
@import '~assets/scss/_animations.scss';
</style>
