<template>
  <nav class="navbar navbar--fixed-top">
    <div class="navbar__items">
      <div
        aria-label="Navigation bar toggle"
        class="navbar__toggle"
        role="button"
        tabindex="0"
      ></div>
      <a class="navbar__brand" href="/">
        <img
          src="../assets/images/art_logo.png"
          alt="Art Logo"
          class="themedImage_2E_h themedImage--light_AouX navbar__logo"
        />
        <strong class="navbar__title">ART</strong>
        <a class="navbar__item navbar__link" href="/">Docs</a>
        <a class="navbar__item navbar__link" href="/Whiteboard">Whiteboard</a>
      </a>
    </div>
    <div class="navbar__items navbar__items--right">
      <a
        href="https://github.com/BuchholzTim/MTI-Projekt"
        target="_blank"
        rel="noopener noreferrer"
        class="navbar__item navbar__link header-github-link"
        aria-label="Github Repository"
      >
        <img src="../assets/images/github-logo.svg" />
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar--fixed-top {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 4;
}
.navbar {
  background-color: #f2f6fa;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  height: 3.7rem;
  padding: calc(1rem * 0.5) 1rem;
  width: 100%;
}
.navbar__items {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
}

.navbar__toggle {
  cursor: pointer;
  display: none;
  margin-right: 0.5rem;
}

.navbar__brand {
  align-items: center;
  display: flex;
  font-weight: 700;
  height: 2rem;
  margin-right: 1rem;
}

.navbar__brand,
.navbar__link {
  color: #1c1e21;
}

.navbar__logo {
  height: 100%;
  margin-right: 0.5rem;
}

.navbar-sidebar--show .navbar-sidebar__backdrop,
html[data-theme='dark'] .themedImage--dark_1YPN,
html[data-theme='light'] .themedImage--light_AouX {
  display: block;
}

img {
  border-style: none;
}

.navbar__title {
  flex-shrink: 0;
  max-width: 100%;
}

.navbar__link {
  font-weight: 500;
  text-decoration: none;
}

.navbar__item {
  display: inline-block;
}

.navbar__item,
.navbar__link {
  padding: 0.25rem 1rem;
}

.navbar__items--right {
  justify-content: flex-end;
}

.navbar__items {
  align-items: center;
  display: flex;
  flex: 1 1 auto;
}

.header-github-link img {
  content: '';
  width: 24px;
  height: 24px;
  display: flex;
}
</style>
