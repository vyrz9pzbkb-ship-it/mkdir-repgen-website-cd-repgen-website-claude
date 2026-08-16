(function () {
  "use strict";

  // Ano atual no rodapé
  document.querySelectorAll(".ano").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Menu hamburguer em tela cheia
  var menuToggle = document.getElementById("menuToggle");
  var menuClose = document.getElementById("menuClose");
  var fullNav = document.getElementById("fullNav");

  function openMenu() {
    fullNav.classList.add("open");
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    fullNav.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && fullNav) {
    menuToggle.addEventListener("click", openMenu);
    if (menuClose) menuClose.addEventListener("click", closeMenu);

    fullNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && fullNav.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // Animação de entrada ao rolar a página (fade + slide up)
  var fadeEls = document.querySelectorAll(".fade-up");

  if (fadeEls.length && "IntersectionObserver" in window) {
    var fadeObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    fadeEls.forEach(function (el) {
      fadeObserver.observe(el);
    });
  } else {
    fadeEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // Contadores animados (usados em algumas seções de números)
  var statNumbers = document.querySelectorAll(".stat-number[data-target]");

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
    var statObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            statObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    statNumbers.forEach(function (el) {
      statObserver.observe(el);
    });
  }

  // Acordeão (FAQ)
  var accordionItems = document.querySelectorAll(".accordion-item");

  accordionItems.forEach(function (item) {
    var trigger = item.querySelector(".accordion-trigger");
    var panel = item.querySelector(".accordion-panel");

    if (!trigger || !panel) return;

    trigger.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      accordionItems.forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".accordion-panel").style.maxHeight = null;
        other.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Diretório de pessoas (quem-e-quem): busca, filtro por departamento e modal de detalhe
  var peopleContainer = document.getElementById("peopleContainer");

  if (peopleContainer) {
    var searchInput = document.getElementById("peopleSearch");
    var filterPills = document.querySelectorAll(".filter-pill");
    var deptGroups = document.querySelectorAll(".dept-group");
    var personCards = document.querySelectorAll(".person-card");
    var activeFilter = "todos";

    function applyFilters() {
      var query = (searchInput ? searchInput.value : "").trim().toLowerCase();

      deptGroups.forEach(function (group) {
        var groupDept = group.getAttribute("data-dept");
        var visibleInGroup = 0;

        group.querySelectorAll(".person-card").forEach(function (card) {
          var name = card.getAttribute("data-name") || "";
          var title = card.getAttribute("data-title") || "";
          var dept = card.getAttribute("data-dept") || "";

          var matchesFilter = activeFilter === "todos" || dept === activeFilter;
          var matchesSearch = !query || name.includes(query) || title.includes(query) || dept.includes(query);

          var visible = matchesFilter && matchesSearch;
          card.style.display = visible ? "" : "none";
          if (visible) visibleInGroup++;
        });

        group.style.display = visibleInGroup > 0 ? "" : "none";
      });
    }

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    filterPills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        filterPills.forEach(function (p) { p.classList.remove("active"); });
        pill.classList.add("active");
        activeFilter = pill.getAttribute("data-filter");
        applyFilters();
      });
    });

    // Ao chegar com um hash na URL (ex: quem-e-quem.html#corporativo), seleciona
    // o filtro do departamento correspondente e rola suavemente até a seção.
    function activateDeptFromHash() {
      var hash = window.location.hash.replace("#", "");
      if (!hash) return;

      var targetPill = document.querySelector('.filter-pill[data-filter="' + hash + '"]');
      if (targetPill) {
        filterPills.forEach(function (p) { p.classList.remove("active"); });
        targetPill.classList.add("active");
        activeFilter = hash;
        applyFilters();
      }

      var targetGroup = document.getElementById(hash);
      if (targetGroup) {
        setTimeout(function () {
          targetGroup.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 60);
      }
    }

    activateDeptFromHash();
    window.addEventListener("hashchange", activateDeptFromHash);

    // Modal de detalhe da pessoa
    var modalOverlay = document.getElementById("personModal");
    var modalAvatar = document.getElementById("modalAvatar");
    var modalName = document.getElementById("modalName");
    var modalTitle = document.getElementById("modalTitle");
    var modalDept = document.getElementById("modalDept");
    var modalEmailBtn = document.getElementById("modalEmailBtn");
    var modalWhatsBtn = document.getElementById("modalWhatsBtn");
    var modalContactInfo = document.getElementById("modalContactInfo");
    var modalClose = document.getElementById("modalClose");

    function openModal(card) {
      var name = card.getAttribute("data-name-display");
      var title = card.getAttribute("data-title-display");
      var dept = card.getAttribute("data-dept-display");
      var phone = card.getAttribute("data-phone");
      var email = card.getAttribute("data-email");
      var initials = card.getAttribute("data-initials");
      var palette = card.getAttribute("data-palette");

      modalAvatar.textContent = initials;
      modalAvatar.className = "avatar avatar-lg palette-" + palette;
      modalName.textContent = name;
      modalTitle.textContent = title;
      modalDept.textContent = dept;
      modalEmailBtn.href = "mailto:" + email;

      if (phone) {
        modalWhatsBtn.href = "https://wa.me/55" + phone.replace(/\D/g, "") + "?text=Ol%C3%A1!";
        modalWhatsBtn.style.display = "";
        modalContactInfo.textContent = phone + " · " + email;
      } else {
        modalWhatsBtn.style.display = "none";
        modalContactInfo.textContent = email;
      }

      modalOverlay.classList.add("open");
      document.body.classList.add("menu-open");
    }

    function closeModal() {
      modalOverlay.classList.remove("open");
      document.body.classList.remove("menu-open");
    }

    personCards.forEach(function (card) {
      card.addEventListener("click", function (event) {
        if (event.target.closest(".card-action")) return;
        openModal(card);
      });
      card.addEventListener("keydown", function (event) {
        if (event.target.closest(".card-action")) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openModal(card);
        }
      });
    });

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener("click", function (event) {
        if (event.target === modalOverlay) closeModal();
      });
    }
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modalOverlay && modalOverlay.classList.contains("open")) {
        closeModal();
      }
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
      formFeedback.style.color = "#974c35";
      contactForm.reset();
    });
  }
})();
