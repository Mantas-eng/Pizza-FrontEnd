function handleNavbarScroll() {
  const navbar = document.querySelector(".nav");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

function handleMenuToggle() {
  const toggleBtn = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-link");
  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    toggleBtn.classList.toggle("active"); // galim animuoti hamburger icon
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handleNavbarScroll();
  handleMenuToggle();
});
