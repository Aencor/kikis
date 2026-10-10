<?php
/**
 * Portfolio Block Template
 */

$block_attrs = function_exists('cbm_block_attributes') && isset($block) ? cbm_block_attributes($block, 'section portfolio') : 'class="section portfolio" id="portafolio"';

$kicker    = get_field('portfolio_kicker') ?: 'Portafolio seleccionado';
$heading   = get_field('portfolio_heading') ?: 'Trabajo que<br /><em>nos hace ronronear.</em>';
$all_text  = get_field('portfolio_all_text') ?: 'Ver todos los proyectos';
$all_link  = get_field('portfolio_all_link') ?: '#contacto';

$projects = get_field('portfolio_items') ?: [
  [
    'client'    => 'MIMO STUDIO',
    'category'  => 'Branding · Social',
    'title'     => 'Diseño que se saborea',
    'image'     => 'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
    'className' => 'project project-large',
  ],
  [
    'client'    => 'NUBA SKIN',
    'category'  => 'E-commerce · Campaign',
    'title'     => 'Belleza sin filtros',
    'image'     => 'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000',
    'className' => 'project project-small',
  ],
  [
    'client'    => 'CASA CLUB',
    'category'  => 'Social · Content',
    'title'     => 'Tu nuevo lugar favorito',
    'image'     => 'https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200',
    'className' => 'project project-wide',
  ],
];
?>

<section <?= $block_attrs; ?>>
  <div class="portfolio-heading">
    <div>
      <p class="kicker"><?= esc_html($kicker); ?></p>
      <h2><?= wp_kses_post($heading); ?></h2>
    </div>
    <a class="text-link" href="<?= esc_url($all_link); ?>">
      <?= esc_html($all_text); ?> 
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
    </a>
  </div>

  <div class="projects">
    <?php foreach ($projects as $index => $item): 
      $img_url = is_array($item['image']) ? ($item['image']['url'] ?? '') : $item['image'];
      $cls = $item['className'] ?? 'project project-large';
    ?>
      <article class="<?= esc_attr($cls); ?>">
        <div class="project-image">
          <img src="<?= esc_url($img_url); ?>" alt="Proyecto creativo para <?= esc_attr($item['client']); ?>" loading="lazy" />
          <span class="project-index">0<?= $index + 1; ?></span>
          <a href="#contacto" aria-label="Ver proyecto <?= esc_attr($item['client']); ?>">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
          </a>
        </div>
        <div class="project-info">
          <div>
            <p><?= esc_html($item['client']); ?></p>
            <h3><?= esc_html($item['title']); ?></h3>
          </div>
          <span><?= esc_html($item['category']); ?></span>
        </div>
      </article>
    <?php endforeach; ?>
  </div>
</section>
