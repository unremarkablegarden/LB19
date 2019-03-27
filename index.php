<?php

if (!class_exists("Wordless")) {
  echo "Error: Wordless plugin missing";
  die();
}

global $post;

function if_post_type($type) {
  return get_post_type() == $type;
}

if ( is_404() ) {
  render_view("pages/404");
}
else {
  if ( is_front_page() ) {
    render_view("pages/frontpage");
  } else if ( if_post_type('artists') ) {
    render_view("posts/artist");
  } else if (is_single()) {
    render_view("posts/single");
  } else if (is_archive()) {
    render_view("posts/archive");
  } else if (is_page()) {
    render_view("pages/page");
  }
}

