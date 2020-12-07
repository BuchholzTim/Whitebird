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

export function showLoginModal() {
  const loginBtn = document.querySelector('#login-button');
  const loginModal = document.querySelector('.login-modal');
  const modalBg = document.querySelector('.login-background');

  loginBtn.addEventListener('click', () => {
    loginModal.classList.add('is-active');
  });

  modalBg.addEventListener('click', () => {
    loginModal.classList.remove('is-active');
  });
}

export function showRegisterModal() {
  const registerBtn = document.querySelector('#register-button');
  const registerModal = document.querySelector('.register-modal');
  const modalBg = document.querySelector('.register-background');

  registerBtn.addEventListener('click', () => {
    registerModal.classList.add('is-active');
  });

  modalBg.addEventListener('click', () => {
    registerModal.classList.remove('is-active');
  });
}
