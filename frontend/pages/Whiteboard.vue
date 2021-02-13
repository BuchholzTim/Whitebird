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
import { mapState } from 'vuex';
import WhiteBoardControls from '~/components/panel/WhiteBoardControls.vue';
import FabricJS from '~/components/FabricJS.vue';
import PageLoader from '~/components/_pageLoader/PageLoader.vue';
import customEvents from '~/utils/customEvents';

export default {
  components: {
    WhiteBoardControls,
    FabricJS,
    PageLoader,
  },
  data() {
    return {
      loaded: false,
    };
  },
  layout: 'empty',
  computed: {
    ...mapState({
      canvasID: (state) => state.canvas.id,
    }),
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      teardown: false,
      persist: 'whitebirdSocket',
    });

    this.$nuxt.$on(customEvents.canvasTools.updatingDataState, (payload) => {
      this.loaded = payload;
    });
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
}
</style>
