let productlist = document.getElementById("productlist");
let subtotal = document.getElementById("subTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || {};

function showData() {
    productlist.innerHTML = ""; 
    subtotal.innerHTML = ""; 

    if (Object.keys(cart).length === 0) {
        productlist.innerHTML = "Your cart is empty";
        subtotal.innerHTML = "Subtotal: $0";
        return;
    }

    let total = 0; 

    Object.values(cart).forEach((product) => {
        let div = document.createElement("div");

        let title = document.createElement("p");
        title.innerHTML = `Title: ${product.title}`;

        let price = document.createElement("p");
        price.innerHTML = `Price: $${product.price}`;

        let quantity = document.createElement("p");
        quantity.innerHTML = `Quantity: ${product.quantity}`;

        let removeBtn = document.createElement("button");
        removeBtn.innerHTML = "Remove from Cart";
        removeBtn.addEventListener("click", function () {
            removeHandler(product.id);
        });

        div.append(title, price, quantity, removeBtn);
        productlist.append(div);

        // Calculate subtotal
        total += Number(product.price) * Number(product.quantity);
    });

    // Update subtotal display
    subtotal.innerHTML = `Subtotal: $${total.toFixed(2)}`;
}

function removeHandler(productId) {
    delete cart[productId]; // Remove product from cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    showData(); 
}

showData();
