import Swiper, { Navigation, Pagination } from 'swiper'
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/effect-fade';

function reviews() {
  const slider = new Swiper('.reviews-wrapper .swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 3,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: '.reviews-wrapper .swiper-button-next',
      prevEl: '.reviews-wrapper .swiper-button-prev',
    },
    pagination: {
      el: '.reviews-wrapper .swiper-pagination',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

reviews();
