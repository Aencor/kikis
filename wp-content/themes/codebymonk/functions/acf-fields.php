<?php
/**
 * Programmatic ACF Field Groups for all Gutenberg Blocks
 */

if (function_exists('acf_add_local_field_group')) {
    add_action('acf/init', function() {

        // ==========================================
        // 1. HERO BLOCK
        // ==========================================
        acf_add_local_field_group([
            'key' => 'group_block_hero',
            'title' => 'Bloque: Hero',
            'fields' => [
                [
                    'key' => 'field_hero_tab_content',
                    'label' => 'Contenido',
                    'type' => 'tab',
                ],
                [
                    'key' => 'field_hero_eyebrow',
                    'label' => 'Eyebrow / Subtítulo superior',
                    'name' => 'eyebrow',
                    'type' => 'text',
                    'default_value' => 'Agencia creativa & digital',
                ],
                [
                    'key' => 'field_hero_title',
                    'label' => 'Título Principal (HTML permitido ej. <em>garra.</em>)',
                    'name' => 'title_main',
                    'type' => 'textarea',
                    'rows' => 3,
                    'default_value' => "Ideas con <em>garra.</em><br />Marcas que dejan huella.",
                ],
                [
                    'key' => 'field_hero_intro',
                    'label' => 'Párrafo de Introducción',
                    'name' => 'intro',
                    'type' => 'textarea',
                    'rows' => 3,
                    'default_value' => 'Estrategia, creatividad y mucho instinto para que tu marca no solo se vea bonita: que conecte, crezca y venda.',
                ],
                [
                    'key' => 'field_hero_note',
                    'label' => 'Texto Nota de Arte',
                    'name' => 'note_text',
                    'type' => 'text',
                    'default_value' => 'Curiosidad estratégica<br />desde 2020',
                ],
                [
                    'key' => 'field_hero_tab_buttons',
                    'label' => 'Botones y Enlaces',
                    'type' => 'tab',
                ],
                [
                    'key' => 'field_hero_btn_work_text',
                    'label' => 'Texto Botón Portafolio',
                    'name' => 'btn_work_text',
                    'type' => 'text',
                    'default_value' => 'Ver nuestro trabajo',
                    'wrapper' => ['width' => '50'],
                ],
                [
                    'key' => 'field_hero_btn_work_link',
                    'label' => 'Enlace Botón Portafolio',
                    'name' => 'btn_work_link',
                    'type' => 'text',
                    'default_value' => '#portafolio',
                    'wrapper' => ['width' => '50'],
                ],
                [
                    'key' => 'field_hero_btn_contact_text',
                    'label' => 'Texto Enlace Contacto',
                    'name' => 'btn_contact_text',
                    'type' => 'text',
                    'default_value' => 'Cuéntanos tu idea',
                    'wrapper' => ['width' => '50'],
                ],
                [
                    'key' => 'field_hero_btn_contact_link',
                    'label' => 'Enlace Contacto',
                    'name' => 'btn_contact_link',
                    'type' => 'text',
                    'default_value' => '#contacto',
                    'wrapper' => ['width' => '50'],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/hero',
                    ],
                ],
            ],
        ]);

        // ==========================================
        // 2. MARQUEE BLOCK
        // ==========================================
        acf_add_local_field_group([
            'key' => 'group_block_marquee',
            'title' => 'Bloque: Marquee (Cinta Infinita)',
            'fields' => [
                [
                    'key' => 'field_marquee_items',
                    'label' => 'Palabras Clave',
                    'name' => 'marquee_items',
                    'type' => 'repeater',
                    'layout' => 'table',
                    'button_label' => 'Agregar Palabra',
                    'sub_fields' => [
                        [
                            'key' => 'field_marquee_item_text',
                            'label' => 'Texto',
                            'name' => 'text',
                            'type' => 'text',
                            'default_value' => 'CREATIVIDAD',
                        ],
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/marquee',
                    ],
                ],
            ],
        ]);

        // ==========================================
        // 3. SERVICES BLOCK
        // ==========================================
        acf_add_local_field_group([
            'key' => 'group_block_services',
            'title' => 'Bloque: Servicios',
            'fields' => [
                [
                    'key' => 'field_services_kicker',
                    'label' => 'Kicker / Categoría',
                    'name' => 'services_kicker',
                    'type' => 'text',
                    'default_value' => 'Lo que hacemos',
                ],
                [
                    'key' => 'field_services_heading',
                    'label' => 'Título de la Sección',
                    'name' => 'services_heading',
                    'type' => 'text',
                    'default_value' => 'Todo lo que tu marca necesita para sacar las uñas.',
                ],
                [
                    'key' => 'field_services_description',
                    'label' => 'Descripción',
                    'name' => 'services_description',
                    'type' => 'textarea',
                    'rows' => 3,
                    'default_value' => 'No hacemos ruido porque sí. Creamos estrategias con intención y diseños que se recuerdan.',
                ],
                [
                    'key' => 'field_services_list',
                    'label' => 'Listado de Servicios',
                    'name' => 'services_list',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Agregar Servicio',
                    'sub_fields' => [
                        [
                            'key' => 'field_service_number',
                            'label' => 'Número (ej. 01)',
                            'name' => 'number',
                            'type' => 'text',
                            'wrapper' => ['width' => '20'],
                        ],
                        [
                            'key' => 'field_service_title',
                            'label' => 'Título del Servicio',
                            'name' => 'title',
                            'type' => 'text',
                            'wrapper' => ['width' => '40'],
                        ],
                        [
                            'key' => 'field_service_tags',
                            'label' => 'Tags (separados por coma)',
                            'name' => 'tags',
                            'type' => 'text',
                            'wrapper' => ['width' => '40'],
                        ],
                        [
                            'key' => 'field_service_text',
                            'label' => 'Descripción del Servicio',
                            'name' => 'text',
                            'type' => 'textarea',
                            'rows' => 2,
                        ],
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/services',
                    ],
                ],
            ],
        ]);

        // ==========================================
        // 4. PORTFOLIO BLOCK
        // ==========================================
        acf_add_local_field_group([
            'key' => 'group_block_portfolio',
            'title' => 'Bloque: Portafolio',
            'fields' => [
                [
                    'key' => 'field_portfolio_kicker',
                    'label' => 'Kicker',
                    'name' => 'portfolio_kicker',
                    'type' => 'text',
                    'default_value' => 'Portafolio seleccionado',
                ],
                [
                    'key' => 'field_portfolio_heading',
                    'label' => 'Título de la Sección',
                    'name' => 'portfolio_heading',
                    'type' => 'text',
                    'default_value' => 'Trabajo que<br /><em>nos hace ronronear.</em>',
                ],
                [
                    'key' => 'field_portfolio_all_text',
                    'label' => 'Texto Enlace "Ver todos"',
                    'name' => 'portfolio_all_text',
                    'type' => 'text',
                    'default_value' => 'Ver todos los proyectos',
                    'wrapper' => ['width' => '50'],
                ],
                [
                    'key' => 'field_portfolio_all_link',
                    'label' => 'URL Enlace "Ver todos"',
                    'name' => 'portfolio_all_link',
                    'type' => 'text',
                    'default_value' => '#contacto',
                    'wrapper' => ['width' => '50'],
                ],
                [
                    'key' => 'field_portfolio_items',
                    'label' => 'Proyectos',
                    'name' => 'portfolio_items',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Agregar Proyecto',
                    'sub_fields' => [
                        [
                            'key' => 'field_project_client',
                            'label' => 'Cliente',
                            'name' => 'client',
                            'type' => 'text',
                            'wrapper' => ['width' => '30'],
                        ],
                        [
                            'key' => 'field_project_category',
                            'label' => 'Categoría (ej. Branding · Social)',
                            'name' => 'category',
                            'type' => 'text',
                            'wrapper' => ['width' => '35'],
                        ],
                        [
                            'key' => 'field_project_layout',
                            'label' => 'Tamaño / Diseño',
                            'name' => 'className',
                            'type' => 'select',
                            'choices' => [
                                'project project-large' => 'Grande (1.3 ratio)',
                                'project project-small' => 'Pequeño vertical (0.86 ratio)',
                                'project project-wide'  => 'Ancho horizontal (2.0 ratio)',
                            ],
                            'default_value' => 'project project-large',
                            'wrapper' => ['width' => '35'],
                        ],
                        [
                            'key' => 'field_project_title',
                            'label' => 'Título del Proyecto',
                            'name' => 'title',
                            'type' => 'text',
                            'wrapper' => ['width' => '50'],
                        ],
                        [
                            'key' => 'field_project_image',
                            'label' => 'Imagen del Proyecto (o URL)',
                            'name' => 'image',
                            'type' => 'image',
                            'return_format' => 'url',
                            'wrapper' => ['width' => '50'],
                        ],
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/portfolio',
                    ],
                ],
            ],
        ]);

        // ==========================================
        // 5. RESULTS BLOCK
        // ==========================================
        acf_add_local_field_group([
            'key' => 'group_block_results',
            'title' => 'Bloque: Casos de Éxito y Testimonios',
            'fields' => [
                [
                    'key' => 'field_results_kicker',
                    'label' => 'Kicker',
                    'name' => 'results_kicker',
                    'type' => 'text',
                    'default_value' => 'Casos de éxito',
                ],
                [
                    'key' => 'field_results_heading',
                    'label' => 'Título Principal',
                    'name' => 'results_heading',
                    'type' => 'text',
                    'default_value' => 'Menos miau.<br /><em>Más resultados.</em>',
                ],
                [
                    'key' => 'field_results_intro',
                    'label' => 'Introducción',
                    'name' => 'results_intro',
                    'type' => 'textarea',
                    'rows' => 3,
                    'default_value' => 'Nos encanta una idea brillante, pero nos gustan aún más los números que demuestran que funciona.',
                ],
                [
                    'key' => 'field_results_cta_text',
                    'label' => 'Texto Botón CTA',
                    'name' => 'results_cta_text',
                    'type' => 'text',
                    'default_value' => 'Quiero esos resultados',
                    'wrapper' => ['width' => '50'],
                ],
                [
                    'key' => 'field_results_cta_link',
                    'label' => 'Enlace Botón CTA',
                    'name' => 'results_cta_link',
                    'type' => 'text',
                    'default_value' => '#contacto',
                    'wrapper' => ['width' => '50'],
                ],
                [
                    'key' => 'field_results_testimonials',
                    'label' => 'Casos / Testimonios',
                    'name' => 'testimonials',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Agregar Testimonio',
                    'sub_fields' => [
                        [
                            'key' => 'field_testi_brand',
                            'label' => 'Marca / Cliente',
                            'name' => 'brand',
                            'type' => 'text',
                            'wrapper' => ['width' => '50'],
                        ],
                        [
                            'key' => 'field_testi_year',
                            'label' => 'Año',
                            'name' => 'year',
                            'type' => 'text',
                            'default_value' => '2024',
                            'wrapper' => ['width' => '50'],
                        ],
                        [
                            'key' => 'field_testi_quote',
                            'label' => 'Cita / Testimonio',
                            'name' => 'quote',
                            'type' => 'textarea',
                            'rows' => 2,
                        ],
                        [
                            'key' => 'field_testi_name',
                            'label' => 'Nombre del Autor',
                            'name' => 'name',
                            'type' => 'text',
                            'wrapper' => ['width' => '40'],
                        ],
                        [
                            'key' => 'field_testi_role',
                            'label' => 'Cargo / Rol',
                            'name' => 'role',
                            'type' => 'text',
                            'wrapper' => ['width' => '40'],
                        ],
                        [
                            'key' => 'field_testi_initials',
                            'label' => 'Iniciales (Avatar)',
                            'name' => 'initials',
                            'type' => 'text',
                            'wrapper' => ['width' => '20'],
                        ],
                        [
                            'key' => 'field_testi_m1_val',
                            'label' => 'Métrica 1 (Valor ej. +214%)',
                            'name' => 'metric_1_val',
                            'type' => 'text',
                            'wrapper' => ['width' => '16'],
                        ],
                        [
                            'key' => 'field_testi_m1_lbl',
                            'label' => 'Métrica 1 (Etiqueta)',
                            'name' => 'metric_1_lbl',
                            'type' => 'text',
                            'wrapper' => ['width' => '17'],
                        ],
                        [
                            'key' => 'field_testi_m2_val',
                            'label' => 'Métrica 2 (Valor ej. 4.8×)',
                            'name' => 'metric_2_val',
                            'type' => 'text',
                            'wrapper' => ['width' => '16'],
                        ],
                        [
                            'key' => 'field_testi_m2_lbl',
                            'label' => 'Métrica 2 (Etiqueta)',
                            'name' => 'metric_2_lbl',
                            'type' => 'text',
                            'wrapper' => ['width' => '17'],
                        ],
                        [
                            'key' => 'field_testi_m3_val',
                            'label' => 'Métrica 3 (Valor ej. +38K)',
                            'name' => 'metric_3_val',
                            'type' => 'text',
                            'wrapper' => ['width' => '16'],
                        ],
                        [
                            'key' => 'field_testi_m3_lbl',
                            'label' => 'Métrica 3 (Etiqueta)',
                            'name' => 'metric_3_lbl',
                            'type' => 'text',
                            'wrapper' => ['width' => '18'],
                        ],
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/results',
                    ],
                ],
            ],
        ]);

        // ==========================================
        // 6. PROCESS BLOCK
        // ==========================================
        acf_add_local_field_group([
            'key' => 'group_block_process',
            'title' => 'Bloque: Proceso de Trabajo',
            'fields' => [
                [
                    'key' => 'field_process_kicker',
                    'label' => 'Kicker',
                    'name' => 'process_kicker',
                    'type' => 'text',
                    'default_value' => 'Cómo trabajamos',
                ],
                [
                    'key' => 'field_process_heading',
                    'label' => 'Título Principal',
                    'name' => 'process_heading',
                    'type' => 'text',
                    'default_value' => 'Curiosas por naturaleza.<br />Estratégicas por elección.',
                ],
                [
                    'key' => 'field_process_steps',
                    'label' => 'Pasos del Proceso',
                    'name' => 'process_steps',
                    'type' => 'repeater',
                    'layout' => 'block',
                    'button_label' => 'Agregar Paso',
                    'sub_fields' => [
                        [
                            'key' => 'field_step_number',
                            'label' => 'Número (ej. 01)',
                            'name' => 'number',
                            'type' => 'text',
                            'wrapper' => ['width' => '25'],
                        ],
                        [
                            'key' => 'field_step_title',
                            'label' => 'Título del Paso',
                            'name' => 'title',
                            'type' => 'text',
                            'wrapper' => ['width' => '75'],
                        ],
                        [
                            'key' => 'field_step_text',
                            'label' => 'Descripción',
                            'name' => 'text',
                            'type' => 'textarea',
                            'rows' => 2,
                        ],
                    ],
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/process',
                    ],
                ],
            ],
        ]);

        // ==========================================
        // 7. CONTACT BLOCK
        // ==========================================
        acf_add_local_field_group([
            'key' => 'group_block_contact',
            'title' => 'Bloque: Contacto',
            'fields' => [
                [
                    'key' => 'field_contact_kicker',
                    'label' => 'Kicker',
                    'name' => 'contact_kicker',
                    'type' => 'text',
                    'default_value' => '¿Tienes un proyecto?',
                ],
                [
                    'key' => 'field_contact_heading',
                    'label' => 'Título Principal',
                    'name' => 'contact_heading',
                    'type' => 'text',
                    'default_value' => 'Hagamos algo<br /><em>inolvidable.</em>',
                ],
                [
                    'key' => 'field_contact_desc',
                    'label' => 'Descripción',
                    'name' => 'contact_desc',
                    'type' => 'textarea',
                    'rows' => 3,
                    'default_value' => 'Cuéntanos qué tienes en mente. Prometemos responder antes de gastar nuestras siete vidas.',
                ],
                [
                    'key' => 'field_contact_email',
                    'label' => 'Email de Contacto',
                    'name' => 'contact_email',
                    'type' => 'text',
                    'default_value' => 'hola@kikismarketing.com',
                ],
                [
                    'key' => 'field_contact_services_options',
                    'label' => 'Opciones del Select de Servicios (separados por coma o salto de línea)',
                    'name' => 'contact_services_options',
                    'type' => 'textarea',
                    'rows' => 4,
                    'default_value' => "Estrategia digital\nSocial media\nIdentidad de marca\nWeb & e-commerce",
                ],
            ],
            'location' => [
                [
                    [
                        'param' => 'block',
                        'operator' => '==',
                        'value' => 'acf/contact',
                    ],
                ],
            ],
        ]);

    });
}
