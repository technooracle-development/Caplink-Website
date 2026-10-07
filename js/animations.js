/* CapLink — scroll reveal (respects prefers-reduced-motion). */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Stagger children of [data-reveal-stagger] containers
  document.querySelectorAll("[data-reveal-stagger]").forEach(function (group) {
    var step = parseFloat(group.getAttribute("data-reveal-stagger")) || 0.08;
    Array.prototype.forEach.call(group.querySelectorAll(":scope > [data-reveal]"), function (el, i) {
      el.style.setProperty("--reveal-delay", (i * step).toFixed(2) + "s");
    });
  });

  // Index bars so they fill one after another
  document.querySelectorAll(".breakdown").forEach(function (list) {
    list.querySelectorAll(".bar__fill").forEach(function (bar, i) {
      bar.style.setProperty("--i", i);
    });
  });

  var targets = document.querySelectorAll("[data-reveal], [data-animate-on-view]");

  if (reduce || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  targets.forEach(function (el) { io.observe(el); });
})();
