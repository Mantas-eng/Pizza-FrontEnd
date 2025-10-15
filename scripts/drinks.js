const API_BASE = "https://pizza-backend-sxgs.onrender.com/api";
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

document.addEventListener("DOMContentLoaded", () => {
  fetchDrinks();
  updateCartIcon();
});

async function fetchDrinks() {
  const container = document.getElementById("drink-list");
  if (!container) return console.error("#drink-list nerastas HTML");

  container.innerHTML = "<p>Kraunama...</p>";

  try {
    const res = await fetch(`${API_BASE}/drinks`);
    if (!res.ok) throw new Error("Klaida gaunant duomenis");
    const drinks = await res.json();

    container.innerHTML = drinks
      .map(
        (drink) => `
        <div class="drink-card">
          <img src="${drink.image}" alt="${drink.name}">
          <div class="info">
            <h3>${drink.name}</h3>
            <p>${drink.size || ""}</p>
            <div class="price">€${drink.price.toFixed(2)}</div>
            <button class="add-to-cart" data-id="${drink._id}" data-name="${
          drink.name
        }" data-price="${drink.price}" data-image="${drink.image}">
               Buy
            </button>
          </div>
        </div>
      `
      )
      .join("");

    document.querySelectorAll(".add-to-cart").forEach((btn) => {
      btn.addEventListener("click", handleAddToCart);
    });
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>❌ Nepavyko užkrauti gėrimų.</p>";
  }
}

function handleAddToCart(e) {
  const btn = e.target;
  const item = {
    id: btn.dataset.id,
    name: btn.dataset.name,
    price: parseFloat(btn.dataset.price),
    image: btn.dataset.image,
    quantity: 1,
  };

  const existing = cart.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartIcon();

  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  cartBtn.classList.add("cart-bounce");
  setTimeout(() => cartBtn.classList.remove("cart-bounce"), 600);
}

function updateCartIcon() {
  const cartCountEl = document.getElementById("cart-count");
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountEl) cartCountEl.textContent = totalQty;
}

const cartBtn = document.getElementById("cart-btn");
if (cartBtn) {
  cartBtn.addEventListener("click", () => {
    window.location.href = "/checkout.html";
  });
}
