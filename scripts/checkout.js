const API_BASE = "https://pizza-backend-sxgs.onrender.com/api";

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  setupCheckoutButton();
  loadUpsellProducts();
});

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotalEl) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Krepšelis tuščias 🛒</p>";
    cartTotalEl.textContent = "€0.00";
    return;
  }

  cart.forEach((item) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>Kiekis: ${item.quantity} × €${item.price.toFixed(2)}</p>
      </div>
    `;
    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalEl.textContent = `€${total.toFixed(2)}`;
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function loadUpsellProducts() {
  const upsellContainer = document.getElementById("upsell-list");
  if (!upsellContainer) return;

  upsellContainer.innerHTML = "<p>Kraunama...</p>";

  try {
    const res = await fetch(`${API_BASE}/upsell`);
    let upsellProducts = await res.json();

    upsellProducts = upsellProducts.map((p) => ({
      ...p,
      id: p._id || p.id,
    }));

    renderUpsell(upsellProducts);
  } catch (err) {
    console.warn("⚠️ Upsell API nepavyko, naudojami fallback duomenys", err);
    renderUpsell([]);
  }
}

function renderUpsell(products) {
  const upsellContainer = document.getElementById("upsell-list");
  upsellContainer.innerHTML = "";

  if (!products || products.length === 0) {
    upsellContainer.innerHTML = "<p>Šiuo metu papildomų pasiūlymų nėra.</p>";
    return;
  }

  products.forEach((p) => {
    const upsellItem = document.createElement("div");
    upsellItem.classList.add("upsell-item");
    upsellItem.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="upsell-text">
        <p class="upsell-question">Pridėti prie savo užsakymo?</p>
        <h4>${p.name}</h4>
        <p class="upsell-price">€${p.price.toFixed(2)}</p>
      </div>
      <button class="upsell-add-btn" data-id="${p.id}">PRIDĖTI</button>
    `;
    upsellContainer.appendChild(upsellItem);
  });

  upsellContainer.querySelectorAll(".upsell-add-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = btn.getAttribute("data-id");
      const product = products.find((p) => p.id === productId);
      if (product) addUpsellToCart(product);
    });
  });
}

function addUpsellToCart(product) {
  const pid = product.id || product._id;
  const existing = cart.find((item) => item.id === pid || item._id === pid);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: pid,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  }

  renderCart();

  const btn = document.querySelector(`[data-id="${pid}"]`);
  if (btn) {
    btn.textContent = "✅ Pridėta!";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "PRIDĖTI";
      btn.disabled = false;
    }, 1500);
  }
}

function setupCheckoutButton() {
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!checkoutBtn) {
    console.error("❌ Checkout mygtukas nerastas!");
    return;
  }

  checkoutBtn.addEventListener("click", async () => {
    if (cart.length === 0) {
      alert("Krepšelis tuščias!");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Nepavyko sukurti Stripe sesijos");
        console.error(data);
      }
    } catch (err) {
      console.error(err);
      alert("Įvyko klaida siunčiant į Stripe");
    }
  });
}
