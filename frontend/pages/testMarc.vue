<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">frontend</h1>
      <textarea v-model="name"></textarea>
      <br />
      <textarea v-model="joincode"></textarea>
      <br />
      <button @click="join">Join Room</button>
      <button @click="leave">Leave Room</button>
      <br />
      <br />
      <textarea v-model="message"></textarea>
      <br />
      <button @click="send">Send Message</button>
      <br />
      <br />
      <textarea v-model="receiver" readonly></textarea>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  layout: 'empty',
  data: () => ({
    joincode: 'abcdefg',
    message: 'Your Message here',
    name: 'Max',
    receiver: '',
  }),
  mounted() {
    // this.socket = this.$nuxtSocket({
    //   name: 'main',
    //   channel: this.socketID,
    // });
    // /* Listen for events: */
    // this.socket.on('messageToClient', (msg, cb) => {
    //   /* Handle event */
    //   console.log(`[Message Received From ${msg.sender}] ${msg.message}`);
    //   this.receiver += `${msg.sender}: ${msg.message} \n`;
    // });
  },
  methods: {
    join() {
      this.socket = this.$nuxtSocket({});
      /* Emit events */
      this.socket.emit('joinWhiteboard', {
        sender: this.name,
        room: this.joincode,
        message: 'Joining Whiteboard',
      });
    },
    leave() {
      /* Emit events */
      this.socket.emit('leaveWhiteboard', {
        sender: this.name,
        room: this.joincode,
        message: 'Leaving Whitboard',
      });
    },
    send() {
      /* Emit events */
      this.socket.emit('messageToServer', {
        sender: this.name,
        room: this.joincode,
        message: this.message,
      });
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
