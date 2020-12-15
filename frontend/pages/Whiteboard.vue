<template>
  <div class="whiteboard-container">
    <div class="container-content">
      <WhiteBoardControls />
      <FabricJS />
    </div>
    <PageLoader :loaded="loaded" />
  </div>
</template>

<script>
import WhiteBoardControls from '~/components/panel/WhiteBoardControls.vue';
import FabricJS from '~/components/FabricJS.vue';
import PageLoader from '~/components/_pageLoader/PageLoader.vue';

export default {
  components: {
    WhiteBoardControls,
    FabricJS,
    PageLoader,
  },
  data: () => ({
    loaded: false,
  }),
  layout: 'empty',
  mounted() {
    this.loadWhiteboardData();
  },
  methods: {
    loadWhiteboardData() {
      this.loaded = true;
      setTimeout(() => {
        this.loaded = false;
      }, 3000);
    },
  },
};
</script>
<style lang="scss">
.whiteboard-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.container-content {
  height: 100vh;
  width: 100vw;
  margin-left: auto;
  margin-right: auto;
  background-color: #f2f2f2;
  background-color: #ffffff;
  background-color: #ffffff;
  /**we can change the scale (first width+heigt) and size (of points -2nd height width param) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='13' height='13' fill-opacity='0.1' fill='%23000000'/%3E%3C/svg%3E");
}
</style>
