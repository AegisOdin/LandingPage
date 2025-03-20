document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon");
    const cartContainer = document.getElementById("cart-container");
    const closeCart = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    let cart = [];

    //abrir y cerrar el carrito

    cartIcon.addEventListener("click", () => {
        cartContainer.classList.toggle("open");
    });
    closeCart.addEventListener("click", () => {
        cartContainer.classList.remove("open");
    });

    //agregar items al carrito

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            updateCart();
        });
    });

    //actualizar el carrito
    
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-item" data-name="${item.name}">❌</button>
                <hr>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.innerText = `Total: $${total.toFixed(2)}`;
        attachRemoveEvents();
    }

    //eliminar elementos del carrito

    function attachRemoveEvents() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.getAttribute("data-name");
                cart = cart.filter(item => item.name !== name);
                updateCart();
            });
        });
    }

    //negrear el fondo

    document.addEventListener("DOMContentLoaded", () => {
        const cartIcon = document.getElementById("cart-icon");
        const cartContainer = document.getElementById("cart-container");
        const cartOverlay = document.getElementById("cart-overlay");
        const closeCart = document.getElementById("close-cart");
    
        cartIcon.addEventListener("click", () => {
            cartContainer.classList.add("open");
            cartOverlay.style.display = "block";
        });
    
        closeCart.addEventListener("click", () => {
            cartContainer.classList.remove("open");
            cartOverlay.style.display = "none";
        });
    
        cartOverlay.addEventListener("click", () => {
            cartContainer.classList.remove("open");
            cartOverlay.style.display = "none";
        });
    });
    

});
