"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assigment

   Shopping Cart Form Script
   
   Author: Kyle Harris
   Date: 04/11/2025
   
   Filename: co_cart.js
   
   Function List
   =============
   
   calcCart()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/ 

function calcCart() {
   // Get the product cost
   var modelCost = parseFloat(document.getElementById("modelCost").value);
   
   // Get the quantity selected
   var modelQty = parseInt(document.getElementById("modelQty").value);
   
   // Calculate the order cost
   var orderCost = modelCost * modelQty;
   document.getElementById("orderCost").value = formatUSCurrency(orderCost);
   
   // Get the shipping cost based on the selected shipping option
   var shippingCost = 0;
   var shippingOptions = document.getElementsByName("shipping");
   
   for (var i = 0; i < shippingOptions.length; i++) {
      if (shippingOptions[i].checked) {
         shippingCost = parseFloat(shippingOptions[i].value);
         document.getElementById("shippingCost").value = formatUSCurrency(shippingCost);
         break;
      }
   }

   // Calculate the subtotal (product cost * quantity + shipping cost)
   var subTotal = orderCost + shippingCost;
   document.getElementById("subTotal").value = formatUSCurrency(subTotal);

   // Calculate the sales tax (5%)
   var salesTax = subTotal * 0.05;
   document.getElementById("salesTax").value = formatUSCurrency(salesTax);

   // Calculate the total (subtotal + sales tax)
   var cartTotal = subTotal + salesTax;
   document.getElementById("cartTotal").value = formatUSCurrency(cartTotal);
   
   return true; // Ensure the form can be submitted
}

window.addEventListener("load", function() {
   // Code that will be executed after the page has loaded
   console.log("Page has fully loaded");

   // Example: You can now call your calcCart function here or set up event listeners for other elements.
   calcCart();
});






function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}
