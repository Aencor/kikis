<?php
/**
 * Hero Block Template
 */

$block_attrs = function_exists('cbm_block_attributes') && isset($block) ? cbm_block_attributes($block, 'hero') : 'class="hero" id="inicio"';

$eyebrow    = get_field('eyebrow') ?: 'Agencia creativa & digital';
$title_main = get_field('title_main') ?: 'Ideas con <em>garra.</em><br />Marcas que dejan huella.';
$intro      = get_field('intro') ?: 'Estrategia, creatividad y mucho instinto para que tu marca no solo se vea bonita: que conecte, crezca y venda.';
$btn_work_text = get_field('btn_work_text') ?: 'Ver nuestro trabajo';
$btn_work_link = get_field('btn_work_link') ?: '#portafolio';
$btn_contact_text = get_field('btn_contact_text') ?: 'Cuéntanos tu idea';
$btn_contact_link = get_field('btn_contact_link') ?: '#contacto';
$note_text  = get_field('note_text') ?: 'Curiosidad estratégica<br />desde 2020';
?>

<section <?= $block_attrs; ?>>
  <div class="hero-copy">
    <p class="eyebrow"><span></span> <?= esc_html($eyebrow); ?></p>
    <h1><?= wp_kses_post($title_main); ?></h1>
    <p class="hero-intro"><?= esc_html($intro); ?></p>
    <div class="hero-actions">
      <a class="button button-dark" href="<?= esc_url($btn_work_link); ?>">
        <?= esc_html($btn_work_text); ?> 
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
      </a>
      <a class="text-link" href="<?= esc_url($btn_contact_link); ?>">
        <?= esc_html($btn_contact_text); ?> 
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
      </a>
    </div>
  </div>

  <div class="hero-art" aria-label="Ilustración y animación 3D de la gatita Kiki">
    <div class="orbit orbit-one">SOCIAL</div>
    <div class="orbit orbit-two">BRANDING</div>
    
    <svg class="spark-icon" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 2c1 15 7 21 22 22-15 1-21 7-22 22C23 31 17 25 2 24 17 23 23 17 24 2Z" fill="currentColor" />
    </svg>

    <!-- 3D Three.js Cat Container -->
    <div class="cat-3d-canvas" id="cat-3d-canvas" title="¡Haz clic para interactuar!"></div>

    <!-- Fallback Cat in case WebGL is disabled -->
    <div class="cat cat-fallback">
      <div class="cat-ear cat-ear-left"></div>
      <div class="cat-ear cat-ear-right"></div>
      <div class="cat-face">
        <span class="eye"></span>
        <span class="eye"></span>
        <span class="nose"></span>
        <span class="whisker whisker-left"></span>
        <span class="whisker whisker-right"></span>
      </div>
    </div>
    
    <p class="art-note"><?= wp_kses_post($note_text); ?></p>
  </div>

  <div class="scroll-note">Scroll para descubrir <span>↓</span></div>
</section>
