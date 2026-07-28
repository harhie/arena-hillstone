/* ══════════════════════════════════════════════════
   Hillstone AI — 서비스 소개 페이지 스크립트
   스크롤 애니메이션 · 네비게이션 · 카운터
   ══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ─── 1. 스크롤 기반 페이드인 애니메이션 ───
  // 화면에 보이는 요소에 'visible' 클래스를 추가하여 애니메이션 시작
  const fadeElements = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 한번 보이면 더 이상 관찰하지 않음 (성능 최적화)
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    {
      // 요소가 15% 보이면 애니메이션 시작
      threshold: 0.15,
      // 약간 아래에서 미리 로드하여 더 자연스럽게
      rootMargin: '0px 0px -40px 0px',
    }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  // ─── 2. 네비게이션 스크롤 효과 ───
  // 스크롤하면 네비게이션 배경이 반투명해지며 blur 효과 적용
  const nav = document.getElementById('nav');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = scrollY;
  }

  // requestAnimationFrame으로 스크롤 이벤트 최적화
  let navTicking = false;
  window.addEventListener('scroll', () => {
    if (!navTicking) {
      requestAnimationFrame(() => {
        handleNavScroll();
        navTicking = false;
      });
      navTicking = true;
    }
  });

  // ─── 3. 모바일 메뉴 토글 ───
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');

      // 햄버거 아이콘 ↔ X 아이콘 전환
      const spans = mobileToggle.querySelectorAll('span');
      const isOpen = mobileMenu.classList.contains('open');

      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        mobileToggle.setAttribute('aria-label', '메뉴 닫기');
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        mobileToggle.setAttribute('aria-label', '메뉴 열기');
      }
    });

    // 모바일 메뉴 링크 클릭 시 메뉴 닫기
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        const spans = mobileToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ─── 4. 숫자 카운터 애니메이션 ───
  // 히어로 섹션의 통계 숫자가 0에서 목표값까지 증가
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          animateCounter(el, 0, target, 1500);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  /**
   * 숫자 카운터 애니메이션 함수
   * easeOutQuart 곡선으로 자연스러운 감속 효과
   *
   * @param {HTMLElement} el - 숫자를 표시할 요소
   * @param {number} start - 시작 값
   * @param {number} end - 목표 값
   * @param {number} duration - 애니메이션 시간(ms)
   */
  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutQuart: 빠르게 시작하고 천천히 끝남
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(start + (end - start) * easeProgress);

      el.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ─── 5. 부드러운 스크롤 (앵커 링크) ───
  // 브라우저 기본 scroll-behavior: smooth를 보완
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();

        // 네비게이션 높이만큼 오프셋
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // ─── 6. 보고서 카드 순차 애니메이션 ───
  // 보고서 섹션의 카드들이 순차적으로 나타남
  const reportCards = document.querySelectorAll('.report-card');

  const reportObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 카드가 보이면 순차적으로 애니메이션 적용
          const allCards = entry.target.parentElement.querySelectorAll('.report-card');
          allCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            card.style.transition = `opacity 0.4s ease ${index * 0.06}s, transform 0.4s ease ${index * 0.06}s`;

            // 짧은 지연 후 애니메이션 시작 (CSS transition이 적용되도록)
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            });
          });

          reportObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // 첫 번째 카드만 관찰하여 전체 그룹 애니메이션 트리거
  if (reportCards.length > 0) {
    reportObserver.observe(reportCards[0]);
  }

  // ─── 7. 분석 축 카드 호버 효과 ───
  // 카드에 마우스 올리면 은은한 글로우 효과
  const axisCards = document.querySelectorAll('.axis-card');

  axisCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 0 40px rgba(99, 102, 241, 0.12)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

  // ─── 8. 페이지 로드 시 히어로 즉시 표시 ───
  // 히어로 섹션의 fade-up 요소들은 스크롤 없이 바로 표시
  const heroFadeElements = document.querySelectorAll('.hero .fade-up');
  setTimeout(() => {
    heroFadeElements.forEach((el) => {
      el.classList.add('visible');
    });
  }, 100);

  // ─── 9. 현재 섹션 네비게이션 하이라이트 ───
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('id');

          navLinks.forEach((link) => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.style.color = 'var(--text-primary)';
            }
          });
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '-72px 0px -50% 0px',
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  // ─── 10. 네비게이션 다크/라이트 전환 ───
  // 현재 보이는 섹션이 다크인지 라이트인지에 따라 네비게이션 스타일 전환
  const darkSections = document.querySelectorAll('.section-dark, .hero');
  const lightSections = document.querySelectorAll(
    'section:not(.section-dark):not(.hero):not(.disclaimer-section)'
  );

  const navColorObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const isDark =
            entry.target.classList.contains('section-dark') ||
            entry.target.classList.contains('hero');
          if (isDark) {
            nav.classList.add('nav-dark');
          } else {
            nav.classList.remove('nav-dark');
          }
        }
      });
    },
    {
      threshold: 0,
      rootMargin: '-50% 0px -50% 0px', // 화면 중앙에 있는 섹션 기준
    }
  );

  document.querySelectorAll('section').forEach((s) => navColorObserver.observe(s));

  // ─── 11. 스크롤 리빌 애니메이션 ───
  const scrollRevealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px',
    }
  );

  scrollRevealElements.forEach((el) => revealObserver.observe(el));

  // ─── 12. 보고서 아코디언 ───
  const accordionCards = document.querySelectorAll('.report-card-accordion');
  accordionCards.forEach((card) => {
    card.addEventListener('click', () => {
      // 다른 카드 닫기
      accordionCards.forEach((c) => {
        if (c !== card) c.classList.remove('open');
      });
      // 현재 카드 토글
      card.classList.toggle('open');
    });
  });
});
