<?php

/**
 * Obtiene las clases, ID y atributos estándar de un bloque ACF.
 *
 * @param array $block El arreglo $block proporcionado por ACF.
 * @param string|array $extra_classes Clases adicionales opcionales.
 * @return array
 */
function cbm_get_block_attributes(array $block, $extra_classes = []): array {
	$name    = str_replace('acf/', '', $block['name'] ?? '');
	$id      = get_field('block_id') ?: ($block['anchor'] ?? ($block['id'] ?? uniqid('block-')));
	$padding = (array) get_field('padding_options');
	$margin  = (array) get_field('margin_options');
	$bg      = get_field('block_background');

	// Mapeo declarativo de clases (array_filter elimina los valores vacíos automáticamente)
	$classes = array_merge(
		[
			'block-' . $name,
			$block['className'] ?? '',
			!empty($block['align']) ? 'align' . $block['align'] : '',
			!empty($padding['padding_top']) ? 'pt-' . $padding['padding_top'] : '',
			!empty($padding['padding_bottom']) ? 'pb-' . $padding['padding_bottom'] : '',
			!empty($margin['margin_top']) ? 'mt-' . $margin['margin_top'] : '',
			!empty($margin['margin_bottom']) ? 'mb-' . $margin['margin_bottom'] : '',
			$bg ? 'bg-' . $bg : '',
		],
		is_array($extra_classes) ? $extra_classes : preg_split('/\s+/', trim((string) $extra_classes), -1, PREG_SPLIT_NO_EMPTY)
	);

	$id_attr    = esc_attr($id);
	$name_attr  = esc_attr($name);
	$class_attr = esc_attr(implode(' ', array_unique(array_filter($classes))));

	return [
		'id'         => $id_attr,
		'name'       => $name_attr,
		'class'      => $class_attr,
		'attributes' => sprintf('id="%s" data-block="%s" class="%s"', $id_attr, $name_attr, $class_attr),
	];
}

/**
 * Devuelve la cadena lista de atributos HTML para el contenedor del bloque.
 * Ejemplo: <section <?= cbm_block_attributes($block); ?>>
 *
 * @param array $block
 * @param string|array $extra_classes
 * @return string
 */
function cbm_block_attributes(array $block, $extra_classes = []): string {
	$data = cbm_get_block_attributes($block, $extra_classes);
	return $data['attributes'];
}

/**
 * Registro dinámico y automático de bloques ACF.
 * Escanea la carpeta `blocks/` automáticamente (omitiendo template.php y archivos con _).
 */
function register_acf_block_types() {
	$blocks_dir = get_template_directory() . '/blocks';

	if (!is_dir($blocks_dir)) {
		return;
	}

	$files = glob($blocks_dir . '/*.php');

	foreach ($files as $file) {
		$slug = basename($file, '.php');

		// Omitir plantillas base o parciales (ej. template.php o _partial.php)
		if ($slug === 'template' || str_starts_with($slug, '_')) {
			continue;
		}

		// Generar título legible (hero -> Hero, cta-label -> Cta Label)
		$title = ucwords(str_replace(['-', '_'], ' ', $slug));

		$block_data = [
			'name'            => $slug,
			'title'           => __($title, 'codebymonk'),
			'description'     => __($title, 'codebymonk'),
			'render_template' => "blocks/{$slug}.php",
			'category'        => 'common',
			'icon'            => 'editor-alignleft',
			'keywords'        => [$slug],
			'supports'        => [
				'align'  => false,
				'anchor' => true,
			],
		];

		// Auto-detectar JS específico del bloque (prioriza build sobre src)
		$js_path = file_exists(get_template_directory() . "/assets/build/{$slug}.js")
			? "/assets/build/{$slug}.js"
			: (file_exists(get_template_directory() . "/assets/js/{$slug}.js") ? "/assets/js/{$slug}.js" : null);

		if ($js_path) {
			$handle = "block-{$slug}";
			wp_register_script(
				$handle,
				get_template_directory_uri() . $js_path,
				['theme-defer'], // Dependencia: garantiza que GSAP y main.js estén listos
				filemtime(get_template_directory() . $js_path),
				true
			);
			$block_data['enqueue_script'] = get_template_directory_uri() . $js_path;
		}

		// Auto-detectar CSS específico si existiera en assets/css/{slug}.css o assets/build/{slug}.css
		$css_path = file_exists(get_template_directory() . "/assets/build/{$slug}.css")
			? "/assets/build/{$slug}.css"
			: (file_exists(get_template_directory() . "/assets/css/{$slug}.css") ? "/assets/css/{$slug}.css" : null);

		if ($css_path) {
			$block_data['enqueue_style'] = get_template_directory_uri() . $css_path;
		}

		acf_register_block_type($block_data);
	}
}

if (function_exists('acf_register_block_type')) {
	add_action('acf/init', 'register_acf_block_types');
}

