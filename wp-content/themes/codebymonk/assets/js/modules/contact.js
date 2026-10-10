/**
 * Contact Module
 * Sends contact form data directly to WhatsApp (+5215581812373)
 */

export default {
  init() {
    const form = document.getElementById('kikis-contact-form');
    if (!form) return;

    const WHATSAPP_NUMBER = '5215581812373';

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('[name="name"]');
      const emailInput = form.querySelector('[name="email"]');
      const serviceInput = form.querySelector('[name="service"]');
      const messageInput = form.querySelector('[name="message"]');

      const name = nameInput?.value.trim() || '';
      const email = emailInput?.value.trim() || '';
      const service = serviceInput?.value.trim() || 'General';
      const message = messageInput?.value.trim() || '';

      if (!name || !email || !message) {
        return;
      }

      // Formatted WhatsApp message with feline touch
      const text = 
`🐾 *¡Nuevo contacto desde Kiki's Marketing!*

👤 *Nombre:* ${name}
✉️ *Email:* ${email}
🎯 *Servicio de interés:* ${service}

💬 *Mensaje:*
${message}
`;

      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;

      const successMsg = form.querySelector('.form-success');
      const submitBtn = form.querySelector('button[type="submit"] .btn-text');
      const originalText = submitBtn ? submitBtn.textContent : 'Enviar por WhatsApp';

      if (submitBtn) {
        submitBtn.textContent = '¡Abriendo WhatsApp... 🐾!';
      }
      if (successMsg) {
        successMsg.textContent = '¡Redirigiendo a WhatsApp con tu información!';
        successMsg.classList.add('is-visible');
      }

      // Open WhatsApp
      const newTab = window.open(whatsappUrl, '_blank');
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }

      setTimeout(() => {
        if (submitBtn) submitBtn.textContent = originalText;
        if (successMsg) successMsg.classList.remove('is-visible');
        form.reset();
      }, 3000);
    });
  },
};
