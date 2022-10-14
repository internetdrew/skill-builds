'use strict';

const carouselSlider = document.getElementById('carousel-slider');
const carouselImages = document.querySelectorAll('.carousel-slider img');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentSlide = 1;
const size = carouselImages[0].clientWidth;

let pixelOffset = size * currentSlide;
console.log(pixelOffset);

carouselSlider.style.transform = `translateX(-${size * currentSlide}px)`;

nextBtn.addEventListener('click', () => {
  carouselSlider.style.transition = 'transform 0.3s ease-in-out';
  currentSlide++;
  carouselSlider.style.transform = `translateX(-${pixelOffset})px`;
  console.log(pixelOffset, carouselSlider);
});
console.log(carouselSlider);
