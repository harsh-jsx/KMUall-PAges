// ===================== KMU University — Site Script (UG Non-Engineering) =====================

document.addEventListener('DOMContentLoaded', function () {

  /* Sticky header shadow on scroll */
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      document.body.classList.toggle('nav-open');
    });
  }

  /* Click-to-play campus video (hero band) */
  const videoHero = document.getElementById('videoHero');
  if (videoHero) {
    videoHero.addEventListener('click', function () {
      const src = videoHero.getAttribute('data-video');
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = 'K.M. University Mathura';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      videoHero.appendChild(iframe);
    }, { once: true });
  }

  /* FAQ accordion (kept for consistency with sibling pages, no-op if absent) */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-answer').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* Hero "Get a callback" form */
  const counsellingForm = document.getElementById('counsellingForm');
  if (counsellingForm) {
    counsellingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!counsellingForm.checkValidity()) {
        counsellingForm.reportValidity();
        return;
      }

      window.KMULeadForm.submit(counsellingForm, {
        name: document.getElementById('fullName').value.trim(),
        course: document.getElementById('course').value
      });
    });
  }

  /* Footer "Request a callback" form */
  const footerCounsellingForm = document.getElementById('footerCounsellingForm');
  if (footerCounsellingForm) {
    footerCounsellingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!footerCounsellingForm.checkValidity()) {
        footerCounsellingForm.reportValidity();
        return;
      }

      window.KMULeadForm.submit(footerCounsellingForm, {
        name: document.getElementById('footerFullName').value.trim(),
        course: document.getElementById('footerCourse').value
      });
    });
  }

  /* Smooth scroll for on-page anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          document.body.classList.remove('nav-open');
        }
      }
    });
  });

});
