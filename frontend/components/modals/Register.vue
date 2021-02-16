<template>
  <div class="modal register-modal is-fullheight is-primary">
    <div class="modal-background register-background"></div>
    <div class="modal-card">
      <div class="container has-text-centered">
        <div class="column is-8 is-offset-2">
          <h3 class="title has-text-white">Register</h3>
          <hr class="login-hr" />
          <p class="subtitle has-text-white">
            Please register to see awesome stuff!
          </p>
        </div>
        <div class="box">
          <div class="box">
            <img src="~/assets/images/identity.svg" />
          </div>
          <div class="title has-text-grey is-5">Please enter your credentials.</div>
          <form>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="user.name"
                  class="input is-medium"
                  type="text"
                  placeholder="Your name"
                  autofocus=""
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-font"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="user.email"
                  class="input is-medium"
                  type="email"
                  placeholder="Your Email"
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
            <div class="field">
              <div class="control has-icons-left">
                <input
                  v-model="user.password_confirmation"
                  class="input is-medium"
                  type="password"
                  placeholder="Confirm your password"
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
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('Register.vue');

export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      errors: {},
    };
  },
  methods: {
    handleSubmit() {
      if (
        this.user.password === this.user.password_confirmation &&
        this.user.password.length > 0
      ) {
        /**
         * try catch here
         */
        logger.log(this.user);
      } else {
        this.user.password = '';
        this.user.password_confirmation = '';
      }
    },
  },

  /**
   * here should be a callback that checks if the user is logged in and redirects him to the board
   * call beforeRouteEnter method of router and check if the user is logged in
   * e.g. getItem("TOKEN") != null -> is logged in
   * and redirect him where ever you want
   */
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
