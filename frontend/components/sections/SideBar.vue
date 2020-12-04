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
            <i class="fas fa-info"> </i>
            About
            <i class="fas fa-chevron-right after"></i>
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
            <i class="fas fa-cog"></i>
            Support
            <i class="fas fa-chevron-right after"></i>
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
    };
  },
  methods: {
    toggleAbout() {
      this.isActive = !this.isActive;
      if (this.isActive_2 === true) {
        this.isActive_2 = !this.isActive_2;
      }
    },
    toggleSupport() {
      this.isActive_2 = !this.isActive_2;
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
