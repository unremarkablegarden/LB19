<?php

// This function include screen.css in wp_head() function

function enqueue_stylesheets() {
  wp_register_style("screen", stylesheet_url("screen"), false, false);
  wp_enqueue_style("screen");

  wp_register_style("icons", 'https://cdnjs.cloudflare.com/ajax/libs/simple-line-icons/2.4.1/css/simple-line-icons.css', false, false);
  wp_enqueue_style("icons");

  wp_register_style("slick", 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css', false, false);
  wp_enqueue_style("slick");


  wp_register_style("slick-theme", 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css', false, false);
  wp_enqueue_style("slick-theme");
  
}

add_action('wp_enqueue_scripts', 'enqueue_stylesheets');

// This function include jquery and application.js in wp_footer() function

function enqueue_javascripts() {
  wp_enqueue_script("jquery");
  
  wp_register_script("barba", "https://cdnjs.cloudflare.com/ajax/libs/barba.js/1.0.0/barba.min.js", '', false, true);
  wp_enqueue_script("barba");

  wp_register_script("slick", "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js", '', false, true);
  wp_enqueue_script("slick");
  

  wp_register_script("application", javascript_url("application"), '', false, true);
  wp_enqueue_script("application");
}

add_action('wp_enqueue_scripts', 'enqueue_javascripts');
