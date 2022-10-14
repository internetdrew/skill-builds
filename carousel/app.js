'use strict';

const carouselSlider = document.getElementById('carousel-slider');
const carouselImages = document.querySelectorAll('.carousel-slider img');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentSlide = 1;
const imgWidth = carouselImages[0].clientWidth;

carouselSlider.style.transform = `translateX(-${imgWidth}px)`;

nextBtn.addEventListener('click', () => {
  if (currentSlide < carouselImages.length - 1) {
    currentSlide++;
    carouselSlider.style.transform = `translateX(-${
      imgWidth * currentSlide
    }px)`;
    console.log(currentSlide, carouselSlider);
  }
});

// prevBtn.addEventListener('click', () => {
//   if (currentSlide > -1) {
//     currentSlide--;
//     carousel.style.transform = ``;
//   }
// });
