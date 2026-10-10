<?php
/**
 * Marquee Block Template
 */

$block_attrs = function_exists('cbm_block_attributes') && isset($block) ? cbm_block_attributes($block, 'marquee') : 'class="marquee" aria-label="Especialidades"';

$raw_items = get_field('marquee_items');
$items = [];

if (!empty($raw_items) && is_array($raw_items)) {
  foreach ($raw_items as $item) {
    if (is_array($item) && isset($item['text'])) {
      $items[] = $item['text'];
    } elseif (is_string($item)) {
      $items[] = $item;
    }
  }
}

if (empty($items)) {
  $items = [
    'ESTRATEGIA',
    'CREATIVIDAD',
    'CONTENIDO',
    'RESULTADOS',
    'ESTRATEGIA',
    'CREATIVIDAD'
  ];
}
?>

<section <?= $block_attrs; ?>>
  <div class="marquee-inner">
    <?php for ($loop = 0; $loop < 2; $loop++): ?>
      <?php foreach ($items as $item): ?>
        <?= esc_html($item); ?>
        <svg viewBox="0 0 48 48" aria-hidden="true" class="paw-icon">
          <ellipse cx="24" cy="31" rx="11" ry="9" fill="currentColor" />
          <ellipse cx="10" cy="21" rx="5" ry="7" fill="currentColor" transform="rotate(-24 10 21)" />
          <ellipse cx="21" cy="13" rx="5" ry="7" fill="currentColor" transform="rotate(-5 21 13)" />
          <ellipse cx="37" cy="20" rx="5" ry="7" fill="currentColor" transform="rotate(24 37 20)" />
        </svg>
      <?php endforeach; ?>
    <?php endfor; ?>
  </div>
</section>
