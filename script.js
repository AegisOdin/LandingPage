document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon");
    const cartContainer = document.getElementById("cart-container");
    const closeCart = document.getElementById("close-cart");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartEmpty = document.getElementById("cart-empty");
    const orderNowBtn = document.querySelector(".order-now-btn");
    const increaseQuantityButtons = document.querySelectorAll(".increase-quantity");
    const decreaseQuantityButtons = document.querySelectorAll(".decrease-quantity");
    const gridItems = document.querySelectorAll(".grid-item");

    let cart = [];

    // Abrir y cerrar el carrito
    cartIcon.addEventListener("click", () => {
        cartContainer.classList.toggle("open");
        updateCartVisibility();
    });
    closeCart.addEventListener("click", () => {
        cartContainer.classList.remove("open");
    });

    // Agregar items al carrito
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const quantityElement = document.querySelector(`.quantity[data-name="${name}"]`);
            const quantity = parseInt(quantityElement.innerText);

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity });
            }
            updateCart();
        });
    });

    increaseQuantityButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const quantityElement = document.querySelector(`.quantity[data-name="${name}"]`);
            let quantity = parseInt(quantityElement.innerText);
            quantity += 1;
            quantityElement.innerText = quantity;
        });
    });

    // Disminuir cantidad en la tienda
    decreaseQuantityButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const quantityElement = document.querySelector(`.quantity[data-name="${name}"]`);
            let quantity = parseInt(quantityElement.innerText);
            if (quantity > 1) {
                quantity -= 1;
                quantityElement.innerText = quantity;
            }
        });
    });

    // Aumentar cantidad
    increaseQuantityButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const quantityElement = document.querySelector(`.quantity[data-name="${name}"]`);
            let quantity = parseInt(quantityElement.innerText);
            quantity += 1;
            quantityElement.innerText = quantity;
        });
    });

    // Disminuir cantidad
    decreaseQuantityButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const quantityElement = document.querySelector(`.quantity[data-name="${name}"]`);
            let quantity = parseInt(quantityElement.innerText);
            if (quantity > 1) {
                quantity -= 1;
                quantityElement.innerText = quantity;
            }
        });
    });

    // Actualizar el carrito
    /* 
    <p>${item.name} - $${item.price.toFixed(2)}</p>
    */
      // Actualizar el carrito
    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <p>${item.name}</p>
                <p>$${item.price.toFixed(2)}</p>
                <div class="imagen-bloque">
                    <img src="imagen/bebida1.png">
                </div>
                <div class="cart-quantity-controls">
                    <button class="cart-decrease" data-name="${item.name}">-</button>
                    <span class="cart-quantity" data-name="${item.name}">${item.quantity}</span>
                    <button class="cart-increase" data-name="${item.name}">+</button>
                </div>
                <p>Total: $<span class="item-total">${(item.price * item.quantity).toFixed(2)}</span></p>
                <button class="remove-item" data-name="${item.name}">❌</button>
                <hr>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.innerText = `Total: $${total.toFixed(2)}`;
        attachCartEvents();
        updateCartVisibility();
    }

    // Eliminar elementos del carrito
    // Asignar eventos a los botones dentro del carrito
    function attachCartEvents() {
        document.querySelectorAll(".cart-increase").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.getAttribute("data-name");
                const item = cart.find(i => i.name === name);
                if (item) {
                    item.quantity += 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll(".cart-decrease").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.getAttribute("data-name");
                const item = cart.find(i => i.name === name);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const name = button.getAttribute("data-name");
                cart = cart.filter(item => item.name !== name);
                updateCart();
            });
        });
    }

    // Actualizar la visibilidad del carrito vacío
    function updateCartVisibility() {
        if (cart.length === 0) {
            cartEmpty.style.display = "block";
            cartItemsContainer.style.display = "none";
            cartTotal.style.display = "none";
            document.getElementById("checkout-btn").style.display = "none";
        } else {
            cartEmpty.style.display = "none";
            cartItemsContainer.style.display = "block";
            cartTotal.style.display = "block";
            document.getElementById("checkout-btn").style.display = "block";
        }
    }

    // Negrear el fondo
    const cartOverlay = document.getElementById("cart-overlay");
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

    // Botón de "ORDER NOW"
    orderNowBtn.addEventListener("click", () => {
        // Aquí puedes agregar la lógica para redirigir a la página de menú o realizar otra acción
        alert("Redirigiendo a la página de menú...");
    });

    gridItems.forEach(item => {
        const image = item.querySelector("img");
        const title = item.querySelector(".title");

        image.addEventListener("click", () => toggleItem(item));
        title.addEventListener("click", () => toggleItem(item));
    });

    function toggleItem(selectedItem) {
        // Cierra todos los demás antes de abrir el nuevo
        gridItems.forEach(item => {
            if (item !== selectedItem) {
                item.classList.remove("expanded");
            }
        });

        // Alterna la expansión solo en el seleccionado
        selectedItem.classList.toggle("expanded");
    }
    
});
