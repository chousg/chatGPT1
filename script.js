document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 15 },
        { id: 3, name: 'Product 3', price: 20 },
        { id: 4, name: 'Product 4', price: 25 },
        { id: 5, name: 'Product 5', price: 30 },
        { id: 6, name: 'Product 6', price: 35 },
        { id: 7, name: 'Product 7', price: 40 },
        { id: 8, name: 'Product 8', price: 45 },
        { id: 9, name: 'Product 9', price: 50 },
        { id: 10, name: 'Product 10', price: 55 }
    ];

    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Display products
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product';
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <input type="number" id="quantity-${product.id}" value="0" min="0">
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    let cart = [];

    // Add to cart function
    window.addToCart = function(productId) {
        const quantityInput = document.getElementById(`quantity-${productId}`);
        const quantity = parseInt(quantityInput.value);

        if (quantity > 0) {
            const productToAdd = products.find(product => product.id === productId);
            const cartItem = cart.find(item => item.product.id === productId);

            if (cartItem) {
                cartItem.quantity += quantity;
            } else {
                cart.push({ product: productToAdd, quantity: quantity });
            }

            updateCart();
        }
    };

    // Update cart UI
    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                ${item.product.name} - Quantity: ${item.quantity}
                <button onclick="removeFromCart(${item.product.id})">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.product.price * item.quantity;
        });

        cartTotal.textContent = total.toFixed(2);
    }

    // Remove from cart function
    window.removeFromCart = function(productId) {
        const itemIndex = cart.findIndex(item => item.product.id === productId);
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
            updateCart();
        }
    };

    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            alert('Redirecting to checkout. Total amount: $' + cartTotal.textContent);
            // Here you can implement the actual checkout process (e.g., redirect to payment page)
            // For demonstration purposes, we'll just display an alert with the total amount.
        } else {
            alert('Your cart is empty. Please add some items.');
        }
    });

    // Initial cart update
    updateCart();
});
