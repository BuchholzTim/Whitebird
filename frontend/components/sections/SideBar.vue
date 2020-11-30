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
li.have-children li.li-1 a {
  background-color: #2b3648;
  padding-left: 62px !important;
  border-bottom: 1px solid #303d52;
  transition: all 0.5s;
  font-size: 0.8rem;
}

.have-children .children-ul1.isactive {
  display: block;
}
.have-children ul {
  display: none;
}
.have-children svg {
  margin-right: 20px;
}

.have-children .after {
  position: absolute;
  top: 27px;
  right: 30px;
  color: #fff;
  transition: all 0.5s;
  font-size: 0.8rem;
}

.sidebar .sidebar-body .sidebar-menu li a:hover {
  padding: 20px 25px;
  display: block;
  text-decoration: none;
  color: #fff;
}
.sidebar .sidebar-body .sidebar-menu li a {
  padding: 20px 25px;
  display: block;
  text-decoration: none;
  color: #fff;
}
.nav-section-title {
  font-size: inherit;
  font-weight: inherit;
}
.sidebar .sidebar-body li.have-children,
.sidebar .sidebar-body li {
  position: relative;
}
.sidebar .sidebar-body .sidebar-menu {
  margin: 0;
  padding: 0;
  max-width: 400px;
  list-style: none;
  list-style-type: none;
}
.sidebar .sidebar-body {
  position: relative;
}
.sidebar-header svg {
  height: 35px;
  width: 35px;
  align-self: center;
  color: white;
}
.sidebar .sidebar-header {
  height: 4.25rem;
  display: flex;
  justify-content: space-between;
  align-content: center;
  border-bottom: 1px solid #3d4e68;
  padding: 0 20px;
}
.sidebar.isActive {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
.sidebar {
  background: #344258;
  height: 100%;
  width: 280px;
  position: fixed;
  top: 0;
  left: 0;
  transition: all 0.3s;
  -webkit-transform: translateX(-281px);
  transform: translateX(-281px);
  z-index: 1000;
}
</style>
