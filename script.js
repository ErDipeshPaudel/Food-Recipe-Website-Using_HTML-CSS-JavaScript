'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

const handleHover = function (e) {
  const link = e.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('img');

  siblings.forEach(el => {
    if (el !== link) el.style.opacity = this;
  });
  logo.style.opacity = this;
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause to return if clicked is false or null
  if (!clicked) return;
  console.log(clicked);
  //Remove active classes from other than clicked
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  //active class to the clicked tab
  clicked.classList.add('operations__tab--active');

  //Content area activated for clicked
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Sticky navigation:L Intersection Observer API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//Reveal on scroll the section content  using hiding and revealing
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.12,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading image with blur effect and 2 different quality of same image
const allImages = document.querySelectorAll('img[data-src]');

const lazyLoder = function (entries, observer) {
  const [entry] = entries;

  //replace with hd img
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(lazyLoder, {
  root: null,
  threshold: 0.1,
  rootMargin: '250px',
});
allImages.forEach(img => imgObserver.observe(img));

// **************************
// ***************Slider************
// ***************************
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  //Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  //Previous slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
  };
  init();
  activateDot(0);

  //Event handlers on btn
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    //e.key==='ArrowRight'&& nextSlide();   this is also valid
    if (e.key === 'ArrowRight') nextSlide();
  });

  //Event handler on dots
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// *****************************************************
//Event image slider
// *****************************************************
const headSlider = function () {
  const slideHeads = document.querySelectorAll('.slide-head');
  const headBtnLeft = document.querySelector('.slider-head__btn--left');
  const headBtnRight = document.querySelector('.slider-head__btn--right');
  const headDots = document.querySelector('.head-dots');

  let curSlide = 0;
  const maxSlide = slideHeads.length;

  //Function for creating each dots
  const createHeadDots = function () {
    slideHeads.forEach(function (_, i) {
      headDots.insertAdjacentHTML(
        'beforeend',
        `<button class="head-dots__dot" data-slide="${i}"</butto>`
      );
    });
  };

  const activateDot = function (slideHead) {
    document
      .querySelectorAll('.head-dots__dot')
      .forEach(dot => dot.classList.remove('heat-dots__dot--active'));
    document
      .querySelector(`.head-dots__dot[data-slide="${slideHead}"]`)
      .classList.add('head-dots__dot--active');
  };
  const goToSlide = function (slideHead) {
    slideHeads.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slideHead)}%)`)
    );
  };
  //Next slide
  const headnextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };
  //Previous slide
  const headprevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createHeadDots();
  };
  init();
  activateDot(0);

  //Event handlers on btn
  headBtnRight.addEventListener('click', headnextSlide);
  headBtnLeft.addEventListener('click', headprevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') headprevSlide();
    //e.key==='ArrowRight'&& nextSlide();   this is also valid
    if (e.key === 'ArrowRight') headnextSlide();
  });

  //Event handler on dots
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('head-dots__dot')) {
      const headslide = e.target.dataset.slide;
      goToSlide(headslide);
      activateDot(headslide);
    }
  });
  setInterval(function (slideHead) {
    const randInt = (min, max) =>
      Number(Math.floor(Math.random() * (max - min + 1)));
    activateDot(randInt(0, 12));
    slideHeads.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${100 * (i - randInt(0, 12))}%)`)
    );
  }, 6000);
};
headSlider();

// Search food items
