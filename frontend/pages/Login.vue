<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-white">Please login to see our cool stuff!</p>
        </div>
        <div class="box">
          <div class="box">
            <img src="../assets/images/identity.svg" />
          </div>
          <div class="title has-text-grey is-5">
            Please enter your email and password.
          </div>
          <form>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="user.email"
                  class="input is-medium"
                  type="email"
                  placeholder="Email"
                  autofocus=""
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="user.password"
                  class="input is-medium"
                  type="password"
                  placeholder="Password"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>
          </form>
          <button
            class="button is-block is-danger is-medium is-fullwidth mt-4"
            @click="handleSubmit"
          >
            Login
          </button>
        </div>
        <p class="has-text-grey navigation-wrapper">
          <a href="/Register">Sign Up</a> &nbsp;·&nbsp;
          <a href="../">Forgot Password</a> &nbsp;·&nbsp;
          <a href="/">Home</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('Login.vue');

export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  layout: 'empty',
  methods: {
    handleSubmit() {
      logger.log(this.user);
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 750px !important;
}
.navigation-wrapper a {
  color: #7a7a7a;
  font-weight: 500;
}
</style>
