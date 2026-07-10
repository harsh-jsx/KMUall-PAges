// ===================== KMU University — Site Script =====================

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

  /* Program tabs (B.Tech / BCA) */
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

  /* Specialization pill toggle inside program card */
  document.querySelectorAll('.pill-row').forEach(function (row) {
    row.querySelectorAll('.pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        row.querySelectorAll('.pill').forEach(function (p) { p.classList.remove('active'); });
        pill.classList.add('active');
      });
    });
  });

  /* FAQ accordion */
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

  /* Counselling form submit -> redirect to thank-you page */
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

      // Pass a couple of values along so the thank-you page can personalize itself
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
