<template>
  <div class="whiteboard-container">
    <div class="container-content">
      <SideControls />
    </div>
  </div>
</template>

<script>
import SideControls from '../components/panel/SideControls.vue';

export default {
  components: {
    SideControls,
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
  height: 80vh;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  background-color: #f2f2f2;
  background-color: #ffffff;
  background-color: #ffffff;
  /**we can change the scale (first width+heigt) and size (of points -2nd height width param) */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 100 100'%3E%3Crect x='0' y='0' width='13' height='13' fill-opacity='0.1' fill='%23000000'/%3E%3C/svg%3E");
}
</style>
