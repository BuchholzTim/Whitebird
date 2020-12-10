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
                  ref="joincode"
                  class="input"
                  type="text"
                  placeholder=""
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Copy link</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-card-title {
  font-weight: 700 !important;
  text-align: left !important;
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
