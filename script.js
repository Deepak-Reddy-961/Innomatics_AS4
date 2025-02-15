document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".cart-icon");
    const cartPanel = document.querySelector(".cart-panel");
    const closeCartBtn = document.querySelector(".close-cart");
    const productsContainer = document.getElementById("product-list");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const products = [
        { id: 1, name: "iPhone 16", category: "mobiles", price: 79999, img: "images/iphone16.jpg" },
        { id: 2, name: "Samsung Galaxy S25 Ultra", category: "mobiles", price: 144999, img: "S25.jpg" },
        { id: 3, name: "Dell G15", category: "laptops", price: 89999, img: "dell15.avif" },
        { id: 4, name: "MSI Katana GF66", category: "laptops", price: 129999, img: "msi.jpg" },
        { id: 5, name: "HP Victus 16", category: "laptops", price: 75999, img: "hp.jpg" },
        { id: 6, name: "Sony WH-1000XM5", category: "accessories", price: 27999, img: "sony.jpg" },
        { id: 7, name: "JBL Flip 6", category: "accessories", price: 18999, img: "jbl.jpg" },
        { id: 8, name: "Samsung Galaxy Watch 6", category: "accessories", price: 31999, img: "sw.jpg" },
        { id: 9, name: "Canon EOS R7", category: "accessories", price: 45000, img: "conon.jpg" },
        { id: 10, name: "Logitech G502 Hero", category: "accessories", price: 2999, img: "lgt.jpg" }
    ];

    function renderProducts(category = "all") {
        productsContainer.innerHTML = "";
        const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);
        
        filteredProducts.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
                <img src="Images/${product.img}" alt="${product.name}">
                <h3>${product.name}</h3><br>
                <p>Rs. ${product.price}</p><br>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });

        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", (e) => {
                addToCart(parseInt(e.target.dataset.id));
            });
        });
    }

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="Images/${item.img}" alt="${item.name}">
                <div>
                    <h4>${item.name}</h4>
                    <p>Rs. ${item.price} x ${item.quantity}</p>
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        cartTotal.textContent = total;
        cartCount.textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    function addToCart(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;
        
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }

    window.updateQuantity = function (id, change) {
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
            cartItem.quantity += change;
            if (cartItem.quantity <= 0) {
                removeFromCart(id);
            } else {
                renderCart();
            }
        }
    };

    window.removeFromCart = function (id) {
        cart = cart.filter(item => item.id !== id);
        renderCart();
    };

    window.clearCart = function () {
        cart = [];
        localStorage.removeItem("cart");
        renderCart();
    };

    window.filterCategory = function (category) {
        renderProducts(category);
    };

    window.toggleCart = function () {
        cartPanel.classList.toggle("show-right");
    };

    closeCartBtn.addEventListener("click", () => {
        cartPanel.classList.remove("show-right");
    });

    renderProducts();
    renderCart();
});
