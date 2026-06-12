// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    } else {
      entry.target.classList.remove("visible");
    }
  });
}, observerOptions);

// Observe all elements with fade-in-up-scroll class
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".fade-in-up-scroll");
  animatedElements.forEach((el) => observer.observe(el));
});

// Back to top button functionality
const backToTopButton = document.querySelector(".back-to-top");

// Show/hide button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("back-to-top_visible");
  } else {
    backToTopButton.classList.remove("back-to-top_visible");
  }
});

// Scroll to top when button is clicked
backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
