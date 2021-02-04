<template>
  <div class="modal" :class="{ 'is-active': show }">
    <div class="modal-background" @click="hideModal"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ $t('shareWhiteboard.share') }}</p>
        <button class="delete" aria-label="close" @click="hideModal"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="column-l">
              <p class="text-muted">{{ $t('shareWhiteboard.shareViaJoinCode') }}</p>
            </div>
            <div class="column-r">
              <div class="control">
                <input
                  id="join-code"
                  class="input"
                  readonly
                  type="text"
                  :value="shareLink"
                />
                <div v-if="error" class="invalid-feedback">
                  {{ $t('shareWhiteboard.clipError') }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button ref="btnCopy" class="button btn-copy" @click.stop.prevent="copyLink">
          <span v-if="!isToggled">{{ $t('shareWhiteboard.copyLink') }}</span>
          <span v-if="isToggled">{{ $t('shareWhiteboard.copied') }}</span>
        </button>
        <button class="button" @click="hideModal">
          {{ $t('shareWhiteboard.cancel') }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WhitebirdLogger from '~/utils/WhitebirdLogger';

const logger = new WhitebirdLogger('ShareWhiteboard.vue');

export default {
  props: {
    show: {
      type: Boolean,
    },
  },
  data() {
    return {
      isToggled: false,
      shareLink: '',
      error: false,
    };
  },
  computed: {
    ...mapState({
      canvasID: (state) => state.canvas.id,
    }),
  },
  mounted() {
    this.shareLink = `${process.env.FRONTEND_HOST}/share/${this.canvasID}`;
  },
  methods: {
    hideModal() {
      const open = this.show;
      this.$emit('update-modal', open);
    },
    copyLink() {
      const copyText = this.shareLink;
      if (navigator.clipboard) {
        this.isToggled = true;
        setTimeout(() => {
          this.isToggled = false;
        }, 2000);
        logger.log('Clipboard API available');
        navigator.clipboard.writeText(copyText);
      } else {
        this.error = true;
        setTimeout(() => {
          this.error = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
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
  flex-basis: 25%;
  max-width: 25%;
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
