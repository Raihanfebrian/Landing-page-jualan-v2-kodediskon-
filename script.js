// ==========================================
// 1. COUNTDOWN TIMER (DAILY UNTIL MIDNIGHT)
// ==========================================
const timerContainer = document.getElementById('timer-container');
const mainPriceDisplay = document.getElementById('main-price-display');
const normalPriceText = document.getElementById('normal-price-text');
const ctaBtn = document.getElementById('cta-btn');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// ELEMEN SYNC (Sticky CTA & Pricing)
const promoBadge = document.getElementById('promo-badge');
const bestDealBadge = document.getElementById('best-deal-badge');
const stickyPrice = document.getElementById('sticky-price');
const stickyDiscount = document.getElementById('sticky-discount');
const stickyBtn = document.getElementById('sticky-btn');
const stickyLabel = document.getElementById('sticky-label');
const couponInfo = document.getElementById('coupon-info');
const discountText = document.getElementById('discount-text');

// LINKS
const LINK_CHECKOUT = 'https://raihanstruggle.id/checkout-page'; 

function updateTimer() {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0); // Target selalu jam 00:00 hari ini/esok
    
    const distance = midnight - now;

    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if(hoursEl) hoursEl.textContent = h < 10 ? '0' + h : h;
    if(minutesEl) minutesEl.textContent = m < 10 ? '0' + m : m;
    if(secondsEl) secondsEl.textContent = s < 10 ? '0' + s : s;
    
    // ==========================================
    // PERBAIKAN DI SINI
    // ==========================================
    
    // 1. Tombol CTA Utama: Pastikan link tetap ke Checkout
    if (ctaBtn && ctaBtn.href !== LINK_CHECKOUT) ctaBtn.href = LINK_CHECKOUT;
    
    // 2. Teks Tombol: DIHAPUS override-nya. Biarkan HTML yang mengatur (AMBIL PROMO SEKARANG!).
    // if (ctaBtn) ctaBtn.textContent = "AMBIL DISKON SEKARANG"; <-- BARIS INI DIHAPUS
    
    // 3. Sticky CTA: DIHAPUS override link-nya. Biarkan HTML mengarah ke #pricing.
    // if (stickyBtn) stickyBtn.href = LINK_CHECKOUT; <-- BARIS INI DIHAPUS
}

const timerInterval = setInterval(updateTimer, 1000);
updateTimer();


// ==========================================
// 2. STICKY CTA OBSERVER
// ==========================================
const stickyCta = document.getElementById('stickyCta');
const pricingSection = document.getElementById('pricing');
// Target section adalah Tutorial
const triggerSection = document.getElementById('tutorial-section'); 

function showSticky() {
    stickyCta.style.transform = "translateY(0)";
    stickyCta.style.opacity = "1";
    stickyCta.style.pointerEvents = "auto";
}

function hideSticky() {
    stickyCta.style.transform = "translateY(100%)";
    stickyCta.style.opacity = "0";
    stickyCta.style.pointerEvents = "none";
}

// Logika Section Tutorial: Muncul saat masuk atau sudah melewati section ini
const problemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showSticky();
        } else {
            // Jika posisi section di atas viewport (sudah dilewati saat scroll ke bawah)
            if (entry.boundingClientRect.top < 0) {
                showSticky();
            } 
            // Jika posisi section di bawah viewport (kembali ke atas halaman, sebelum tutorial)
            else if (entry.boundingClientRect.top > window.innerHeight) {
                hideSticky();
            }
        }
    });
}, { threshold: 0.1 });

if(triggerSection) problemObserver.observe(triggerSection);

// Logika Section Pricing: Hilangkan saat masuk, Munculkan kembali saat keluar (scroll ke atas)
const pricingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            hideSticky();
        } else {
            // Jika pricing tidak terlihat
            // Cek apakah posisi pricing di bawah viewport (top > 0)
            // Artinya user baru saja scroll ke ATAS meninggalkan pricing
            if (entry.boundingClientRect.top > 0) {
                // Pastikan kita sudah melewati tutorial section agar tidak muncul di paling atas
                if (triggerSection && triggerSection.getBoundingClientRect().top < 0) {
                    showSticky();
                }
            }
        }
    });
}, { threshold: 0.1 });

if(pricingSection) pricingObserver.observe(pricingSection);


// ==========================================
// 3. SALES NOTIFICATION
// ==========================================
const buyers = [
    { name: 'Eka Gustiawan', initials: 'EG', time: '5 menit lalu' }, 
    { name: 'Andi Saputra', initials: 'AS', time: '2 menit lalu' }, 
    { name: 'Budi Wibowo', initials: 'BW', time: 'Baru saja' },
    { name: 'Rina Permata', initials: 'RP', time: '3 menit lalu' },
    { name: 'Deni Kurniawan', initials: 'DK', time: '1 menit lalu' },
    { name: 'Sarah Amelia', initials: 'SA', time: '7 menit lalu' },
    { name: 'Fajar Rahman', initials: 'FR', time: '10 menit lalu' },
    { name: 'Dimas Pratama', initials: 'DP', time: 'Baru saja' },
    { name: 'Siti Nurhaliza', initials: 'SN', time: '4 menit lalu' },
    { name: 'Reza Aditya', initials: 'RA', time: '12 menit lalu' },
    { name: 'Nadia Putri', initials: 'NP', time: '6 menit lalu' },
    { name: 'Hendra Wijaya', initials: 'HW', time: '2 menit lalu' }
];
function showNotif() {
    const b = buyers[Math.floor(Math.random() * buyers.length)];
    document.getElementById('notifName').textContent = b.name;
    document.getElementById('notifAvatar').textContent = b.initials;
    document.getElementById('notifTime').textContent = b.time;
    document.getElementById('salesNotification').classList.add('show');
    setTimeout(() => document.getElementById('salesNotification').classList.remove('show'), 4000);
}
setTimeout(showNotif, 20000); 
setInterval(showNotif, 45000);


// ==========================================
// 4. TIMELINE OBSERVER
// ==========================================
const steps = document.querySelectorAll('.timeline-step');
const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.3 });
steps.forEach(step => { stepObserver.observe(step); });


// ==========================================
// 5. TOGGLE FAQ
// ==========================================
function toggleFaq(btn) {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('svg');
    content.classList.toggle('hidden');
    icon.classList.toggle('rotate-180');
}


// ==========================================
// 6. TESTIMONIAL SLIDER
// ==========================================
const scroller = document.getElementById('testimonialScroller');
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.testi-dot');
const btnNext = document.getElementById('btnNext');
const btnPrev = document.getElementById('btnPrev');
let currentIndex = 0;
const totalCards = cards.length;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-active');
            const index = Array.from(cards).indexOf(entry.target);
            if (index !== -1) { currentIndex = index; updateDots(index); }
        } else { entry.target.classList.remove('is-active'); }
    });
}, { root: scroller, threshold: 0.6 });
cards.forEach(card => observer.observe(card));

function updateDots(activeIndex) {
    dots.forEach((dot, i) => {
        dot.classList.remove('bg-slate-300', 'bg-emerald-500', 'w-4');
        dot.classList.add('bg-slate-300');
        if (i === activeIndex) {
            dot.classList.remove('bg-slate-300'); 
            dot.classList.add('w-4', 'bg-emerald-500');
        }
    });
}

function scrollToTesti(index) {
    const card = cards[index]; if (!card) return;
    const scrollLeftPos = card.offsetLeft - (scroller.offsetWidth / 2) + (card.offsetWidth / 2);
    scroller.scrollTo({ left: scrollLeftPos, behavior: 'smooth' });
}

if (btnNext) btnNext.addEventListener('click', () => { currentIndex++; if (currentIndex >= totalCards) currentIndex = 0; scrollToTesti(currentIndex); });
if (btnPrev) btnPrev.addEventListener('click', () => { currentIndex--; if (currentIndex < 0) currentIndex = totalCards - 1; scrollToTesti(currentIndex); });

let autoSlideInterval;
function startAutoSlide() { stopAutoSlide(); autoSlideInterval = setInterval(() => { currentIndex++; if (currentIndex >= totalCards) currentIndex = 0; scrollToTesti(currentIndex); }, 5000); }
function stopAutoSlide() { clearInterval(autoSlideInterval); }
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) startAutoSlide(); else stopAutoSlide(); });
}, { threshold: 0.2 });
const testimonialSection = document.querySelector('#testimonialScroller')?.closest('section');
if (testimonialSection) sectionObserver.observe(testimonialSection);

window.addEventListener('load', () => {
    const card = cards[0]; if (card) {
        const scrollLeftPos = card.offsetLeft - (scroller.offsetWidth / 2) + (card.offsetWidth / 2);
        scroller.scrollLeft = scrollLeftPos;
    }
});


// ==========================================
// 7. REVEAL ANIMATION
// ==========================================
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1 });
reveals.forEach(r => { revealObserver.observe(r); });


// ==========================================
// 8. MODAL FUNCTIONS
// ==========================================
function openModal(url) {
    const modal = document.getElementById('previewModal');
    const iframe = document.getElementById('modalIframe');
    iframe.src = url;
    modal.classList.remove('hidden');
    modal.classList.add('showing');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modal = document.getElementById('previewModal');
    const iframe = document.getElementById('modalIframe');
    modal.classList.remove('showing');
    modal.classList.add('hiding');
    setTimeout(() => {
        modal.classList.add('hidden'); modal.classList.remove('hiding'); iframe.src = ""; document.body.style.overflow = 'auto';
    }, 300);
}
document.getElementById('previewModal')?.addEventListener('click', function(e) { if (e.target === this) closeModal(); });


// LIVE VIEWERS COUNTER
const liveViewersCount = document.getElementById('liveViewersCount');
let currentViewers = 12;

setInterval(() => {
    const jumpSize = Math.floor(Math.random() * 2) + 1; 
    const direction = Math.random() > 0.5 ? 1 : -1;
    const change = jumpSize * direction;
    currentViewers += change;
    
    if (currentViewers < 8) currentViewers = 8;
    if (currentViewers > 24) currentViewers = 24;
    
    liveViewersCount.textContent = `${currentViewers} Orang sedang melihat penawaran ini`;
}, 15000);

// ==========================================
// 9. EXIT INTENT POPUP LOGIC (FIXED)
// ==========================================
const exitPopup = document.getElementById('exitPopup');

// Fungsi untuk MUNCULKAN Popup
function showExitPopup() {
    // Cek apakah user udah pernah liat popup ini di sesi ini
    if (!sessionStorage.getItem('exitPopupShown')) {
        if(exitPopup) {
            exitPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Disable scroll
            sessionStorage.setItem('exitPopupShown', 'true'); // Tandai udah pernah muncul
        }
    }
}

// Fungsi untuk MENUTUP Popup
function closeExitPopup() {
    if(exitPopup) {
        exitPopup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scroll kembali
    }
}

// Deteksi gerakan mouse keluar (ke arah tab/close browser)
document.addEventListener('mouseleave', function(e) {
    // Jika mouse keluar dari area window (biasanya ke arah tab/close)
    if (e.clientY < 10) { 
        showExitPopup();
    }
});

// Tutup popup jika klik area gelap di luar kartu
exitPopup?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeExitPopup();
    }
});