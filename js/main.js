// POWERDOIT Website - Main JavaScript
// Language Switching & Interactivity

document.addEventListener('DOMContentLoaded', function() {
  // ========================================
  // Language Switching (JS-based, most reliable)
  // ========================================
  const langBtns = document.querySelectorAll('.lang-btn');
  const html = document.documentElement;
  
  // Apply language directly by showing/hiding elements
  function applyLanguage(lang) {
    // Update html lang attribute
    html.setAttribute('lang', lang);
    
    // Also toggle body class for CSS rules
    document.body.classList.toggle('lang-en', lang === 'en');
    
    // Show/hide based on language
    document.querySelectorAll('[data-lang]').forEach(function(el) {
      if (el.tagName === 'BUTTON') return;
      if (el.getAttribute('data-lang') === lang) {
        el.style.display = '';
      } else {
        el.style.display = 'none';
      }
    });
    
    // Update active button
    langBtns.forEach(function(btn) {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
    
    // Save preference
    try { localStorage.setItem('powerdoit-lang', lang); } catch(e) {}
  }
  
  // Bind click events
  langBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });
  
  // Load saved preference, default to Chinese
  var savedLang = 'zh';
  try { savedLang = localStorage.getItem('powerdoit-lang') || 'zh'; } catch(e) {}
  applyLanguage(savedLang);

  // ========================================
  // Smooth Scrolling
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========================================
  // Header Scroll Effect - Keep Light
  // ========================================
  const header = document.querySelector('.header');
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.08)';
    } else {
      header.style.background = 'var(--color-white)';
      header.style.boxShadow = 'var(--shadow-sm)';
    }
  });

  // ========================================
  // Active Navigation
  // ========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPosition = window.pageYOffset + 200;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ========================================
  // Form Handling
  // ========================================
  const quoteForm = document.getElementById('quoteForm');
  
  if (quoteForm) {
    quoteForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Collect form data
      const formData = new FormData(this);
      const data = {
        name: formData.get('name'),
        company: formData.get('company'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        product: formData.get('product'),
        power: formData.get('power'),
        message: formData.get('message')
      };
      
      // Get current language
      const currentLang = html.getAttribute('lang') || 'zh';
      
      // Show success message
      const successMsg = currentLang === 'zh'
        ? '感谢您的询价！我们已收到您的信息，专业团队将在24小时内与您联系。'
        : 'Thank you for your inquiry! We have received your information and our team will contact you within 24 hours.';
      alert(successMsg);
      
      // Reset form
      this.reset();
    });
  }

  // ========================================
  // Order Buttons
  // ========================================
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-name').textContent.trim();
      const currentLang = html.getAttribute('lang');
      
      // Scroll to contact form
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
      
      // Pre-fill message
      setTimeout(() => {
        const messageField = document.querySelector('.form-textarea');
        if (messageField) {
          messageField.value = currentLang === 'zh' 
            ? `我对 ${productName} 感兴趣，请提供详细报价。`
            : `I'm interested in ${productName}. Please provide a detailed quote.`;
        }
      }, 500);
    });
  });

  // ========================================
  // Animation on Scroll
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .product-card, .solution-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});
