/*
 * Site-wide light/dark toggle.
 *
 * Requires the inline Material palette snippet in the page <head> (defines
 * __md_set with __md_scope pointing at the education-course root and applies
 * html[data-theme] from the stored __palette before first paint).
 *
 * Uses any element marked [data-theme-toggle]; otherwise adds a .theme-toggle
 * button to the standard .site-header .container. Fires a "themechange" event
 * on window after each switch so pages that draw with computed colours can redraw.
 */
(function () {
  var root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  var buttons = [];

  function current() {
    var t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") return t;
    return mq && mq.matches ? "dark" : "light";
  }

  function label() {
    var next = current() === "dark" ? "Light mode" : "Dark mode";
    for (var i = 0; i < buttons.length; i++) buttons[i].textContent = next;
  }

  function toggle() {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    if (typeof __md_set === "function") {
      __md_set("__palette", {
        index: next === "dark" ? 1 : 0,
        color: { media: "", scheme: next === "dark" ? "slate" : "default", primary: "indigo", accent: "indigo" }
      });
    }
    label();
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
  }

  function init() {
    var found = document.querySelectorAll("[data-theme-toggle]");
    for (var i = 0; i < found.length; i++) buttons.push(found[i]);
    if (!buttons.length) {
      var host = document.querySelector(".site-header .container");
      if (host) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "theme-toggle";
        host.appendChild(btn);
        buttons.push(btn);
      }
    }
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].setAttribute("aria-label", "Switch colour scheme");
      buttons[j].addEventListener("click", toggle);
    }
    label();
  }

  if (mq) {
    var onSystemChange = function () {
      label();
      window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: current() } }));
    };
    if (mq.addEventListener) mq.addEventListener("change", onSystemChange);
    else if (mq.addListener) mq.addListener(onSystemChange);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
