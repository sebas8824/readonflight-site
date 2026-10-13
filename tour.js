// The feature tour: the step nearest the middle of the screen picks the phone's screenshot.
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

  const middle = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) show(steps.indexOf(entry.target));
    }
  }, { rootMargin: "-45% 0px -45% 0px" });

  const reveal = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("seen");
        reveal.unobserve(entry.target);
      }
    }
  }, { threshold: 0.2 });

  steps.forEach((s) => { middle.observe(s); reveal.observe(s); });
})();
