<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Share this board</p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column">
            <div class="column-l">
              <p class="text-muted">Share via join code:</p>
            </div>
            <div class="column-r">
              <div class="control">
                <input
                  id="join-code"
                  class="input"
                  readonly
                  type="text"
                  :value="canvasID"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button ref="btnCopy" class="button btn-copy" @click.stop.prevent="copyLink">
          <span v-if="!isToggled">Copy link</span>
          <span v-if="isToggled">Copied</span>
        </button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      isToggled: false,
    };
  },
  computed: {
    ...mapState({
      canvasID: (state) => state.canvas.id,
    }),
  },
  methods: {
    copyLink() {
      this.isToggled = true;
      setTimeout(() => {
        this.isToggled = false;
      }, 2000);
      const copyText = document.getElementById('join-code');
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand('copy');
    },
  },
};
</script>

<style scoped>
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
