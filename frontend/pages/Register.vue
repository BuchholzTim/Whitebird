 <template>
  <div class="login-form-container">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="../assets/images/account_register.svg" style="padding: 30px" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <!-- Name -->
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input v-model="user.name" class="input" placeholder="Your name" />
              <span class="icon is-small is-left">
                <i class="fas fa-font"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <!-- Email -->
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                v-model="user.email"
                class="input"
                type="password"
                placeholder="Email"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <!-- Password -->
          <div class="field">
            <p class="control has-icons-left">
              <input
                v-model="user.password"
                class="input"
                type="password"
                placeholder="Password"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <!-- Password confirm -->
          <div class="field">
            <p class="control has-icons-left">
              <input
                v-model="user.password_confirmation"
                class="input"
                type="password"
                placeholder="Password confirmation"
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <button
              type="submit"
              class="button is-fullwidth is-success"
              @click="handleSubmit"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
        console.log(this.user);
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
