document.addEventListener("DOMContentLoaded", () => {
  // Cart logic
  const cartKey = "hairGlowCart";

  function getCart() {
    const cart = localStorage.getItem(cartKey);
    return cart ? JSON.parse(cart) : [];
  }

  function saveCart(cart) {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }

  function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart(cart);
    alert(`${product.name} added to cart!`);
  }

  // Add to cart buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const container = e.target.parentElement;
      const name = container.querySelector("h3").textContent;
      const priceText = container.querySelector("p").textContent;
      const price = parseFloat(priceText.replace(/[^\d.]/g, ""));
      const image = container.querySelector("img").getAttribute("src");
      const product = { name, price, image };
      addToCart(product);
    });
  });

  // Toggle nav for mobile
  const toggleBtn = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  toggleBtn.addEventListener("click", () => {
    navbar.classList.toggle("show");
  });

  // Popup logic
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("close-popup");

  // Auto-show popup on page load
  if (popup) {
    popup.style.display = "flex";
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }

  // Optional: Close if you click outside the image
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});
