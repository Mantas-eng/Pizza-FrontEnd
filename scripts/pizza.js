const API_BASE = "https://pizza-backend-sxgs.onrender.com/api";
let cart = JSON.parse(localStorage.getItem("cart") || "[]");

document.addEventListener("DOMContentLoaded", () => {
  fetchPizzas();
  updateCartIcon();
});

async function fetchPizzas() {
  const container = document.getElementById("pizza-list");
  container.innerHTML = "<p>Kraunama...</p>";

  try {
    const res = await fetch(`${API_BASE}/pizzas`);
    if (!res.ok) throw new Error("Klaida gaunant duomenis");
    const pizzas = await res.json();

    container.innerHTML = pizzas
      .map(
        (pizza) => `
      <div class="pizza-card">
        <img src="${pizza.image}" alt="${pizza.name}">
        <div class="info">
          <h3>${pizza.name}</h3>
          <p>${pizza.description || ""}</p>
          <div class="price">€${pizza.price.toFixed(2)}</div>
          <button class="add-to-cart" data-id="${pizza._id}" data-name="${
          pizza.name
        }" data-price="${pizza.price}" data-image="${pizza.image}">
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
    container.innerHTML = "<p>❌ Nepavyko užkrauti picų.</p>";
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
