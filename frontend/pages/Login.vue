<template>
  <div class="login-form-container">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img src="../assets/images/account_login.svg" />
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                v-model="user.email"
                type="email"
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
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                v-model="user.password"
                type="password"
                placeholder="Password"
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
              Login
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
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.user);
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
