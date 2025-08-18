"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Review Assignment

   Credit Card Form Script
   
   Author: 
   Date:   
   
   Filename: co_credit.js
   
   Function List
   =============
   
   runSubmit()
      Runs validation tests when the submit button is clicked
      
   validateCVC()
      Validates the credit card CVC number
      
   validateDate()
      Validates that the user has entered a valid expiration date for the credit card
      
   validateYear()
      Validates that the user has selected the expiration year of the credit card
      
   validateNumber()
      Validates that the user has entered a valid and legitimate card number
      
   validateCredit()
      Validates that the user has selected a credit card type
      
   validateName()
      Validates that the user has specified the name on the credit card
      
   sumDigits(numStr)
      Sums the digits characters in a text string
      
   luhn(idNum)
      Returns true of idNum satisfies the Luhn Algorithm

*/

function runSubmit(evt) {
   if (!validateName() || !validateCard() || !validateDate()) {
      // Prevent form submission if any validation fails
      evt.preventDefault();
   }
}


function validateDate() {
   const expDate = document.getElementById("expDate");
   const expValue = expDate.value.trim();
   const pattern = /^(0[1-9]|1[0-2])\/\d{4}$/; // Regex Code

   if (!pattern.test(expValue)) {
      alert("Expiration date must be in the format mm/yyyy.");
      expDate.focus();
      return false;
   }

   const parts = expValue.split("/");
   const expMonth = parseInt(parts[0]);
   const expYear = parseInt(parts[1]);

   const today = new Date();
   const currentMonth = today.getMonth() + 1; // JS months are 0-based
   const currentYear = today.getFullYear();

   if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      alert("Expiration date cannot be in the past.");
      expDate.focus();
      return false;
   }

   return true;
}


function initPaymentForm() {
   console.log("Payment form is ready for interaction.");

   // Attach validation handlers to each form element
   const cardHolder = document.getElementById("cardHolder");
   const cardNumber = document.getElementById("cardNumber");
   const expDate = document.getElementById("expDate");
   const cvc = document.getElementById("cvc");

   // Add event listeners for validation on blur or input change
   cardHolder.addEventListener("blur", validateCardHolder);
   cardNumber.addEventListener("blur", validateCardNumber);
   expDate.addEventListener("blur", validateExpirationDate);
   cvc.addEventListener("blur", validateCVC);

   // Optionally, you can add submit handler to check validation before form submission
   const creditForm = document.getElementById("credit");
   creditForm.addEventListener("submit", validateForm);
}

// Validation for cardholder name (non-empty check)
function validateCardHolder() {
   const cardHolder = document.getElementById("cardHolder");
   if (cardHolder.value.trim() === "") {
       alert("Card holder name is required.");
       cardHolder.focus();
       return false;
   }
   return true;
}

// Validation for card number (using regex pattern)
function validateCardNumber() {
   const cardNumber = document.getElementById("cardNumber");
   const pattern = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
   
   if (!pattern.test(cardNumber.value)) {
       alert("Please enter a valid credit card number.");
       cardNumber.focus();
       return false;
   }
   return true;
}

// Validation for expiration date (must match mm/yyyy format)
function validateExpirationDate() {
   const expDate = document.getElementById("expDate");
   const pattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
   
   if (!pattern.test(expDate.value)) {
       alert("Please enter a valid expiration date (mm/yyyy).");
       expDate.focus();
       return false;
   }
   return true;
}

// Validation for CVC (must be 3 or 4 digits)
function validateCVC() {
   const cvc = document.getElementById("cvc");
   const pattern = /^\d{3,4}$/;
   
   if (!pattern.test(cvc.value)) {
       alert("Please enter a valid CVC (3 or 4 digits).");
       cvc.focus();
       return false;
   }
   return true;
}

// Final form validation before submission
function validateForm(event) {
   if (!validateCardHolder() || !validateCardNumber() || !validateExpirationDate() || !validateCVC()) {
       event.preventDefault(); // Prevent form submission if any validation fails
       alert("Please correct the errors before submitting the form.");
   }
}

// Adding the window load event listener
window.addEventListener('load', function() {
   initPaymentForm(); // Initialize form validation on load
});








/* Functions already provided in the file */

function validateName() {
   var cardName = document.getElementById("cardHolder");
   if (cardName.validity.valueMissing) {
      cardName.setCustomValidity("Enter the card holder");
   } else {
      cardName.setCustomValidity("");
   }
}


function validateCredit() {
   var creditCard = document.forms.credit.elements.company[0];
   if (creditCard.validity.valueMissing) {
      creditCard.setCustomValidity("Select your credit card");
   } else {
      creditCard.setCustomValidity("");
   }
}

function validateNumber() {
   var cardNumber = document.getElementById("cardNumber");
   if (cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity("Enter your card number");
   } else if (cardNumber.validity.patternMismatch) {
      cardNumber.setCustomValidity("Enter a valid card number");
   } else if (luhn(cardNumber.value) === false) {
      cardNumber.setCustomValidity("Enter a legitimate card number");
   } else {
      cardNumber.setCustomValidity("");
   }
}

function validateCVC() {
   var cardCVC = document.getElementById("cvc");
   var creditCard = document.querySelector('input[name="company"]:checked').value;
   
  if (cardCVC.validity.valueMissing) {
    cardCVC.setCustomValidity("Enter your code CVC number");
   } else if ((creditCard === "amex") && (/^\d{4}$/.test(cardCVC.value) === false)) {
   cardCVC.setCustomValidity("Enter a 4-digit CVC number");
  } else if ((creditCard !== "amex") && (/^\d{3}$/.test(cardCVC.value) === false)) {
   cardCVC.setCustomValidity("Enter a 3-digit CVC number");
  } else {
   cardCVC.setCustomValidity("");
  }
}

function sumDigits(numStr) {
   var digitTotal = 0;
   for (var i = 0; i < numStr.length; i++) {
      digitTotal += parseInt(numStr.charAt(i));
   }
   return digitTotal;
}

function luhn(idNum) {
   var string1 = "";
   var string2 = "";
   
   // Retrieve the odd-numbered digits
   for (var i = idNum.length - 1; i >= 0; i-= 2) {
      string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits and double them
   for (var i = idNum.length - 2; i >= 0; i-= 2) {
      string2 += 2*idNum.charAt(i);
   }
   
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
}
