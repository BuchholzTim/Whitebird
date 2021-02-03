<template>
  <section id="joinLobby" class="join-section pb-16">
    <div class="container">
      <div class="inner py-5 px-3 px-md-6 text-center">
        <h2>{{ $t('joinLobbySection.joinRoom') }}</h2>
        <p>{{ $t('joinLobbySection.teamWaiting') }}</p>
        <p>
          <button
            type="button"
            class="button btn-join"
            @click="showJoinModal = true"
          >
            {{ $t('joinLobbySection.join') }}
          </button>
        </p>
      </div>
    </div>
    <p class="or-divider">
      <img src="../../assets/images/or-divider.png" />
    </p>
    <div class="container bg">
      <div class="inner py-5 px-3 px-md-6 text-center">
        <h2>{{ $t('joinLobbySection.createRoom') }}</h2>
        <p>{{ $t('joinLobbySection.teamWaiting') }}</p>
        <p>
          <button
            ref="btnCreate"
            type="button"
            class="button btn-join"
            @click="create"
          >
            {{ $t('joinLobbySection.createRoom') }}
          </button>
        </p>
      </div>
      <JoinLobbyModal :show="showJoinModal" @update-modal="closeModal" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import JoinLobbyModal from '~/components//modals/JoinLobbyModal.vue';

export default {
  components: {
    JoinLobbyModal,
  },
  data() {
    return {
      isCreated: false,
      showJoinModal: false,
    };
  },
  computed: {
    ...mapState({
      canvasID: (state) => state.canvas.id,
    }),
  },
  methods: {
    create() {
      this.disableSubmission(this.$refs.btnCreate);
      this.$store.dispatch('canvas/createCanvas').then(() => {
        this.socket = this.$nuxtSocket({
          persist: 'whitebirdSocket',
        });
        this.socket.emit('joinWhiteboard', {
          sender: 'this.name',
          room: this.canvasID,
          message: 'Joining Whiteboard',
        });
        this.enableSubmission(this.$refs.btnCreate);
        this.$router.push('/Whiteboard');
      });
    },
    disableSubmission(btn) {
      btn.setAttribute('disabled', 'disabled');
      this.btnOldHtml = btn.innerHTML;
      btn.innerHTML = '<i class="fa fa-spinner fa-spin mr-2"></i> Creating room...';
    },
    enableSubmission(btn) {
      btn.removeAttribute('disabled');
      btn.innerHTML = this.btnOldHtml;
    },
    closeModal() {
      this.showJoinModal = !this.showJoinModal;
    },
  },
};
</script>

<style lang="scss" scoped>
#joinLobby {
  padding-top: 2rem;
  .container {
    display: flex;
    justify-content: center;
    .inner {
      display: flex;
      width: 60%;
      flex-flow: column;
      align-items: center;
      background: #f39200;
      z-index: 1;
      background: -webkit-gradient(
        linear,
        left top,
        left bottom,
        from(#f39200),
        to(#ffc266)
      );
      background: linear-gradient(180deg, #f39200 0%, #ffc266 100%);
      border-radius: 12px;
      color: #fff;

      h2 {
        font-weight: 600;
        font-size: 22px;
      }

      p {
        font-weight: 400;
        padding-bottom: 10px;
      }

      .btn-join {
        background: #ff7e85;
        color: #fff;
        font-weight: 600;
        border: none;
      }
    }
  }
}

#joinLobby .container.bg::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 45%;
  background-color: #fbfbfb;
}

.or-divider {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 3em;
  margin: 0 1em;
  padding: 0.5em;

  img {
    width: 175px;
  }
}

.or-divider::before {
  content: '';
  height: 0.1em;
  background: black;
  flex: 1;
  margin: 0 0.25em 0 0;
}
.or-divider::after {
  content: '';
  height: 0.1em;
  background: black;
  flex: 1;
  margin: 0 0 0 0.25em;
}
</style>
