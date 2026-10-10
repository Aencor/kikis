export default {
  init() {
    const form = document.getElementById('kikis-contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const successMsg = form.querySelector('.form-success');
      const submitBtn = form.querySelector('button[type="submit"] .btn-text');

      if (submitBtn) {
        submitBtn.textContent = '¡Mensaje enviado!';
      }
      if (successMsg) {
        successMsg.classList.add('is-visible');
      }

      form.reset();
    });
  }
};
