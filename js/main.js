/* CapLink — applies site configuration and small page behaviours. */
(function () {
  "use strict";

  var cfg = window.CAPLINK_CONFIG || {};

  /* 1. Config-driven text and links ------------------------------------ */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var key = el.getAttribute("data-config");
    var value = cfg[key];
    if (value === undefined || value === null || value === "") return;

    if (key === "CONTACT_EMAIL") {
      if (!el.hasAttribute("data-config-keep-text")) el.textContent = value;
      if (el.tagName === "A") {
        var subject = el.getAttribute("data-mail-subject");
        el.href = "mailto:" + value + (subject ? "?subject=" + encodeURIComponent(subject) : "");
      }
      return;
    }
    el.textContent = value;
  });

  /* 2. Store links: real URL → open listing; "#" → show coming-soon note */
  document.querySelectorAll("[data-config-href]").forEach(function (el) {
    var url = cfg[el.getAttribute("data-config-href")];
    var isPlaceholder = !url || url === "#";

    if (!isPlaceholder) {
      el.href = url;
      el.target = "_blank";
      el.rel = "noopener";
      el.removeAttribute("aria-disabled");
      return;
    }

    el.addEventListener("click", function (e) {
      e.preventDefault();
      var noteId = el.getAttribute("aria-describedby");
      var note = noteId && document.getElementById(noteId);
      if (note) {
        note.hidden = false;
        note.textContent = el.getAttribute("data-placeholder-msg") || "This link will be available soon.";
      }
    });
  });

  /* 3. Calculator directory filter ------------------------------------- */
  var filterBar = document.querySelector("[data-filter-bar]");
  if (filterBar) {
    var cards = document.querySelectorAll("[data-categories]");
    var status = document.getElementById("filter-status");

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-filter]");
      if (!btn) return;
      var filter = btn.getAttribute("data-filter");

      filterBar.querySelectorAll("button[data-filter]").forEach(function (b) {
        b.setAttribute("aria-pressed", String(b === btn));
      });

      var shown = 0;
      cards.forEach(function (card) {
        var cats = card.getAttribute("data-categories").split(" ");
        var match = filter === "all" || cats.indexOf(filter) !== -1;
        card.hidden = !match;
        if (match) {
          shown += 1;
          card.classList.add("is-visible");
        }
      });

      if (status) {
        status.textContent = shown + (shown === 1 ? " calculator" : " calculators") + " shown";
      }
    });
  }
})();
