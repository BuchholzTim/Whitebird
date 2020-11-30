<template>
  <footer class="footer footer-dark">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>App Info</h3>
            </div>
            <ul class="link-list">
              <li>
                <a href="https://github.com/BuchholzTim/MTI-Projekt">Get code</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Docs</h3>
            </div>
            <ul class="link-list">
              <li>
                <a href="https://github.com/BuchholzTim/MTI-Projekt/wiki"
                  >See docs</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Credits</h3>
            </div>
            <ul class="link-list">
              <li>
                <a
                  href="https://github.com/BuchholzTim/MTI-Projekt/graphs/contributors"
                  >Contributors</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="column">
          <div class="footer-column">
            <div class="footer-header">
              <h3>Follow us</h3>
              <nav class="level">
                <div class="level-centered">
                  <a class="level-item" href="">
                    <span class="icon">
                      <img src="../assets/images/armin.jpg" />
                    </span>
                  </a>
                  <a class="level-item" href="">
                    <span class="icon">
                      <img src="../assets/images/tim.jpg" />
                    </span>
                  </a>
                  <a class="level-item" href="">
                    <span class="icon">
                      <img src="../assets/images/bollmann.jpg" />
                    </span>
                  </a>
                  <a class="level-item" href="">
                    <span class="icon">
                      <img src="../assets/images/raphael.jpg" />
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.icon {
  align-items: center;
  display: inline-flex;
  justify-content: center;
  height: 3rem;
  width: 3rem;
}
span {
  font-style: inherit;
  font-weight: inherit;
}
footer.footer-dark .footer-column .level-item .icon {
  color: #f39200;
}
.level-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: auto;
}
.level-centered {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
}
.level {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
footer.footer-dark .footer-column ul.link-list a {
  color: #98a9c3;
  font-weight: 400;
}
a {
  cursor: pointer;
}
li {
  padding: 0;
  margin: 0;
}
footer.footer-dark .footer-column ul.link-list {
  line-height: 40px;
  font-size: 1.1rem;
}
footer.footer-dark .footer-column .footer-header h3 {
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.column {
  display: block;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  padding: 0.75rem;
}
.columns {
  display: flex;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
}
.container .columns {
  margin-top: 35px;
}
.footer.footer-dark {
  background: #111111;
  color: #fff;
}

@media screen and (min-width: 1280px) {
  .container {
    max-width: 1152px;
    width: 1152px;
  }
}

@media screen and (min-width: 1088px) {
  .container {
    max-width: 960px;
    width: 960px;
  }
}

.container {
  margin: 0 auto;
  position: relative;
}

.footer {
  padding: 3rem 1.5rem 6rem;
}
</style>
