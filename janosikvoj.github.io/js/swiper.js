const swiper = new Swiper(".mySwiper", {
  // Optional parameters
  speed: 800,
  direction: "vertical",
  mousewheel: true,
  loop: false,
  spaceBetween: 350,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

const swiper2 = new Swiper(".mySwiper2", {
  direction: "horizontal",
  spaceBetween: -window.innerWidth/2+20,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});