/* eslint-disable import/prefer-default-export */
export function showInviteModal() {
  const inviteBtn = document.querySelector('#colloboration-button');
  const modal = document.querySelector('.modal');
  const modalBg = document.querySelector('.modal-background');

  inviteBtn.addEventListener('click', () => {
    modal.classList.add('is-active');
  });

  modalBg.addEventListener('click', () => {
    modal.classList.remove('is-active');
  });
}
