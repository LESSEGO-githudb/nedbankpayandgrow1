document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("hairGlowCart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const subtotalElem = document.getElementById("subtotal");
    const totalElem = document.getElementById("total");
    const shippingCost = 40.00;
  
    function renderCart() {
      cartContainer.innerHTML = "";
      let subtotal = 0;
  
      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        subtotalElem.textContent = "0.00";
        totalElem.textContent = "0.00";
        return;
      }
  
      cart.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-item");
  
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" width="120">
          <h3>${item.name}</h3>
          <p>Price: R${item.price.toFixed(2)}</p>
          <div>
            <button class="decrease-btn" data-index="${index}">−</button>
            <span> ${item.quantity} </span>
            <button class="increase-btn" data-index="${index}">+</button>
          </div>
          <p>Subtotal: R${(item.price * item.quantity).toFixed(2)}</p>
          <hr>
        `;
  
        cartContainer.appendChild(itemDiv);
        subtotal += item.price * item.quantity;
      });
  
      subtotalElem.textContent = subtotal.toFixed(2);
      totalElem.textContent = (subtotal + shippingCost).toFixed(2);
  
      attachButtonListeners();
    }
  
    function attachButtonListeners() {
      // Increase quantity
      const increaseButtons = document.querySelectorAll(".increase-btn");
      increaseButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          const idx = parseInt(e.target.getAttribute("data-index"));
          cart[idx].quantity += 1;
          updateCart();
        });
      });
  
      // Decrease quantity
      const decreaseButtons = document.querySelectorAll(".decrease-btn");
      decreaseButtons.forEach(button => {
        button.addEventListener("click", (e) => {
          const idx = parseInt(e.target.getAttribute("data-index"));
          if (cart[idx].quantity > 1) {
            cart[idx].quantity -= 1;
          } else {
            cart.splice(idx, 1);
          }
          updateCart();
        });
      });
    }
  
    function updateCart() {
      localStorage.setItem("hairGlowCart", JSON.stringify(cart));
      renderCart();
    }
  
    renderCart();
  });

  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("menu-toggle");
    const navbar = document.getElementById("navbar");
  
    toggleBtn.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });
  });
  
  