<?php
/**
 * Results / Testimonials Block Template
 */

$block_attrs = function_exists('cbm_block_attributes') && isset($block) ? cbm_block_attributes($block, 'results') : 'class="results" id="casos"';

$kicker    = get_field('results_kicker') ?: 'Casos de éxito';
$heading   = get_field('results_heading') ?: 'Menos miau.<br /><em>Más resultados.</em>';
$intro     = get_field('results_intro') ?: 'Nos encanta una idea brillante, pero nos gustan aún más los números que demuestran que funciona.';
$cta_text  = get_field('results_cta_text') ?: 'Quiero esos resultados';
$cta_link  = get_field('results_cta_link') ?: '#contacto';

$raw_testimonials = get_field('testimonials');
$testimonials = [];

if (!empty($raw_testimonials) && is_array($raw_testimonials)) {
  foreach ($raw_testimonials as $t) {
    // Build metrics from ACF subfields
    $metrics = [];
    if (!empty($t['metric_1_val'])) {
      $metrics[] = ['value' => $t['metric_1_val'], 'label' => $t['metric_1_lbl'] ?? ''];
    }
    if (!empty($t['metric_2_val'])) {
      $metrics[] = ['value' => $t['metric_2_val'], 'label' => $t['metric_2_lbl'] ?? ''];
    }
    if (!empty($t['metric_3_val'])) {
      $metrics[] = ['value' => $t['metric_3_val'], 'label' => $t['metric_3_lbl'] ?? ''];
    }

    if (empty($metrics) && !empty($t['metrics'])) {
      $metrics = $t['metrics'];
    }

    $testimonials[] = [
      'brand'    => $t['brand'] ?? 'CLIENTE',
      'year'     => $t['year'] ?? date('Y'),
      'quote'    => $t['quote'] ?? '',
      'initials' => !empty($t['initials']) ? $t['initials'] : (!empty($t['name']) ? substr($t['name'], 0, 2) : 'KM'),
      'name'     => $t['name'] ?? '',
      'role'     => $t['role'] ?? '',
      'metrics'  => $metrics,
    ];
  }
}

if (empty($testimonials)) {
  $testimonials = [
    [
      'brand' => 'NUBA SKIN',
      'year' => '2024',
      'quote' => 'Pasamos de ser una marca bonita a ser una marca que la gente busca, recomienda y compra.',
      'metrics' => [
        ['value' => '+214%', 'label' => 'Ventas online'],
        ['value' => '4.8×', 'label' => 'Retorno en ads'],
        ['value' => '+38K', 'label' => 'Comunidad nueva'],
      ],
      'initials' => 'LP',
      'name' => 'Laura Peña',
      'role' => 'Fundadora, Nuba Skin',
    ],
    [
      'brand' => 'MIMO STUDIO',
      'year' => '2024',
      'quote' => 'Kiki’s entendió nuestra esencia desde el primer día y la convirtió en una identidad imposible de ignorar.',
      'metrics' => [
        ['value' => '+176%', 'label' => 'Interacción'],
        ['value' => '3.2×', 'label' => 'Alcance orgánico'],
        ['value' => '+24K', 'label' => 'Nuevos seguidores'],
      ],
      'initials' => 'AM',
      'name' => 'Ana Molina',
      'role' => 'Directora, Mimo Studio',
    ],
    [
      'brand' => 'CASA CLUB',
      'year' => '2025',
      'quote' => 'No solo llenamos la agenda: construimos una comunidad que vuelve, comparte y se siente parte de la marca.',
      'metrics' => [
        ['value' => '92%', 'label' => 'Ocupación'],
        ['value' => '+68%', 'label' => 'Reservas directas'],
        ['value' => '6.1×', 'label' => 'Retorno de campaña'],
      ],
      'initials' => 'JR',
      'name' => 'Javier Ríos',
      'role' => 'Co-fundador, Casa Club',
    ],
  ];
}

$json_testimonials = htmlspecialchars(json_encode($testimonials), ENT_QUOTES, 'UTF-8');
$first = $testimonials[0];
?>

<section <?= $block_attrs; ?> data-testimonials='<?= $json_testimonials; ?>'>
  <div class="results-intro">
    <p class="kicker"><?= esc_html($kicker); ?></p>
    <h2><?= wp_kses_post($heading); ?></h2>
    <p><?= esc_html($intro); ?></p>
    <a class="button button-light" href="<?= esc_url($cta_link); ?>">
      <?= esc_html($cta_text); ?>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
    </a>
  </div>

  <div class="case-study">
    <div class="case-top">
      <span class="case-brand-label">CASO / <?= esc_html($first['brand']); ?></span>
      <span class="case-year-label"><?= esc_html($first['year']); ?></span>
    </div>
    
    <div class="case-content" aria-live="polite">
      <blockquote class="case-quote">“<?= esc_html($first['quote']); ?>”</blockquote>
      
      <div class="metrics">
        <?php foreach ($first['metrics'] as $m): ?>
          <div>
            <strong><?= esc_html($m['value']); ?></strong>
            <span><?= esc_html($m['label']); ?></span>
          </div>
        <?php endforeach; ?>
      </div>

      <div class="client">
        <span class="client-initials"><?= esc_html($first['initials']); ?></span>
        <p><strong class="client-name"><?= esc_html($first['name']); ?></strong><br /><span class="client-role"><?= esc_html($first['role']); ?></span></p>
      </div>
    </div>

    <div class="slider-controls">
      <div class="slider-dots" aria-label="Seleccionar testimonio">
        <?php foreach ($testimonials as $idx => $t): ?>
          <button class="<?= $idx === 0 ? 'active' : ''; ?>" type="button" aria-label="Ver caso de <?= esc_attr($t['brand']); ?>" data-index="<?= $idx; ?>"></button>
        <?php endforeach; ?>
      </div>

      <div class="slider-arrows">
        <button type="button" class="prev-btn" aria-label="Testimonio anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
        </button>
        <span class="slider-counter">01 / <?= sprintf('%02d', count($testimonials)); ?></span>
        <button type="button" class="next-btn" aria-label="Testimonio siguiente">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
        </button>
      </div>
    </div>
  </div>
</section>
