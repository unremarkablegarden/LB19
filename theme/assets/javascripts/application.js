import Macy from 'macy'
import * as clipboard from "clipboard-polyfill/build/clipboard-polyfill.promise"
import Swal from 'sweetalert2'

console.log('=== LB19 application.js ===')

const barba = () => {
  console.log('barba.js init')
  
  var HideShowTransition = Barba.BaseTransition.extend({
    start: function() {
      $('#menu').addClass('hide')
      $('.menu-button').fadeIn(500)
      $('body').addClass('loading')
      this.newContainerLoading.then(this.finish.bind(this));
    },
  
    finish: function() {
      document.body.scrollTop = 0;
      this.done();
      $('body').removeClass('loading')
      // scrollRight()
      reboot()
    }
  });

  Barba.Pjax.getTransition = function() {
    return HideShowTransition;
  };

  Barba.Pjax.start()
}

const activeArtist = () => {
  const name = $('post .artist').data('name')
  $('.artists .is-active').removeClass('is-active')
  $('.artists').find('.artist[data-name="'+ name +'"]').addClass('is-active')
  $('.artists a').on('click', function(){
    $('.artists .is-active').removeClass('is-active')
    $(this).parent().addClass('is-active')
  })
}

const loadRandomArtist = () => {
  const n = $('.artists .artist').length - 1
  const r = Math.floor(Math.random() * n)
  console.log('randomly load artist #' + r)
  const href = $('.artists .artist:eq('+r+') a').attr('href')
  window.location.href = href
}

const bannerSlider = () => {
  $('.banners').slick({
    speed: 3000,
    autoplaySpeed: 5000,
    fade: true,
    autoplay: true,
    arrows: false,
    draggable: false,
    pauseOnFocus: false,
    pauseOnHover: false,
  })
}

const newOnLBSlider = () => {
  $('.new-artists-slider').slick({
    speed: 700,
    autoplaySpeed: 5000,
    // fade: true,
    autoplay: true,
    arrows: false,
    dots: true,
    draggable: false,
    // appendDots: $('.new-artists .dots')
    // pauseOnFocus: false,
    // pauseOnHover: false,
  })
}

const masonry = () => {
  console.log('Macy')
  const macy = Macy({
    container: '#macy-container',
    trueOrder: true,
    waitForImages: false,
    margin: 10,
    columns: 3,
    breakAt: {
        1200: 3,
        940: 3,
        520: 2,
        400: 1
    }
  })
}

const moreButton = () => {
  $('button.more').on('click', function(){
    $(this).hide()
    $('.gradient').hide()
    $('.fold').css('height', 'auto')
  })
}

const randomArtistClick = () => {
  $('.littlebig a').on('click', function(e) {
    loadRandomArtist()
    e.preventDefault()
  })
}

const linkCopy = () => {
  $('a.copy').on('click', function(e) {
    console.log('copy to clipboard')
    var email = $(this).data('email')
    clipboard.writeText(email)

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000
    })

    Toast.fire({
      type: 'success',
      title: email,
      text: 'Copied to clipboard'
    })
    
    e.preventDefault()
  }) 
}

const menu = () => {
  
  $('.menu-button').on('click', function(e) {
    showMenu()
    e.preventDefault()
  })
  $('#menu .close').on('click', function(e) {
    closeMenu()
    e.preventDefault()
  })

  const showMenu = () => {
    $('#menu').removeClass('hide')
    $('.menu-button').fadeOut(500)
  }
  const closeMenu = () => {
    $('#menu').addClass('hide')
    $('.menu-button').fadeIn(500)
  }

  $('.menu-item a').on('click', function(){
    closeMenu()
  })
}

const scrollRight = () => {
  $('.artist a, .menu-item a').on('click', function(){
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width
    if (width > 768 && width <= 1024) {
      $('body').animate({ scrollLeft: (width/2) }, 600, 'swing')
    } else if (width <= 768) {
      $('body').animate({ scrollLeft: (width) }, 600, 'swing')
    }
  })

  $('a.back-arrow').on('click', function(e){
    $('body').animate({ scrollLeft: 0 }, 600, 'swing')
    e.preventDefault()
  })
}

const bootstrap = () => {
  barba()
  menu()
  activeArtist()
  if ($('body').hasClass('home')) {  loadRandomArtist() }
  bannerSlider()
  newOnLBSlider()
  masonry()
  moreButton()
  randomArtistClick()
  linkCopy()
  scrollRight()
}

const reboot = () => {
  linkCopy()
}

bootstrap()