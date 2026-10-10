<?php

function theme_scripts() {
	if (is_single() && comments_open() && get_option("thread_comments")) {
		wp_enqueue_script("comment-reply");
	}

	// Font Awesome 6 CDN
	wp_enqueue_style(
		"font-awesome",
		"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css",
		[],
		"6.6.0",
		"all"
	);

	// Main Style
	wp_enqueue_style(
		"master",
		get_template_directory_uri() . "/assets/build/style.css",
		['font-awesome'],
		"1.1",
		"all"
	);

	// Main JavaScript (GSAP, Router, etc.)
	wp_register_script(
		"theme-defer",
		get_template_directory_uri() . "/assets/build/main.js",
		['jquery'],
		'1.0.1',
		true // Cargar en el footer
	);
	wp_enqueue_script("theme-defer");
}

add_action("wp_enqueue_scripts", "theme_scripts", 9999);

