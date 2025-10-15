function toggleMenu() {
  const navLinks = document.querySelector(".nav-link");
  navLinks.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", () => {
  // Rodyti intro tik vieną kartą
  if (!localStorage.getItem("pizzaShown")) {
    const container = document.querySelector(".container");
    if (container) container.classList.add("show");
    localStorage.setItem("pizzaShown", "true");
  }

  // Atnaujinti krepšelio skaičių
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  updateCartCount(cart);

  // Scroll animacijos
  const hiddenElements = document.querySelectorAll(".hidden");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  hiddenElements.forEach((el) => observer.observe(el));

  // Picos
  fetchPizzas();

  // 🛒 Kai paspaudi ant bet kurio „cart“ elemento – atveria checkout.html
  const cartCount = document.getElementById("cart-count");
  const cartIcon =
    document.querySelector(".cart-icon") || document.querySelector("#cart"); // gali būti .cart-icon arba #cart
  if (cartCount) {
    cartCount.style.cursor = "pointer";
    cartCount.addEventListener("click", () => {
      window.location.href = "/checkout.html";
    });
  }
  if (cartIcon) {
    cartIcon.style.cursor = "pointer";
    cartIcon.addEventListener("click", () => {
      window.location.href = "/checkout.html";
    });
  }
});

function updateCartCount(cart) {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

function addPizzaToCart(pizzaData) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingPizza = cart.find((item) => item.id === pizzaData.id);

  if (existingPizza) {
    existingPizza.quantity += 1;
  } else {
    cart.push({ ...pizzaData, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount(cart);
  window.location.href = "/checkout.html";
}

function fetchPizzas() {
  fetch("https://6748a82a5801f5153591c1dd.mockapi.io/pizzas/1/products")
    .then((response) => response.json())
    .then((data) => {
      const pizzaLists = Array.from({ length: 5 }, (_, i) =>
        document.querySelector(`.list${i + 1}`)
      );

      pizzaLists.forEach((list) => {
        if (list) list.innerHTML = "";
      });

      // 🧩 Normalizuojam kainas
      data
        .filter((pizza) => ["1", "2", "3", "4", "5"].includes(pizza.id))
        .forEach((pizza, index) => {
          const list = pizzaLists[index];
          if (list) {
            // Jei kaina per didelė ar nėra – priskirti atsitiktinę normalią kainą
            let price = parseFloat(pizza.price);
            if (isNaN(price) || price > 50) {
              price = (8 + Math.random() * 7).toFixed(2); // 8.00–15.00 €
            }

            const pizzaElement = document.createElement("div");
            pizzaElement.className = "pizza-item";
            pizzaElement.innerHTML = `
              <div style="display: flex; flex-direction: column; align-items: center; padding: 2rem;">
                <h2>${pizza.title}</h2>
                <img src="${pizza.img_url}" alt="${pizza.title}" class="order-mainBg" style="width: 400px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                <p style="margin-top: 0.5rem; font-weight: 600; font-size: 1.1rem; color: #ff5722;">€${price}</p>
                <button class="add-to-cart" 
                  data-id="${pizza.id}" 
                  data-name="${pizza.title}" 
                  data-image="${pizza.img_url}" 
                  data-price="${price}" 
                  style="margin-top: 1rem; background: #FF5733; border: none; color: #fff; 
                  padding: 1rem 2rem; border-radius: 6px; cursor: pointer; font-size: 0.9rem; 
                  transition: background 0.2s ease;">Buy</button>
              </div>
            `;

            list.appendChild(pizzaElement);
            pizzaElement
              .querySelector(".add-to-cart")
              .addEventListener("click", (e) => {
                const button = e.target;
                addPizzaToCart({
                  id: button.dataset.id,
                  name: button.dataset.name,
                  image: button.dataset.image,
                  price: parseFloat(button.dataset.price),
                });
              });
          }
        });
    })
    .catch((error) => console.error("Failed to fetch pizzas:", error));
}
