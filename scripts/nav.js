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

  // ensure proper ARIA state
  toggleBtn.setAttribute("aria-expanded", "false");

  const openMenu = () => {
    navLinks.classList.add("active");
    toggleBtn.classList.add("active");
    toggleBtn.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    navLinks.classList.remove("active");
    toggleBtn.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
  };

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (navLinks.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // close when clicking a nav link (mobile)
  navLinks.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // close when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });

  // close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  handleNavbarScroll();
  handleMenuToggle();
});
