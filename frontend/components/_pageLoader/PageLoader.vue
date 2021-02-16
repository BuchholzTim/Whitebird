<template>
  <div v-if="loaded" class="pageloader">
    <img src="~/assets/images/identity.svg" />
  </div>
</template>

<script>
export default {
  props: {
    loaded: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.pageloader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #333, $alpha: 0.5);
  z-index: 9999;
}

.pageloader img {
  margin-top: 5%;
  margin-bottom: 5%;
  width: 15%;
  -webkit-animation: move 2s infinite alternate;
  animation: move 1s infinite alternate;
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-20px);
  }
}

@-webkit-keyframes move {
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(-20px);
  }
}
</style>
