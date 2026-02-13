document.addEventListener('DOMContentLoaded', function () {

    // ===== Mobile Menu =====
    var menuBtn = document.querySelector('.mobile-menu-btn');
    var menuOverlay = document.querySelector('.mobile-menu-overlay');
    var mobileMenu = document.querySelector('.mobile-menu');
    var menuClose = document.querySelector('.mobile-menu-close');

    function openMenu() {
        mobileMenu.classList.add('active');
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // ===== Banner Slider =====
    var slides = document.querySelectorAll('.banner-slide');
    var dotsContainer = document.querySelector('.banner-dots');
    var prevBtn = document.querySelector('.banner-prev');
    var nextBtn = document.querySelector('.banner-next');
    var currentSlide = 0;
    var slideInterval;

    // Create dots
    slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', function () { goToSlide(i); });
        dotsContainer.appendChild(dot);
    });

    var dots = document.querySelectorAll('.banner-dot');

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(slideInterval);
    }

    nextBtn.addEventListener('click', function () {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    prevBtn.addEventListener('click', function () {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    startAutoplay();

    // ===== Testimonials Slider =====
    var testimonialCards = document.querySelectorAll('.testimonial-card');
    var testimonialDotsContainer = document.querySelector('.testimonials-dots');
    var currentTestimonial = 0;
    var testimonialInterval;

    // Create testimonial dots
    testimonialCards.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Depoimento ' + (i + 1));
        dot.addEventListener('click', function () {
            clearInterval(testimonialInterval);
            goToTestimonial(i);
            startTestimonialAutoplay();
        });
        testimonialDotsContainer.appendChild(dot);
    });

    var testimonialDots = document.querySelectorAll('.testimonial-dot');

    function goToTestimonial(n) {
        testimonialCards[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        currentTestimonial = (n + testimonialCards.length) % testimonialCards.length;
        testimonialCards[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    function startTestimonialAutoplay() {
        testimonialInterval = setInterval(function () {
            goToTestimonial(currentTestimonial + 1);
        }, 6000);
    }

    startTestimonialAutoplay();

    // ===== Video Player =====
    var videoPlayBtn = document.querySelector('.video-play-btn');
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function () {
            var videoUrl = this.getAttribute('data-video');
            var container = this.closest('.app-video');
            container.innerHTML = '<iframe src="' + videoUrl + '" style="width:100%;aspect-ratio:16/9;border:none;border-radius:8px;" allowfullscreen allow="autoplay"></iframe>';
        });
    }

    // ===== Cookie Banner =====
    var cookieBanner = document.getElementById('cookieBanner');
    var cookieAccept = document.getElementById('cookieAccept');

    if (localStorage.getItem('cookieAccepted')) {
        cookieBanner.classList.add('hidden');
    }

    cookieAccept.addEventListener('click', function () {
        cookieBanner.classList.add('hidden');
        localStorage.setItem('cookieAccepted', 'true');
    });

});
