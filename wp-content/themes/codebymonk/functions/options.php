<?php

if (!function_exists('acf_add_options_page')) {
	return;
}

// Página principal de Opciones
acf_add_options_page([
	'page_title' => __('Global Settings', 'codebymonk'),
	'menu_title' => __('Global Settings', 'codebymonk'),
	'menu_slug'  => 'theme-general-options',
	'capability' => 'edit_posts',
	'redirect'   => true,
	'icon_url'   => 'dashicons-admin-site',
	'position'   => 58,
]);

// Subpáginas (solo agrega el título a la lista para registrar nuevas)
$sub_pages = [
	'Menu Options',
	'Global Settings',
	'External Scripts',
	'404 Page',
];

foreach ($sub_pages as $title) {
	acf_add_options_sub_page([
		'page_title'  => __($title, 'codebymonk'),
		'menu_title'  => __($title, 'codebymonk'),
		'parent_slug' => 'theme-general-options',
	]);
}

