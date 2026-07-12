  // Intro splash: reuse hero background image, generate ambient particles, then reveal site
  (function(){
    const heroBgEl = document.getElementById('heroBg');
    const introImg = document.getElementById('introBgImg');
    if (heroBgEl && introImg){
      const heroStyle = getComputedStyle(heroBgEl).backgroundImage;
      introImg.style.backgroundImage = heroStyle;
    }

    const particleHost = document.getElementById('heroParticles');
    if (particleHost){
      const count = window.innerWidth < 640 ? 16 : 30;
      for (let i = 0; i < count; i++){
        const p = document.createElement('span');
        const left = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 9 + Math.random() * 8;
        const size = 2 + Math.random() * 2;
        p.style.left = left + '%';
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.animationDelay = delay + 's';
        p.style.animationDuration = duration + 's';
        particleHost.appendChild(p);
      }
    }

    function dismissIntro(){
      const intro = document.getElementById('intro');
      if (!intro) return;
      intro.classList.add('fade-out');
      document.body.classList.remove('intro-lock');
      setTimeout(() => intro.remove(), 800);
    }

    const MIN_SHOW = 2000; // ms, lets the animation play out nicely
    const start = Date.now();
    function ready(){
      const elapsed = Date.now() - start;
      const wait = Math.max(0, MIN_SHOW - elapsed);
      setTimeout(dismissIntro, wait);
    }
    if (document.readyState === 'complete') ready();
    else window.addEventListener('load', ready);
    // Safety net in case load never fires cleanly
    setTimeout(dismissIntro, 4500);
  })();

  // Live glossy parallax on hero background
  const heroBg = document.getElementById('heroBg');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroBg.style.transform = `scale(1.08) translateY(${y * 0.15}px)`;
  }, { passive: true });

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 14;
    const yy = (e.clientY / window.innerHeight - 0.5) * 10;
    heroBg.style.filter = `saturate(1.1) contrast(1.05)`;
    heroBg.style.marginLeft = x + 'px';
    heroBg.style.marginTop = yy + 'px';
  });

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.glass, .about-media, .owner-photo, .reach');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.style.opacity = 1;
        en.target.style.transform = 'translateY(0)';
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(el);
  });
