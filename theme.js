// The header's light/dark toggle. Until it is used, the page follows the system; after, the choice is kept.
(function () {
  const root = document.documentElement;
  const system = matchMedia("(prefers-color-scheme: dark)");
  const current = () => root.dataset.theme || (system.matches ? "dark" : "light");

  const sync = () => {
    const theme = current();
    for (const button of document.querySelectorAll(".theme-toggle")) {
      button.setAttribute("aria-label", theme === "dark" ? button.dataset.toLight : button.dataset.toDark);
    }
    if (root.dataset.theme) {
      for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
        meta.content = theme === "dark" ? "#0f1620" : "#f4efe4";
      }
    }
  };

  for (const button of document.querySelectorAll(".theme-toggle")) {
    button.addEventListener("click", () => {
      root.dataset.theme = current() === "dark" ? "light" : "dark";
      try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
      sync();
    });
  }
  system.addEventListener("change", sync);
  sync();
})();
