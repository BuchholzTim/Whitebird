<template>
  <nav class="navbar">
    <!-- Nav bar start -->
    <div class="navbar-brand">
      <img src="../assets/images/art_logo.png" width="140" height="auto" />
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div class="navbar-start">
      <a class="navbar-item"> <NuxtLink to="/">Home</NuxtLink> </a>

      <a class="navbar-item">
        <NuxtLink to="/Whiteboard"> Whiteboard </NuxtLink>
      </a>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"> More </a>

        <div class="navbar-dropdown">
          <a class="navbar-item"> About </a>
          <a class="navbar-item"> Jobs </a>
          <a class="navbar-item"> Contact </a>
          <hr class="navbar-divider" />
          <a class="navbar-item"> Report an issue </a>
        </div>
      </div>
    </div>

    <!-- Nav bar end-->
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary"><NuxtLink to="/Login"> Login </NuxtLink> </a>
          <a class="button btn-register">
            <strong><NuxtLink to="/Register"> Register </NuxtLink></strong>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  box-shadow: 3px 3px 16px 0 #e8e8e8;
  background-color: #fff;
  border-radius: 5px;
  padding-top: 6px;
  padding-bottom: 6px;
  left: 0%;
  top: 16px;
  right: 0%;
  bottom: auto;
  width: 90%;
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
}

.btn-register {
  background-color: #fe6011 !important;
  color: #fff !important;
  border-radius: 8px !important;
}
</style>
