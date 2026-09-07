function trackHeaderHeight() {
  const navbar = document.querySelector(".nav");
  if (!navbar) return;

  // Keep anchor targets visible below both rows, including wrapped mobile labels.
  const header = navbar.closest("header");
  if (header) {
    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--site-header-height",
        `${header.getBoundingClientRect().height}px`
      );
    };
    new ResizeObserver(updateHeaderHeight).observe(header);
    updateHeaderHeight();
  }
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
    toggleBtn.setAttribute("aria-label", "Užverti meniu");
  };

  const closeMenu = () => {
    navLinks.classList.remove("active");
    toggleBtn.classList.remove("active");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Atverti meniu");
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
    if (e.key === "Escape" && navLinks.classList.contains("active")) {
      closeMenu();
      toggleBtn.focus();
    }
  });

  window.matchMedia("(max-width: 1024px)").addEventListener("change", closeMenu);
}

document.addEventListener("DOMContentLoaded", () => {
  trackHeaderHeight();
  handleMenuToggle();
});
