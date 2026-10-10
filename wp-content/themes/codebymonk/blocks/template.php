<?php
/**
 * Block Template Boilerplate
 *
 * Puedes usar `cbm_block_attributes($block)` para renderizar los atributos automáticamente,
 * o `$b = cbm_get_block_attributes($block)` si necesitas acceder a $b['id'], $b['name'] o $b['class'] por separado.
 */
$block_attrs = cbm_block_attributes($block);
?>

<section <?= $block_attrs; ?>>
	<div class="container">
		<!-- Block content goes here -->
	</div>
</section>

