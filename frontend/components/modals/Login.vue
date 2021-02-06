<template>
  <div class="modal login-modal is-fullheight is-primary">
    <div class="modal-background login-background"></div>
    <div class="modal-card">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Login</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-white">Please login to see our cool stuff!</p>
        </div>
        <div class="box">
          <div class="box">
            <img src="~/assets/images/identity.svg" />
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
            class="button is-block is-danger is-medium is-fullwidth"
            @click="handleSubmit"
          >
            Login
          </button>
        </div>
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
  methods: {
    handleSubmit() {
      logger.log(this.user);
    },
  },
};
</script>

<style scoped>
.login-form-container {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  width: 450px;
}
</style>
