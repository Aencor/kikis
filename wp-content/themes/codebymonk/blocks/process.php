<?php
/**
 * Process Block Template
 */

$block_attrs = function_exists('cbm_block_attributes') && isset($block) ? cbm_block_attributes($block, 'section process') : 'class="section process" id="proceso"';

$kicker  = get_field('process_kicker') ?: 'Cómo trabajamos';
$heading = get_field('process_heading') ?: 'Curiosas por naturaleza.<br />Estratégicas por elección.';

$steps = get_field('process_steps') ?: [
  [
    'number' => '01',
    'title'  => 'Olfateamos',
    'text'   => 'Escuchamos, investigamos y hacemos las preguntas incómodas.',
  ],
  [
    'number' => '02',
    'title'  => 'Trazamos',
    'text'   => 'Definimos una ruta clara, ambiciosa y totalmente tuya.',
  ],
  [
    'number' => '03',
    'title'  => 'Creamos',
    'text'   => 'Convertimos estrategia en ideas que nadie puede ignorar.',
  ],
  [
    'number' => '04',
    'title'  => 'Medimos',
    'text'   => 'Optimizamos, aprendemos y volvemos a saltar más alto.',
  ],
];
?>

<section <?= $block_attrs; ?>>
  <div class="section-heading process-heading">
    <p class="kicker"><?= esc_html($kicker); ?></p>
    <h2><?= wp_kses_post($heading); ?></h2>
  </div>

  <div class="process-steps">
    <?php foreach ($steps as $step): ?>
      <article>
        <div class="cat-doodles" aria-hidden="true">
          <!-- Paw -->
          <svg viewBox="0 0 48 48">
            <ellipse cx="24" cy="31" rx="11" ry="9" fill="currentColor" />
            <ellipse cx="10" cy="21" rx="5" ry="7" fill="currentColor" transform="rotate(-24 10 21)" />
            <ellipse cx="21" cy="13" rx="5" ry="7" fill="currentColor" transform="rotate(-5 21 13)" />
            <ellipse cx="37" cy="20" rx="5" ry="7" fill="currentColor" transform="rotate(24 37 20)" />
          </svg>
          <!-- Fish -->
          <svg viewBox="0 0 48 48">
            <path d="M8 24c7-10 18-12 27-5l7-6v22l-7-6c-9 7-20 5-27-5Zm6 0h.1" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
          </svg>
          <!-- Yarn -->
          <svg viewBox="0 0 48 48">
            <circle cx="22" cy="23" r="14" fill="none" stroke="currentColor" stroke-width="3" />
            <path d="M10 18c8-5 18-2 25 5M10 28c8 3 17 1 24-6M18 9c-3 8 1 19 10 27m7-3c5 1 8 4 10 8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="3" />
          </svg>
        </div>

        <span><?= esc_html($step['number']); ?></span>
        <h3><?= esc_html($step['title']); ?></h3>
        <p><?= esc_html($step['text']); ?></p>
      </article>
    <?php endforeach; ?>
  </div>
</section>
