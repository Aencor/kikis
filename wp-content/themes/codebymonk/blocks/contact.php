<?php
/**
 * Contact Block Template
 */

$block_attrs = function_exists('cbm_block_attributes') && isset($block) ? cbm_block_attributes($block, 'section contact') : 'class="section contact" id="contacto"';

$kicker      = get_field('contact_kicker') ?: '¿Tienes un proyecto?';
$heading     = get_field('contact_heading') ?: 'Hagamos algo<br /><em>inolvidable.</em>';
$desc        = get_field('contact_desc') ?: 'Cuéntanos qué tienes en mente. Prometemos responder antes de gastar nuestras siete vidas.';
$email       = get_field('contact_email') ?: 'hola@kikismarketing.com';
$services    = get_field('contact_services_options') ?: [
  'Estrategia digital',
  'Social media',
  'Identidad de marca',
  'Web & e-commerce'
];
?>

<section <?= $block_attrs; ?>>
  <div class="contact-copy">
    <svg viewBox="0 0 48 48" aria-hidden="true" class="paw-icon">
      <ellipse cx="24" cy="31" rx="11" ry="9" fill="currentColor" />
      <ellipse cx="10" cy="21" rx="5" ry="7" fill="currentColor" transform="rotate(-24 10 21)" />
      <ellipse cx="21" cy="13" rx="5" ry="7" fill="currentColor" transform="rotate(-5 21 13)" />
      <ellipse cx="37" cy="20" rx="5" ry="7" fill="currentColor" transform="rotate(24 37 20)" />
    </svg>
    <p class="kicker"><?= esc_html($kicker); ?></p>
    <h2><?= wp_kses_post($heading); ?></h2>
    <p><?= esc_html($desc); ?></p>
    <a href="mailto:<?= esc_attr($email); ?>">
      <?= esc_html($email); ?> 
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
    </a>
  </div>

  <form class="contact-form" id="kikis-contact-form">
    <label>
      Tu nombre
      <input required name="name" placeholder="¿Cómo te llamas?" />
    </label>
    <label>
      Tu email
      <input required type="email" name="email" placeholder="hola@tumarca.com" />
    </label>
    <label>
      ¿En qué podemos ayudarte?
      <select required name="service" defaultValue="">
        <option value="" disabled selected>Selecciona un servicio</option>
        <?php foreach ($services as $svc): ?>
          <option value="<?= esc_attr($svc); ?>"><?= esc_html($svc); ?></option>
        <?php endforeach; ?>
      </select>
    </label>
    <label>
      Cuéntanos un poco más
      <textarea required name="message" rows="3" placeholder="Tu idea, tus objetivos, tus sueños..."></textarea>
    </label>
    <button class="button button-dark" type="submit">
      <span class="btn-text">Enviar mensaje</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
    </button>
    <p class="form-success" role="status">¡Gracias! Muy pronto afilamos ideas contigo.</p>
  </form>
</section>
