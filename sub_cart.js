"use strict";

/*

   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Case Problem 2

   Filename: sub_cart.js

   Functions List:
   setupCart() 
      Sets up the event handlers for the Add to Order buttons on the web page.
      
   addItem(e)
      Adds the food item associated with the Add to Order button to the shopping
      cart, keeping track of the number of items of each product ordered by 
      the customer.

*/

window.addEventListener("load", setupCart);

let cart = [];  // Array to hold items in the shopping cart

function setupCart() {
    // Get all Add to Order buttons
    const addButtons = document.querySelectorAll(".addButton");

    // Set the onclick attribute for each button
    addButtons.forEach(button => {
        button.onclick = addItem;
    });

    console.log("✅ setupCart() function executed.");
}

function addItem(e) {
    var itemDiv = e.target.closest(".menuItem");
    var foodItem = e.target.nextElementSibling; // Target `div` within `.menuItem`
    var foodID = foodItem.getAttribute("id");
    var cartBox = document.getElementById("cart");
    var duplicateOrder = false;
    var foodDescription = foodItem.cloneNode(true);

    if (!foodItem || !foodID) {
        console.error("Food item or food ID not found.");
        return;
    }

    var itemName = foodItem.querySelector("h1").textContent;
    var itemPrice = parseFloat(foodItem.querySelector("p").textContent.split(": $")[1]);

    let item = cart.find(cartItem => cartItem.name === itemName);

    if (item) {
        // Duplicate item logic
        item.quantity++;
        const spanElement = cartBox.querySelector(`#${foodID}-quantity`);
        if (spanElement) {
            spanElement.textContent = item.quantity; // Update quantity
        } else {
            console.error(`Order count span for ${foodID} not found!`);
        }
    } else {
        // Add new item logic
        item = { name: itemName, price: itemPrice, quantity: 1, id: foodID };
        cart.push(item);
    }

    updateCartDisplay(cartBox);
    console.log(`✅ Item added: ${itemName} | Price: $${itemPrice} | Quantity: ${item.quantity}`);
}

function updateCartDisplay(cartBox) {
    cartBox.innerHTML = "<h1>Shopping Cart</h1>"; // Clear previous contents

    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `${item.name} - $${item.price} x `;

        const spanElement = document.createElement("span");
        spanElement.textContent = item.quantity;
        spanElement.setAttribute("id", `${item.id}-quantity`);

        itemDiv.appendChild(spanElement);
        cartBox.appendChild(itemDiv);
    });

    console.log("✅ Cart updated.");
}


