(function () {
  "use strict";

  // Ano atual no rodapé
  var anoEl = document.getElementById("ano");
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  // Menu mobile
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navMenu.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Contadores animados na seção de números
  var statNumbers = document.querySelectorAll(".stat-number");

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-target"), 10) || 0;
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString("pt-BR");
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString("pt-BR");
      }
    }

    requestAnimationFrame(step);
  }

  if (statNumbers.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statNumbers.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    statNumbers.forEach(function (el) {
      el.textContent = el.getAttribute("data-target");
    });
  }

  // Formulário de contato (placeholder - sem backend)
  var contactForm = document.getElementById("contactForm");
  var formFeedback = document.getElementById("formFeedback");

  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        formFeedback.textContent = "Por favor, preencha todos os campos corretamente.";
        formFeedback.style.color = "#c0392b";
        return;
      }

      // TODO: integrar com backend/serviço de e-mail real.
      formFeedback.textContent = "Mensagem recebida! Em breve nossa equipe entrará em contato.";
      formFeedback.style.color = "#1f6feb";
      contactForm.reset();
    });
  }
})();
