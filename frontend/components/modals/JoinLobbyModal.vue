<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="hideModal"></div>
    <div class="modal-card" :class="{ animated: animated }">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('joinLobbyModal.joinLobby') }}</p>
        <button class="delete" aria-label="close" @click="hideModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="column-l">
              <p class="text-muted">{{ $t('joinLobbyModal.joinCode') }}</p>
            </div>
            <div class="column-r">
              <div class="control">
                <input id="join-code" v-model="joinCode" class="input" type="text" />
                <div v-if="error" class="invalid-feedback">
                  {{ $t('joinLobbyModal.joinCodeError') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button ref="btnCopy" class="button btn-copy" @click="joinLobby">
          {{ $t('joinLobbyModal.join') }}
        </button>
        <button class="button" @click="hideModal">
          {{ $t('joinLobbyModal.cancel') }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('FabricJS.vue');

export default {
  props: {
    show: {
      type: Boolean,
    },
  },
  data() {
    return {
      joinCode: '',
      animated: false,
      error: false,
    };
  },
  methods: {
    hideModal() {
      const open = this.show;
      this.$emit('update-modal', open);
    },
    joinLobby() {
      logger.log(this.joinCode);
      this.$store.dispatch('canvas/joinCanvas', this.joinCode.trim()).then((joinCode) => {
        if (joinCode === undefined) {
          this.animated = true;
          this.error = true;
          setTimeout(() => {
            this.animated = false;
            this.error = false;
          }, 2000);
        } else {
          this.$router.push('/Whiteboard');
        }
      });
    },
  },
};
</script>

<style scoped>
.animated {
  -webkit-animation: shake 1s linear;
  animation: shake 1s linear;
}

@keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }
  25%,
  58% {
    -webkit-transform: translateX(10px);
  }
  75% {
    -webkit-transform: translateX(-5px);
  }
  92% {
    -webkit-transform: translateX(5px);
  }
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}

@-webkit-keyframes shake {
  8%,
  41% {
    -webkit-transform: translateX(-10px);
  }
  25%,
  58% {
    -webkit-transform: translateX(10px);
  }
  75% {
    -webkit-transform: translateX(-5px);
  }
  92% {
    -webkit-transform: translateX(5px);
  }
  0%,
  100% {
    -webkit-transform: translateX(0);
  }
}
.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
.invalid-feedback {
  display: inline-block !important;
}

.modal-card-title {
  font-weight: 700 !important;
  text-align: left !important;
}

.modal-card-foot .btn-copy {
  background-color: #fe6011;
  color: white;
}
.modal-card-head,
.modal-card-foot {
  background-color: #fff;
}
.modal-background {
  background-color: rgba(10, 10, 10, 0.5);
}
.modal {
  z-index: 1000 !important;
}
.column-r {
  flex-basis: 75%;
  max-width: 75%;
}
.column-l {
  flex-basis: 35%;
  max-width: 35%;
  margin-right: 10px;
}
.text-muted {
  font-weight: 700;
}
.modal-card-body .columns {
  display: flex;
  flex-wrap: wrap;
}

.modal-card-body .columns .column {
  width: 100%;
  height: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
}
</style>
