<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <i class="fas fa-code"></i>
    </div>
    <div class="sidebar-body">
      <ul class="sidebar-menu">
        <li>
          <span class="nav-section-title"> </span>
        </li>
        <li class="have-children">
          <a href="#" @click="toggleAbout">
            <span>
              <i class="fas fa-info"> </i>
            </span>
            About
            <i
              class="fas fa-chevron-right after"
              :class="{ rotate90: rotation }"
            ></i>
          </a>
          <ul class="children-ul1" :class="{ isactive: isActive }">
            <li class="li-1">
              <a href=""> Documentation </a>
            </li>
            <li class="li-1">
              <a href=""> Sources </a>
            </li>
          </ul>
        </li>
        <li class="have-children">
          <a href="#" @click="toggleSupport">
            <span>
              <i class="fas fa-cog"></i>
            </span>
            Support
            <i
              class="fas fa-chevron-right after"
              :class="{ rotate90: rotation_2 }"
            ></i>
          </a>
          <ul class="children-ul1" :class="{ isactive: isActive_2 }">
            <li class="li-1">
              <a href=""> Github </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
      isActive_2: false,
      rotation: false,
      rotation_2: false,
    };
  },
  methods: {
    toggleAbout() {
      this.isActive = !this.isActive;
      this.rotation = !this.rotation;
      if (this.isActive_2 === true) {
        this.isActive_2 = !this.isActive_2;
      }
    },
    toggleSupport() {
      this.isActive_2 = !this.isActive_2;
      this.rotation_2 = !this.rotation_2;
      if (this.isActive === true) {
        this.isActive = !this.isActive;
      }
    },
  },
};
</script>

<style scoped>
@import '~assets/scss/_sidebar.scss';
</style>
