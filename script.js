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

    cartIcon.addEventListener("click", () => {
        cartContainer.classList.toggle("open");
        updateCartVisibility();
    });
    closeCart.addEventListener("click", () => {
        cartContainer.classList.remove("open");
    });

    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const quantityElement = document.querySelector(`.quantity[data-name="${name}"]`);
            const image = button.getAttribute("data-source");
            const quantity = parseInt(quantityElement.innerText);

            console.log(name, price, quantity, image);

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({ name, price, quantity, image });
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


    function updateCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="imagen-bloque">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <p>${item.name} - $${item.price.toFixed(2)}</p>
                <div class="cart-quantity-controls">
                    <button class="cart-decrease" data-name="${item.name}">-</button>
                    <span class="cart-quantity" data-name="${item.name}">${item.quantity}</span>
                    <button class="cart-increase" data-name="${item.name}">+</button>
                </div>
                <p>Total: <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span></p>
                <button class="remove-item" data-name="${item.name}">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
                <hr>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        cartTotal.innerText = `Total: $${total.toFixed(2)}`;
        attachCartEvents();
        updateCartVisibility();
    }

    

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
            cartTotal.classList.add("total-amount");
            document.getElementById("checkout-btn").style.display = "block";
        }
    }

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
