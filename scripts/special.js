const API_BASE = "https://pizza-backend-sxgs.onrender.com/api";
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

document.addEventListener("DOMContentLoaded", () => {
  fetchSpecials();
  updateCartIcon();
});

async function fetchSpecials() {
  const container = document.getElementById("special-list");
  container.innerHTML = "<p>Kraunama...</p>";

  try {
    const res = await fetch(`${API_BASE}/specials`);
    if (!res.ok) throw new Error("Nepavyko gauti specialių pasiūlymų");

    const specials = await res.json();

    container.innerHTML = specials
      .map(
        (s, index) => `
        <div class="special-card">
          <div class="special-img-wrap">
            <img src="${
              s.image ||
              "https://thumbs.dreamstime.com/b/shawarma-wrap-fries-soda-can-served-as-fast-food-combo-black-reflective-background-meal-crispy-french-paper-bag-377913399.jpg"
            }" alt="${s.title}" class="special-img">
          </div>
          <div class="special-info">
            <h3>${s.title}</h3>
            <p>${s.description}</p>
            <span class="badge">${
              s.discount ? `-${s.discount}%` : "Pasiūlymas"
            }</span>
            <button class="add-combo" data-index="${index}">Pridėti Combo</button>
          </div>
        </div>
      `
      )
      .join("");

    document.querySelectorAll(".add-combo").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const i = e.target.dataset.index;
        addComboToCart(specials[i]);
      });
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>❌ Klaida kraunant pasiūlymus</p>";
  }
}

function addComboToCart(special) {
  if (!special.items || !Array.isArray(special.items)) return;

  special.items.forEach((item) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        ...item,
        quantity: 1,
      });
    }
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();

  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) cartBtn.scrollIntoView({ behavior: "smooth" });
}

function updateCartIcon() {
  const cartCountEl = document.getElementById("cart-count");
  if (!cartCountEl) return;
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalQty;
}
