<?php
/**
* Theme functions and definitions
*
* @package Sprava WordPress
*/

// Připojení stylů a skriptů
function enqueue_child_theme_styles() {
    // Připojení stylu z hlavního tématu
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');

    // Připojení JavaScriptu z hlavního adresáře child šablony
    wp_enqueue_script('child-app', get_stylesheet_directory_uri() . '/app.js', array('jquery'), '1.0', true);
    
    // Připojení vlastního stylu pro child téma
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));
}
add_action('wp_enqueue_scripts', 'enqueue_child_theme_styles');
