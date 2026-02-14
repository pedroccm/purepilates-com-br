/* Pure Pilates - Script */
document.addEventListener('DOMContentLoaded', function () {

    /* ===========================
       HERO BANNER SLIDER
       =========================== */
    (function () {
        var track = document.getElementById('heroSlider');
        var dotsContainer = document.getElementById('heroDots');
        var prevBtn = document.querySelector('.slider-prev');
        var nextBtn = document.querySelector('.slider-next');
        if (!track) return;

        var slides = track.querySelectorAll('.slide');
        var total = slides.length;
        var current = 0;
        var autoplayInterval;

        // Create dots
        for (var i = 0; i < total; i++) {
            var dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
        }

        var dots = dotsContainer.querySelectorAll('.dot');

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            current = index;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            dots.forEach(function (d, idx) {
                d.classList.toggle('active', idx === current);
            });
        }

        prevBtn.addEventListener('click', function () {
            goTo(current - 1);
            resetAutoplay();
        });

        nextBtn.addEventListener('click', function () {
            goTo(current + 1);
            resetAutoplay();
        });

        dotsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('dot')) {
                goTo(parseInt(e.target.getAttribute('data-index')));
                resetAutoplay();
            }
        });

        function startAutoplay() {
            autoplayInterval = setInterval(function () {
                goTo(current + 1);
            }, 5000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Touch support
        var startX = 0;
        var isDragging = false;

        track.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        track.addEventListener('touchend', function (e) {
            if (!isDragging) return;
            var endX = e.changedTouches[0].clientX;
            var diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goTo(current + 1);
                else goTo(current - 1);
                resetAutoplay();
            }
            isDragging = false;
        });

        startAutoplay();
    })();

    /* ===========================
       TESTIMONIALS SLIDER
       =========================== */
    (function () {
        var track = document.getElementById('testimonialTrack');
        var dotsContainer = document.getElementById('testimonialDots');
        if (!track) return;

        var slides = track.querySelectorAll('.testimonial-slide');
        var total = slides.length;
        var current = 0;
        var autoplayInterval;

        // Create dots
        for (var i = 0; i < total; i++) {
            var dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dotsContainer.appendChild(dot);
        }

        var dots = dotsContainer.querySelectorAll('.dot');

        function goTo(index) {
            if (index < 0) index = total - 1;
            if (index >= total) index = 0;
            current = index;
            track.style.transform = 'translateX(-' + (current * 100) + '%)';
            dots.forEach(function (d, idx) {
                d.classList.toggle('active', idx === current);
            });
        }

        dotsContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('dot')) {
                goTo(parseInt(e.target.getAttribute('data-index')));
                resetAutoplay();
            }
        });

        function startAutoplay() {
            autoplayInterval = setInterval(function () {
                goTo(current + 1);
            }, 6000);
        }

        function resetAutoplay() {
            clearInterval(autoplayInterval);
            startAutoplay();
        }

        // Touch support
        var startX = 0;
        var isDragging = false;

        track.addEventListener('touchstart', function (e) {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        track.addEventListener('touchend', function (e) {
            if (!isDragging) return;
            var endX = e.changedTouches[0].clientX;
            var diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goTo(current + 1);
                else goTo(current - 1);
                resetAutoplay();
            }
            isDragging = false;
        });

        startAutoplay();
    })();

    /* ===========================
       MOBILE MENU
       =========================== */
    (function () {
        var menuBtn = document.querySelector('.js--menu_action');
        var closeBtn = document.querySelector('.js--menu_close');
        var overlay = document.querySelector('.pilates-header-menu-overlay');
        var container = document.querySelector('.pilates-header-menu-container');

        if (!menuBtn) return;

        function openMenu() {
            overlay.classList.add('active');
            container.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            overlay.classList.remove('active');
            container.classList.remove('active');
            document.body.style.overflow = '';
        }

        menuBtn.addEventListener('click', openMenu);
        if (closeBtn) closeBtn.addEventListener('click', closeMenu);
        if (overlay) overlay.addEventListener('click', closeMenu);
    })();

    /* ===========================
       VIDEO EMBED
       =========================== */
    (function () {
        var container = document.getElementById('videoContainer');
        if (!container) return;

        container.addEventListener('click', function () {
            var iframe = document.createElement('iframe');
            iframe.src = 'https://www.youtube.com/embed/kM4KWfwIh-8?autoplay=1';
            iframe.setAttribute('allow', 'autoplay; encrypted-media');
            iframe.setAttribute('allowfullscreen', '');
            container.innerHTML = '';
            container.appendChild(iframe);
        });
    })();

    /* ===========================
       HEADER SCROLL EFFECT
       =========================== */
    (function () {
        var header = document.querySelector('.pilates-header');
        if (!header) return;

        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    })();

});
