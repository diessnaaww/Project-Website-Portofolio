/**
 * ERFIN HIDAYAT - OFFICIAL MEDIA KIT & PORTFOLIO
 * Interactive JavaScript Logic
 * Managed by Adiesti Nuri - Personal Assistant
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initPortfolioFilters();
  initAccordion();
  initRateCalculator();
  initInquiryForm();
  initCopyEmail();
  initPrintMediaKit();
});

/* --------------------------------------------------------------------------
   1. NAVIGATION & SCROLL HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-link');

  // Sticky shadow effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveSection();
  });

  // Mobile toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '✕' : '☰';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('open');
        mobileToggle.innerHTML = '☰';
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section spy
  function highlightActiveSection() {
    const scrollPos = window.scrollY + 120;
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

/* --------------------------------------------------------------------------
   2. STAT COUNTERS ANIMATION
   -------------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.counter-anim');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = counter.getAttribute('data-decimal') === 'true';
          const duration = 1800; // ms
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = target * easeOutProgress;

            if (currentStep >= totalSteps) {
              counter.textContent = (isDecimal ? target.toFixed(1) : Math.round(target).toLocaleString('id-ID')) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = (isDecimal ? currentVal.toFixed(1) : Math.round(currentVal).toLocaleString('id-ID')) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.25 });

  const statsSection = document.querySelector('#about');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

/* --------------------------------------------------------------------------
   3. PORTFOLIO FILTERING
   -------------------------------------------------------------------------- */
function initPortfolioFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   4. TERMS & CONDITIONS ACCORDION
   -------------------------------------------------------------------------- */
function initAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Optional: close other accordions
      accordionItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherBtn = other.querySelector('.accordion-header');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. RATE CARD & CAMPAIGN CALCULATOR
   -------------------------------------------------------------------------- */
function initRateCalculator() {
  const checkboxes = document.querySelectorAll('.calc-checkbox');
  const totalDisplay = document.querySelector('#calc-total-val');
  const whatsappCalcBtn = document.querySelector('#calc-whatsapp-btn');

  if (!checkboxes.length || !totalDisplay) return;

  function calculateTotal() {
    let grandTotal = 0;
    const selectedItems = [];

    checkboxes.forEach(cb => {
      const label = cb.closest('.calc-item-label');
      if (cb.checked) {
        label.classList.add('selected');
        const price = parseInt(cb.getAttribute('data-price'), 10) || 0;
        const name = cb.getAttribute('data-name') || '';
        grandTotal += price;
        selectedItems.push(`${name} (Rp ${price.toLocaleString('id-ID')})`);
      } else {
        label.classList.remove('selected');
      }
    });

    totalDisplay.textContent = `Rp ${grandTotal.toLocaleString('id-ID')}`;

    // Update WhatsApp Button link
    if (whatsappCalcBtn) {
      if (grandTotal === 0) {
        whatsappCalcBtn.href = generateWhatsAppLink('Halo Kak Adiesti Nuri (Management Erfin Hidayat), saya ingin menanyakan ketersediaan kolaborasi endorsement untuk brand kami.');
      } else {
        const message = `Halo Kak Adiesti Nuri (Management Erfin Hidayat),\n\nSaya ingin memesan paket kolaborasi via Website Rate Card:\n\n*Pilihan Layanan:*\n• ${selectedItems.join('\n• ')}\n\n*Estimasi Total:* Rp ${grandTotal.toLocaleString('id-ID')}\n\nMohon informasi slot jadwal dan detail invoice DP 50%. Terima kasih!`;
        whatsappCalcBtn.href = generateWhatsAppLink(message);
      }
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', calculateTotal);
  });

  // Calculate initial default state
  calculateTotal();
}

/* --------------------------------------------------------------------------
   6. INQUIRY FORM TO WHATSAPP & EMAIL
   -------------------------------------------------------------------------- */
function initInquiryForm() {
  const form = document.querySelector('#collaboration-form');
  const waSubmitBtn = document.querySelector('#submit-wa-btn');

  if (!form || !waSubmitBtn) return;

  waSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const brandName = document.querySelector('#form-brand').value.trim();
    const picName = document.querySelector('#form-pic').value.trim();
    const serviceChoice = document.querySelector('#form-service').value;
    const timeline = document.querySelector('#form-timeline').value.trim();
    const messageNotes = document.querySelector('#form-notes').value.trim();

    if (!brandName || !picName) {
      alert('Mohon lengkapi Nama Brand dan Nama PIC / Contact Person.');
      return;
    }

    const waText = `Halo Kak Adiesti Nuri (Management Erfin Hidayat),\n\nSaya ${picName} dari *${brandName}* bermaksud mengajukan kolaborasi media kit:\n\n• *Brand:* ${brandName}\n• *Pilihan Paket/Layanan:* ${serviceChoice}\n• *Target Timeline:* ${timeline || 'Menyesuaikan ketersediaan'}\n• *Brief / Catatan:* ${messageNotes || '-'}\n\nMohon informasi slot jadwal dan kelanjutan proses endorsement. Terima kasih banyak!`;

    window.open(generateWhatsAppLink(waText), '_blank');
  });
}

function generateWhatsAppLink(text) {
  // Official Management WhatsApp for Adiesti Nuri / Erfin Hidayat
  // Using official clean Indonesian wa.me link with encoded text
  const phone = '6285852528775'; // Format: country code without +
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

/* --------------------------------------------------------------------------
   7. COPY EMAIL TO CLIPBOARD
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.querySelector('#copy-email-btn');
  const emailText = 'adiestinuri.mgmt@gmail.com';

  if (!copyBtn) return;

  copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(emailText).then(() => {
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '✓ Disalin!';
      copyBtn.style.background = '#2A9D8F';
      copyBtn.style.color = '#FFF';

      setTimeout(() => {
        copyBtn.innerHTML = originalText;
        copyBtn.style.background = '';
        copyBtn.style.color = '';
      }, 2000);
    }).catch(() => {
      prompt('Salin email management:', emailText);
    });
  });
}

/* --------------------------------------------------------------------------
   8. PRINT MEDIA KIT / EXPORT PDF
   -------------------------------------------------------------------------- */
function initPrintMediaKit() {
  const printBtns = document.querySelectorAll('.print-mediakit-btn');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });
}
