/* CapLink — navigation: sticky header state, mobile menu, legal TOC. */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-menu");
  var desktopQuery = window.matchMedia("(min-width: 1181px)");

  /* Header: stronger glass once the page scrolls */
  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile menu */
  if (toggle && menu) {
    var lastFocus = null;

    var focusables = function () {
      return Array.prototype.slice.call(
        menu.querySelectorAll("a[href], button:not([disabled])")
      );
    };

    var openMenu = function () {
      lastFocus = document.activeElement;
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", "Close menu");
      menu.hidden = false;
      // allow the browser to paint before animating in
      document.body.classList.add("menu-open");
      requestAnimationFrame(function () {
        menu.classList.add("is-open");
      });
      window.setTimeout(function () {
        var first = focusables()[0];
        if (first) first.focus({ preventScroll: true });
      }, 60);
    };

    var closeMenu = function (restoreFocus) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      window.setTimeout(function () {
        if (toggle.getAttribute("aria-expanded") === "false") menu.hidden = true;
      }, 300);
      if (restoreFocus !== false) (lastFocus || toggle).focus({ preventScroll: true });
    };

    menu.hidden = true;

    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      // keep keyboard focus inside the open menu (toggle + links)
      if (e.key === "Tab") {
        var items = [toggle].concat(focusables());
        var idx = items.indexOf(document.activeElement);
        if (e.shiftKey && idx <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && idx === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    });

    var onBreakpoint = function (e) {
      if (e.matches && toggle.getAttribute("aria-expanded") === "true") closeMenu(false);
    };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", onBreakpoint);
    else if (desktopQuery.addListener) desktopQuery.addListener(onBreakpoint);
  }

  /* Legal pages: highlight the current section in the table of contents */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) {
      map[a.getAttribute("href").slice(1)] = a;
    });
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
          var link = map[entry.target.id];
          if (link) link.classList.add("is-active");
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }
})();
