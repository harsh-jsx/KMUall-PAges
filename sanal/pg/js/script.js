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

      window.KMULeadForm.submit(counsellingForm, {
        name: document.getElementById('fullName').value.trim(),
        course: document.getElementById('course').value
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
