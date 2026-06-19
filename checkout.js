document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("hairGlowCart")) || [];
  const checkoutItems = document.getElementById("checkout-items");
  const subtotalElem = document.getElementById("subtotal");
  const totalElem = document.getElementById("total");
  const form = document.getElementById("checkout-form");
  const confirmation = document.getElementById("confirmation-message");
  const submitButton = form.querySelector("button[type='submit']");
  const shippingCost = 40.00;
  let subtotal = 0;

  if (cart.length === 0) {
    checkoutItems.innerHTML = "<p>Your cart is empty.</p>";
    subtotalElem.textContent = "0.00";
    totalElem.textContent = "0.00";
    form.style.display = "none";
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.innerHTML = `
      <p><strong>${item.name}</strong> (x${item.quantity}) - R${(item.price * item.quantity).toFixed(2)}</p>
    `;
    checkoutItems.appendChild(itemDiv);
    subtotal += item.price * item.quantity;
  });

  subtotalElem.textContent = subtotal.toFixed(2);
  totalElem.textContent = (subtotal + shippingCost).toFixed(2);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("input[name='name']").value.trim();
    const email = form.querySelector("input[name='email']").value.trim();
    const address = form.querySelector("textarea[name='address']").value.trim();
    const paymentMethod = form.querySelector("input[name='paymentMethod']:checked")?.value;
    const total = (subtotal + shippingCost).toFixed(2);

    if (!name || !email || !address || !paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderDetails = cart.map(item =>
      `${item.name} (x${item.quantity}) - R${(item.price * item.quantity).toFixed(2)}`
    ).join("\n");

    const templateParams = {
      name,
      email,
      address,
      payment_method: paymentMethod,
      total,
      order: orderDetails
    };

    try {
      submitButton.disabled = true;

      const response = await emailjs.send(
        "service_d5s4e2s",        // ✅ Replace with your actual service ID
        "template_ooqn6i7",       // ✅ Replace with your template ID
        templateParams
      );

      console.log("✅ Email sent:", response.status, response.text);
      localStorage.removeItem("hairGlowCart");
      form.style.display = "none";
      confirmation.style.display = "block";
      checkoutItems.innerHTML = "";
      subtotalElem.textContent = "0.00";
      totalElem.textContent = "0.00";
    } catch (error) {
      alert("❌ There was an issue sending your confirmation email. Please try again.");
      console.error("EmailJS error:", error);
    } finally {
      submitButton.disabled = false;
    }
  });

  const toggleBtn = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");

  if (toggleBtn && navbar) {
    toggleBtn.addEventListener("click", () => {
      navbar.classList.toggle("show");
    });
  }
});
