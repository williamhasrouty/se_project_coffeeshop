// Daily Special Generator
function generateDailySpecial() {
  const specialDrinks = [
    "Honey Cinnamon Latte",
    "Caramel Macchiato",
    "Vanilla Almond Cappuccino",
    "Maple Bourbon Latte",
    "Lavender Honey Latte",
    "Hazelnut Mocha",
    "Brown Sugar Cinnamon Cold Brew",
    "Cardamom Rose Latte",
    "Pumpkin Spice Latte",
    "White Chocolate Peppermint Mocha",
    "Coconut Cream Latte",
    "Salted Caramel Cold Brew",
  ];

  // Get current date and create a seed for consistent daily selection
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  );

  // Use day of year as seed for consistent daily random selection
  const randomIndex = dayOfYear % specialDrinks.length;
  const specialDrink = specialDrinks[randomIndex];

  // Update the DOM
  const specialElement = document.querySelector(".menu__daily-special-drink");
  if (specialElement) {
    specialElement.textContent = specialDrink;
  }
}

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

  // Generate daily special on page load
  generateDailySpecial();
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
