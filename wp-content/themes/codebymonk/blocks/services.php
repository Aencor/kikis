<?php
/**
 * Services Block Template
 */

$block_attrs = function_exists('cbm_block_attributes') && isset($block) ? cbm_block_attributes($block, 'section services') : 'class="section services" id="servicios"';

$kicker  = get_field('services_kicker') ?: 'Lo que hacemos';
$heading = get_field('services_heading') ?: 'Todo lo que tu marca necesita para sacar las uñas.';
$desc    = get_field('services_description') ?: 'No hacemos ruido porque sí. Creamos estrategias con intención y diseños que se recuerdan.';

$services = get_field('services_list') ?: [
  [
    'number' => '01',
    'title'  => 'Estrategia digital',
    'text'   => 'Encontramos ese hilo del que tirar: posicionamiento, audiencias y un plan accionable para crecer.',
    'tags'   => ['Research', 'Estrategia', 'Campañas'],
  ],
  [
    'number' => '02',
    'title'  => 'Social media',
    'text'   => 'Contenido con personalidad, gestión de comunidad y campañas que hacen que tu marca caiga de pie.',
    'tags'   => ['Contenido', 'Community', 'Paid media'],
  ],
  [
    'number' => '03',
    'title'  => 'Identidad de marca',
    'text'   => 'Creamos universos visuales y verbales memorables para marcas que no quieren parecerse a todas.',
    'tags'   => ['Branding', 'Dirección de arte', 'Copy'],
  ],
  [
    'number' => '04',
    'title'  => 'Web & e-commerce',
    'text'   => 'Experiencias digitales bonitas, intuitivas y obsesionadas con convertir curiosidad en acción.',
    'tags'   => ['UX/UI', 'Web', 'Conversión'],
  ],
];
?>

<section <?= $block_attrs; ?>>
  <div class="section-heading">
    <p class="kicker"><?= esc_html($kicker); ?></p>
    <h2><?= wp_kses_post($heading); ?></h2>
    <p><?= esc_html($desc); ?></p>
  </div>

  <div class="service-list">
    <?php foreach ($services as $service): ?>
      <article class="service-card">
        <span class="service-number"><?= esc_html($service['number']); ?></span>
        <h3><?= esc_html($service['title']); ?></h3>
        <p><?= esc_html($service['text']); ?></p>
        <div class="tags">
          <?php 
          $tags = is_array($service['tags']) ? $service['tags'] : explode(',', $service['tags']);
          foreach ($tags as $tag): ?>
            <span><?= esc_html(trim($tag)); ?></span>
          <?php endforeach; ?>
        </div>
        <a href="#contacto" aria-label="Consultar por <?= esc_attr($service['title']); ?>">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
        </a>
      </article>
    <?php endforeach; ?>
  </div>
</section>
