'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn_close');
const btnOpenModal = document.querySelectorAll('.btn_show');
const btnScrollTo = document.querySelector('.btn_scroll');
const sec1 = document.querySelector('#section_1');
const nav = document.querySelector('.nav');
const tabsContainer = document.querySelector('.tech_container');
const tabsContent = document.querySelectorAll('.tech_content');
const tab = document.querySelectorAll('.tech');




const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btnOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
})


btnScrollTo.addEventListener('click', function (e) {
    const s1coords = sec1.getBoundingClientRect()
    console.log(s1coords);

    console.log(e.target.getBoundingClientRect());

    console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    console.log('height/width viewport',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth);
    sec1.scrollIntoView({ behavior: 'smooth' });

})
document.querySelector('.nav_links').addEventListener('click', function (e) {
    e.preventDefault();
  if (e.target.classList.contains('nav_link')) {
        const id = e.target.getAttribute('href')
        console.log(id);
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
})

tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.tech_tab')
    if (!clicked) return;
    tab.forEach(t => t.classList.remove('tech_tab--active'))
    tabsContent.forEach(c => c.classList.remove('tech_content--active'))
    clicked.classList.add('tech_tab--active')
    document.querySelector(`tab_content--${clicked.dataset.tab}`).classList.add('tab_content--active');
})
const handleOver = function (e) {
    if (e.target.classList.contains('nav_link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav_link');

        siblings.forEach(el => {
            if (el !== link) el.style.opacity = this;
        })
    }
}
nav.addEventListener('mouseover', handleOver.bind(0.7))
nav.addEventListener('mouseout', handleOver.bind(1))
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
    const [entry] = entries;
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
})
headerObserver.observe(header);
const allSections = document.querySelectorAll('.section')
const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section_hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section_hidden');
})
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy_img');
    })
    observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider_btn--left');
    const btnRight = document.querySelector('.slider_btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend',
                `<button class="dots_dot" data-slide="${i}"></button>`);
        })
    }

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots_dot')
            .forEach(dot => dot.classList.remove('dots_dot--active'))

        document.querySelector(`.dots_dot[data-slide="${slide}"]`).classList.add('dots_dot--active');
    }

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
    }
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

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
        activateDot(0);
    }
    init();
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    })

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots_dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    })
}
slider();
