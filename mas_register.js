"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 3


   Filename: mas_register.js

   Author: Kyle Harris
   Date: 04/25/2025   
   
   Function List
   =============
   
   formTest()
      Performs a validation test on the selection of the conference
      session package and the conference discount number
   
   calcCart()
      Calculates the cost of the registration and saves data
      in session storage
      
   writeSessionValues()
      Writes data values from session storage in to the
      registration summary form

*/

// Set up event listeners after the page fully loads
window.addEventListener("load", function() {

    // Calculate the cart totals when the page loads
    calcCart();
 
    // Validate the form when the user clicks "continue"
    document.getElementById("regSubmit").onclick = sessionTest;
 
    // Recalculate the cart when user leaves (onblur) any of these fields
    var fields = ["fnBox", "lnBox", "groupBox", "mailBox", "phoneBox", "banquetBox"];
    fields.forEach(function(fieldId) {
       document.getElementById(fieldId).onblur = calcCart;
    });
 
    // Recalculate the cart when the user changes the session selection
    document.getElementById("sessionBox").onchange = calcCart;
 
    // Recalculate the cart when the media pack checkbox is clicked
    document.getElementById("mediaCB").onclick = calcCart;
 });

 function sessionTest() {
    var sessionBox = document.getElementById("sessionBox");
    
    if (sessionBox.selectedIndex === -1) {
       sessionBox.setCustomValidity("Select a Session Package");
    } else {
       sessionBox.setCustomValidity("");
    }
 }

"use strict";

function calcCart() {
   let firstName = document.getElementById("fnBox").value;
   let lastName = document.getElementById("lnBox").value;
   let group = document.getElementById("groupBox").value;
   let email = document.getElementById("mailBox").value;
   let phoneNumber = document.getElementById("phoneBox").value;
   let banquetGuests = document.getElementById("banquetBox").value;
   let sessionBox = document.getElementById("sessionBox");
   let mediaPack = document.getElementById("mediaCB");

   // Store user information
   sessionStorage.confName = `${firstName} ${lastName}`;
   sessionStorage.confGroup = group;
   sessionStorage.confMail = email;
   sessionStorage.confPhone = phoneNumber;
   sessionStorage.confBanquet = banquetGuests;

   // Calculate and store banquet cost
   sessionStorage.confBanquetCost = banquetGuests ? parseFloat(banquetGuests) * 55 : 0;

   // Store session selection details
   if (sessionBox.selectedIndex !== -1) {
      sessionStorage.confSession = sessionBox.options[sessionBox.selectedIndex].text;
      sessionStorage.confSessionCost = sessionBox.options[sessionBox.selectedIndex].value;

   } else {
      sessionStorage.confSession = "";
      sessionStorage.confSessionCost = 0;
   }

   // Store media pack selection
   sessionStorage.confPack = mediaPack.checked ? "yes" : "no";
   sessionStorage.confPackCost = mediaPack.checked ? 115 : 0;

   // Calculate total registration cost
   sessionStorage.confTotal = parseFloat(sessionStorage.confSessionCost) + 
                              parseFloat(sessionStorage.confBanquetCost) + 
                              parseFloat(sessionStorage.confPackCost);

   // Call function to update displayed values
   writeSessionValues();
}

function writeSessionValues() {
   document.getElementById("regName").textContent = sessionStorage.confName;
   document.getElementById("regGroup").textContent = sessionStorage.confGroup;
   document.getElementById("regEmail").textContent = sessionStorage.confMail;
   document.getElementById("regPhone").textContent = sessionStorage.confPhone;
   document.getElementById("regSession").textContent = sessionStorage.confSession;
   document.getElementById("regBanquet").textContent = sessionStorage.confBanquet;
   document.getElementById("regPack").textContent = sessionStorage.confPack;
   document.getElementById("regTotal").textContent = `$${sessionStorage.confTotal}`;
}
