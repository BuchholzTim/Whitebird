<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">frontend</h1>
      <button @click="buttonClick">Send Message</button>
      <button @click="buttonClick2">Send Message To All</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.socket = this.$nuxtSocket({
      name: 'main',
      channel: '/index',
    });
    /* Listen for events: */
    this.socket.on('msgToClient', (msg, cb) => {
      /* Handle event */
      console.log(`[Message Received] ${msg}`);
    });
  },
  methods: {
    buttonClick() {
      /* Emit events */
      this.socket.emit('msgToServer', 'message to server');
    },
    buttonClick2() {
      /* Emit events */
      this.socket.emit('msgToServerAll', 'message to all clients');
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
