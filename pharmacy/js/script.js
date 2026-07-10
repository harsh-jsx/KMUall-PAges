// ===================== KMU University — Site Script (Pharmacy & Naturopathy) =====================

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

  /* Click-to-play video thumbnail */
  document.querySelectorAll('.video-thumb').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      const src = thumb.getAttribute('data-video');
      if (!src) return;
      const iframe = document.createElement('iframe');
      iframe.src = src;
      iframe.title = 'K.M. University Mathura';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      thumb.innerHTML = '';
      thumb.appendChild(iframe);
    }, { once: true });
  });

  /* In-page tab nav (B.Pharm / BNYS / Placements / Why KMU / Contact) — visual active state */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');
  tabButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const target = btn.getAttribute('data-tab');

      tabButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      programCards.forEach(function (card) {
        card.classList.toggle('active', card.id === target);
      });
    });
  });

  /* FAQ accordion (no-op if this page has no .faq-item) */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

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

  /* Programme labels used to personalize the thank-you page (kept in sync with thank-you.html) */
  const programLabels = {
    'b-pharm': 'B.Pharm (Bachelor of Pharmacy)',
    'bnys': 'BNYS (Bachelor of Naturopathy & Yogic Sciences)'
  };

  /* Hero counselling form submit -> redirect to thank-you page */
  const counsellingForm = document.getElementById('counsellingForm');
  if (counsellingForm) {
    counsellingForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!counsellingForm.checkValidity()) {
        counsellingForm.reportValidity();
        return;
      }

      const name = document.getElementById('fullName').value.trim();
      const course = document.getElementById('course').value;

      const params = new URLSearchParams({ name: name, course: course });
      window.location.href = 'thank-you.html?' + params.toString();
    });
  }

  /* Sticky "Quick Enquiry" sidebar form submit -> redirect to thank-you page */
  const quickEnquiryForm = document.getElementById('quickEnquiryForm');
  if (quickEnquiryForm) {
    quickEnquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!quickEnquiryForm.checkValidity()) {
        quickEnquiryForm.reportValidity();
        return;
      }

      const name = document.getElementById('qName').value.trim();
      const course = document.getElementById('qProgram').value;

      const params = new URLSearchParams({ name: name, course: course });
      window.location.href = 'thank-you.html?' + params.toString();
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
