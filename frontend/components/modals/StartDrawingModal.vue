<template>
  <div class="modal-backdrop">
    <div class="modal modal-m is-visible">
      <div class="modal-content">
        <div class="grid mb-2 mt-1">
          <div class="grid-column">
            <img src="../../assets/images/identity.svg" />
          </div>
          <div class="grid-column grid-column-12">
            <p class="paragraph h2">
              <b>ART</b> is a colloborative, shareable whiteboard that makes drawing
              and colloboration a breeze.
            </p>
          </div>
        </div>
        <div class="grid grid-justify grid-middle mt-2">
          <div class="grid-column column-shrink">
            <button class="button btn-start">
              <NuxtLink to="/Whiteboard" style="color: #fff">Start drawing</NuxtLink>
            </button>
          </div>
          <div class="grid-column">
            <p class="paragraph">
              or
              <a href="#">
                <b style="color: #f39200">Sign up to unlock your full potential.</b>
              </a>
            </p>
          </div>
        </div>
      </div>
      <button
        id="createBtn"
        class="modal-close is-large"
        aria-label="close"
        @click="closeModal"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$nuxt.$emit('update:closeCreateModal');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-backdrop.notVisible {
  display: none;
}
.modal-backdrop {
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4000;
  background-color: #191919;
  background-color: rgba(25, 25, 25, 0.6);
  animation: showBg 0.35s ease-in-out;

  .modal.is-visible {
    display: flex;
    flex-direction: column;
  }

  .modal.modal-m {
    max-width: 660px;
  }

  .modal {
    background-color: #fff;
    border-radius: 24px;
    z-index: 500;
    max-height: 100%;
    position: relative;

    .modal-content {
      padding: 0 42px;
      margin-bottom: 32px;
      -ms-flex: 1;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      .mb-2 {
        margin-bottom: 20px !important;
      }

      .mt-1 {
        margin-top: 10px !important;
      }

      .grid {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;

        .grid-column {
          flex: 1;
          max-width: 100%;
          padding: 8px 4px;

          img {
            width: 55px;
            height: 55px;
          }

          .h2 {
            font-size: 20px;
            font-weight: 500;
          }
        }

        .grid-column.column-shrink {
          flex: 0 1 auto;
        }

        .grid-column-12 {
          flex-basis: 100%;
          max-width: 100%;
        }

        .grid-column .btn-start {
          color: #fff;
          background-color: #f39200;
          border-radius: 24px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
      }

      .grid.grid-middle {
        align-items: center;
      }

      .grid.grid-justify {
        justify-content: center;
      }
    }
  }
}

.modal-backdrop.is-visible {
  display: flex;
}
</style>
