// The feature tour: the step crossing the reading line picks the pinned phone's screenshot.
(function () {
  const tour = document.querySelector(".tour");
  if (!tour || !("IntersectionObserver" in window)) return;
  const steps = [...tour.querySelectorAll(".step")];
  const shots = [...tour.querySelectorAll(".shot")];
  const dots = [...tour.querySelectorAll(".tour-dots span")];
  document.documentElement.classList.add("js");

  const show = (index) => {
    steps.forEach((s, i) => s.classList.toggle("is-active", i === index));
    shots.forEach((s, i) => s.classList.toggle("is-on", i === index));
    dots.forEach((d, i) => d.classList.toggle("is-on", i === index));
  };

  // Narrow screens pin the phone over the top half, so the words are read lower down.
  const line = matchMedia("(max-width: 820px)").matches ? "-68% 0px -30% 0px" : "-45% 0px -45% 0px";
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) show(steps.indexOf(entry.target));
    }
  }, { rootMargin: line });
  steps.forEach((s) => observer.observe(s));
})();
