import Swiper, { Thumbs, EffectFade, Navigation, Pagination } from 'swiper'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/effect-fade';
import { Fancybox } from "@fancyapps/ui";


Fancybox.bind('a[preview]', {
  groupAll: true,
  on: {
    ready: () => {
      setTimeout(() => {
        document
          .querySelector('.fancybox__track')
          .setAttribute(
            'style',
            'transform: translate3d(0px, 0px, 0px) scale(1);'
          )
      }, 0)
    },
  },
})

var thumbs = new Swiper('.thumbs', {
  spaceBetween: 16,
  slidesPerView: 'auto',
  slideToClickedSlide: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  // Vertical view
  direction: 'vertical',
})

var previews = new Swiper('.previews', {
  modules: [Thumbs, EffectFade, Navigation, Pagination],
  effect: 'fade',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumbs: {
    swiper: thumbs,
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
})
