<?php
/**
 * Main Template / Fallback Front Page
 */
get_header(); ?>

<main class="global-main" id="main-content">
  <?php 
  if (have_posts()) :
    while (have_posts()) : the_post();
      $content = get_the_content();
      if (!empty(trim($content))) :
        the_content();
      else :
        // Render default Figma blocks if page content is empty
        get_template_part('blocks/hero');
        get_template_part('blocks/marquee');
        get_template_part('blocks/services');
        get_template_part('blocks/portfolio');
        get_template_part('blocks/results');
        get_template_part('blocks/process');
        get_template_part('blocks/contact');
      endif;
    endwhile;
  else :
    get_template_part('blocks/hero');
    get_template_part('blocks/marquee');
    get_template_part('blocks/services');
    get_template_part('blocks/portfolio');
    get_template_part('blocks/results');
    get_template_part('blocks/process');
    get_template_part('blocks/contact');
  endif;
  ?>
</main>

<?php get_footer(); ?>
