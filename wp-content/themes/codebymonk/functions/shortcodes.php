<?php

/**
 * Shortcode: [button] o [btn]
 *
 * Ejemplos:
 * [button url="/contacto" variant="primary" size="lg"]Contáctanos[/button]
 * [button text="Ver más" url="/servicios" variant="outline" target="_blank"]
 */
function cbm_button_shortcode($atts, $content = null) {
	$a = shortcode_atts(
		[
			'text'    => '',
			'url'     => '#',
			'target'  => '_self',
			'variant' => 'primary',
			'size'    => 'md',
			'class'   => '',
		],
		$atts,
		'button'
	);

	// Usar el contenido encerrado si existe, o el atributo text
	$label = !empty($content) ? $content : (!empty($a['text']) ? $a['text'] : __('Click aquí', 'codebymonk'));

	// Clases base y variantes con soporte Tailwind
	$classes = [
		'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none cursor-pointer',
		'btn',
		'btn-' . sanitize_html_class($a['variant']),
		'btn-' . sanitize_html_class($a['size']),
	];

	if (!empty($a['class'])) {
		$classes[] = sanitize_text_field($a['class']);
	}

	$class_attr  = esc_attr(implode(' ', array_filter($classes)));
	$url_attr    = esc_url($a['url']);
	$target_attr = esc_attr($a['target']);
	$rel_attr    = ($target_attr === '_blank') ? ' rel="noopener noreferrer"' : '';

	return sprintf(
		'<a href="%s" target="%s"%s class="%s">%s</a>',
		$url_attr,
		$target_attr,
		$rel_attr,
		$class_attr,
		wp_kses_post(do_shortcode($label))
	);
}
add_shortcode('button', 'cbm_button_shortcode');
add_shortcode('btn', 'cbm_button_shortcode');

/**
 * Shortcode: [year]
 * Devuelve el año actual dinámicamente (útil para copyright en el footer)
 */
function cbm_current_year_shortcode() {
	return esc_html(date_i18n('Y'));
}
add_shortcode('year', 'cbm_current_year_shortcode');

/**
 * Shortcode: [carousel id="123" size="normal"]
 */
function cbm_carousel_shortcode($atts) {
	$a = shortcode_atts(
		[
			'id'   => 0,
			'size' => 'normal',
		],
		$atts,
		'carousel'
	);

	$post_id = intval($a['id']);
	if (!$post_id) {
		return '';
	}

	$size_class = sanitize_html_class($a['size']);
	$output = '';

	if (have_rows('carousel_images', $post_id)) {
		$output .= '<div class="inline-carousel carousels relative overflow-hidden">';
		while (have_rows('carousel_images', $post_id)) {
			the_row();
			$image = get_sub_field('image');

			if (!empty($image['url'])) {
				$output .= sprintf(
					'<div class="carousel-item carousel-%s bg-cover bg-center" style="background-image: url(\'%s\');" role="img" aria-label="%s"></div>',
					esc_attr($size_class),
					esc_url($image['url']),
					esc_attr($image['alt'] ?? '')
				);
			}
		}
		$output .= '</div>';
	}

	return $output;
}
add_shortcode('carousel', 'cbm_carousel_shortcode');

