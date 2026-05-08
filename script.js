// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const header = document.querySelector('.header');

if (hamburger && mobileMenu && menuOverlay) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        header.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on overlay
    menuOverlay.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
        header.classList.remove('menu-open');
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            header.classList.remove('menu-open');
        });
    });
}

// ==========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
        header.style.boxShadow = '0 4px 20px rgba(131, 100, 226, 0.15)';
    } else {
        header.classList.remove('scrolled');
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

header.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';

// ==========================================
// PRODUCT CARD ANIMATION ON SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards
document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card, .featured-card, .small-product, .hayati-card, .vozol-wide-item');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ==========================================
// IMAGE PLACEHOLDER FALLBACK
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            // Create a placeholder if image fails to load
            this.style.background = 'linear-gradient(135deg, rgba(131, 100, 226, 0.2) 0%, rgba(255, 63, 129, 0.2) 100%)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.alt = this.alt || 'Imagem do produto';
        });
    });
});

// ==========================================
// PRODUCT FILTER FUNCTIONALITY
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        // Add simple animation effect
        const products = document.querySelectorAll('.product-card');
        products.forEach((product, index) => {
            product.style.animation = 'none';
            setTimeout(() => {
                product.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s forwards`;
            }, 10);
        });
    });
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .filter-btn.active {
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%) !important;
        border-color: transparent !important;
    }
`;
document.head.appendChild(style);

// ==========================================
// THUMBNAIL GALLERY FUNCTIONALITY (Blur Section)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const thumbnails = document.querySelectorAll('.detail-thumbnails img');
    const mainImage = document.querySelector('.detail-main-image img');
    const detailTitle = document.getElementById('detailTitle');
    const detailDesc = document.getElementById('detailDesc');
    const detailBattery = document.getElementById('detailBattery');
    const detailPuffs = document.getElementById('detailPuffs');
    const detailLiquid = document.getElementById('detailLiquid');
    const buyNowBtn = document.getElementById('buyNowBtn');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function () {
                // Remove active state from all thumbnails
                thumbnails.forEach(t => t.style.borderColor = 'rgba(255, 255, 255, 0.1)');

                // Add active state to clicked thumbnail
                this.style.borderColor = 'rgba(131, 100, 226, 0.8)';

                // Update content with fade effect
                if (detailTitle) detailTitle.style.opacity = '0';
                if (detailDesc) detailDesc.style.opacity = '0';
                if (detailBattery) detailBattery.style.opacity = '0';
                if (detailPuffs) detailPuffs.style.opacity = '0';
                if (detailLiquid) detailLiquid.style.opacity = '0';
                if (buyNowBtn) buyNowBtn.style.opacity = '0';
                mainImage.style.opacity = '0';

                setTimeout(() => {
                    // Update main image
                    mainImage.src = this.src;

                    // Update text content and links from data attributes
                    if (detailTitle) detailTitle.textContent = this.dataset.title;
                    if (detailDesc) detailDesc.textContent = this.dataset.desc;
                    if (detailBattery) detailBattery.textContent = this.dataset.battery;
                    if (detailPuffs) detailPuffs.textContent = this.dataset.puffs;
                    if (detailLiquid) detailLiquid.textContent = this.dataset.liquid;
                    if (buyNowBtn) buyNowBtn.href = this.dataset.link;

                    // Fade back in
                    mainImage.style.opacity = '1';
                    if (detailTitle) detailTitle.style.opacity = '1';
                    if (detailDesc) detailDesc.style.opacity = '1';
                    if (detailBattery) detailBattery.style.opacity = '1';
                    if (detailPuffs) detailPuffs.style.opacity = '1';
                    if (detailLiquid) detailLiquid.style.opacity = '1';
                    if (buyNowBtn) buyNowBtn.style.opacity = '1';
                }, 200);
            });
        });

        // Set initial styles for transitions
        [detailTitle, detailDesc, detailBattery, detailPuffs, detailLiquid, buyNowBtn].forEach(el => {
            if (el) el.style.transition = 'opacity 0.3s ease';
        });

        // Set first thumbnail as active by default
        if (thumbnails[0]) {
            thumbnails[0].style.borderColor = 'rgba(131, 100, 226, 0.8)';
        }
    }
});

// ==========================================
// BUTTON CLICK RIPPLE EFFECT
// ==========================================
document.querySelectorAll('.btn-product, .btn-buy-large, .btn-cta, .btn-hayati, .btn-vozol, .btn-spaceman').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Only add ripple if it's a button, not a link navigating away
        if (this.href && this.href !== '#') return;

        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';

        const rect = this.getBoundingClientRect();
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
            margin-left: -90px;
            margin-top: -90px;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ==========================================
// PARALLAX EFFECT FOR HERO SECTION
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroRight = document.querySelector('.hero-right img');

    if (heroRight) {
        heroRight.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ==========================================
// AGE VERIFICATION MODAL
// ==========================================
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (ageModal && yesBtn && noBtn) {
    window.addEventListener("load", () => {
        if (localStorage.getItem("ageConfirmed") != "true") {
            ageModal.style.display = "flex";
        } else {
            ageModal.style.display = "none";
        }
    });

    yesBtn.addEventListener("click", () => {
        localStorage.setItem("ageConfirmed", "true");
        ageModal.style.display = "none";
    });

    noBtn.addEventListener("click", () => {
        alert("Acesso proibido. Esta página é apenas para maiores de 18 anos.");
        window.location.href = "https://vapeportugal.pt/pages/informacoes-legais";
    });
}

// ==========================================
// SHOW MORE FUNCTIONALITY FOR DESCRIPTION SECTION
// ==========================================
const showMoreBtn = document.getElementById('showMoreBtn');
const hiddenCards = document.querySelectorAll('.description-card.hidden');
let isExpanded = false;

if (showMoreBtn && hiddenCards.length > 0) {
    showMoreBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;

        hiddenCards.forEach(card => {
            if (isExpanded) {
                card.style.display = 'block';
                // Small timeout to allow display: block to take effect before removing hidden class for animation
                setTimeout(() => card.classList.remove('hidden'), 10);
            } else {
                card.classList.add('hidden');
                setTimeout(() => card.style.display = 'none', 300); // Wait for transition if any
            }
        });

        showMoreBtn.innerHTML = isExpanded ? 'Ver menos' : 'Ver mais';

        // If closing, scroll back to the start of the section
        if (!isExpanded) {
            const descSection = document.getElementById('description');
            if (descSection) {
                descSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ==========================================
// FOOTER CITY LINKS TOGGLE
// ==========================================
const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");

if (city && cont.length > 0) {
    city.addEventListener("click", toggleCont);
    function toggleCont() {
        city.classList.toggle("active");
        Array.from(cont).forEach((el) => {
            el.style.display = el.style.display === "block" ? "none" : "block";
        });
    }
}

// ==========================================
// CURRENT YEAR IN FOOTER
// ==========================================
const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

// ==========================================
// NEWSLETTER FORM SUBMISSION
// ==========================================
const newsletterForm = document.querySelector('.newsletter-form');
const newsletterInput = document.querySelector('.newsletter-input');
const subscribeBtn = document.querySelector('.btn-subscribe');

if (newsletterForm && subscribeBtn && newsletterInput) {
    subscribeBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const email = newsletterInput.value.trim();

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            alert('Introduza o seu endereço de email.');
            newsletterInput.focus();
            return;
        }

        if (!emailRegex.test(email)) {
            alert('Introduza um endereço de email válido.');
            newsletterInput.focus();
            return;
        }

        // Success message
        alert('Obrigado pela subscrição. Em breve receberá uma mensagem nossa.');
        newsletterInput.value = '';
    });

    // Submit on Enter key
    newsletterInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            subscribeBtn.click();
        }
    });
}

// ==========================================
// INITIALIZE PAGE
// ==========================================
window.addEventListener('load', function () {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});


