<?php
class Helpers {

  function d($v) {
    return "<xmp>".print_r($v)."</xmp>";
  }

  function youtube($link) {
    if (strpos($link,'.be') !== false) {
      $embed = preg_replace("/\s*[a-zA-Z\/\/:\.]*youtu.be\/([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i", "<div class=\"embed-container\"><iframe src=\"//www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe></div>", $link);
    }
    else {
      $embed = preg_replace("/\s*[a-zA-Z\/\/:\.]*youtube.com\/watch\?v=([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i", "<div class=\"embed-container\"><iframe src=\"//www.youtube.com/embed/$1\" frameborder=\"0\" allowfullscreen></iframe></div>", $link);
    }

    return $embed;
  }

  function soundcloud($link) {
    $url = $link;
    $getValues = file_get_contents('http://soundcloud.com/oembed?format=js&url='.$url.'&iframe=true');
    $decodeiFrame=substr($getValues, 1, -2);
    $jsonObj = json_decode($decodeiFrame);
    
    return $jsonObj->html;
  }

  function vimeo($link) {
    // https://vimeo.com/84420787

    $embed = preg_replace("/\s*[a-zA-Z\/\/:\.]*vimeo.com\/([a-zA-Z0-9\-_]+)([a-zA-Z0-9\/\*\-\_\?\&\;\%\=\.]*)/i", "<div style=\"padding:56.25% 0 0 0;position:relative;\"><iframe src=\"//player.vimeo.com/video/$1?color=ffffff&portrait=0\" style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><script src=\"https://player.vimeo.com/api/player.js\"></script>", $link);

    // <div style=\"padding:56.25% 0 0 0;position:relative;\"><iframe src=\"//player.vimeo.com/video/$1?color=ffffff&portrait=0\" style=\"position:absolute;top:0;left:0;width:100%;height:100%;\" frameborder=\"0\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><script src=\"https://player.vimeo.com/api/player.js\"></script>

    // $embed = 'test';
    return $embed;
  }

}
Wordless::register_helper("Helpers");
?>