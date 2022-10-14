'use strict';

const carouselSlider = document.getElementById('carousel-slider');
const carouselImages = document.querySelectorAll('.carousel-slider img');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentSlide = 1;
const imgWidth = carouselImages[0].clientWidth;

carouselSlider.style.transform = `translateX(-${imgWidth}px)`;

nextBtn.addEventListener('click', () => {
  carouselSlider.style.transition = 'transform 0.3s ease-in-out';
  currentSlide++;
  carouselSlider.style.transform = `translateX(-${imgWidth * currentSlide}px)`;
});

prevBtn.addEventListener('click', () => {
  carouselSlider.style.transition = 'transform 0.3s ease-in-out';
  currentSlide--;
  carouselSlider.style.transform = `translateX(${-imgWidth * currentSlide}px)`;
});

carouselSlider.addEventListener('transitionend', () => {
  if (carouselImages[currentSlide].id === 'last-clone') {
    carouselSlider.style.transition = 'none';
    currentSlide = carouselImages.length - 2;
    carouselSlider.style.transform = `translateX(${
      -imgWidth * currentSlide
    }px)`;
  }

  if (carouselImages[currentSlide].id === 'first-clone') {
    carouselSlider.style.transition = 'none';
    console.log(currentSlide);
    currentSlide = carouselImages.length - currentSlide;
    console.log(currentSlide);
    carouselSlider.style.transform = `translateX(${
      -imgWidth * currentSlide
    }px)`;
  }
});
