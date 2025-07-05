"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 2

   Author: Kyle Harris
   Date: 04/20/2025
   
   Filename: dl_expenses.js
   
   Function List
   =============
   
   validateSummary()
      Validates the data entry in the summary field.
   
   calcClass(sumClass)
      Sums up all of the data values for elements of the sumClass class.
      
   calcExp()
      Calculates the travel expenses from all categories and dates.
      
   formatNumber(val, decimals)
      Formats the value, "val" to the number of decimals indicated 
      by "decimals", adding thousands separators.
      
   formatUSCurrency(val)
      Formats the value, "val", as U.S. currency.
      
*/


/*

function formatNumber(val, decimals) {
    return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                          maximumFractionDigits: decimals});
 }
 
 function formatUSCurrency(val) {
    return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
 }

*/

function validateSummary() {
    let summaryField = document.getElementById("summary");
    let summaryText = summaryField.value;
 
    if (summaryText.length < 10) {
       summaryField.setCustomValidity("You must include a summary of the trip in your report.");
    } else {
       summaryField.setCustomValidity("");
    }
 }
 
 function calcClass(sumClass) {
    let sumFields = document.getElementsByClassName(sumClass);
    let total = 0;
 
    for (let i = 0; i < sumFields.length; i++) {
       let currentVal = parseFloat(sumFields[i].value);
       if (!isNaN(currentVal)) {
          total += currentVal;
       }
    }
 
    return total;
 }

 /*
 function calcExp() {
    // Calculate category totals
    let transTotal = calcClass("trans");
    let lodgeTotal = calcClass("lodge");
    let mealTotal = calcClass("meal");
    let otherTotal = calcClass("other");
 
    // Calculate overall total
    let expTotal = transTotal + lodgeTotal + mealTotal + otherTotal;
 
    // Display formatted totals in the corresponding input fields
    document.getElementById("transTotal").value = formatNumber(transTotal, 2);
    document.getElementById("lodgeTotal").value = formatNumber(lodgeTotal, 2);
    document.getElementById("mealTotal").value = formatNumber(mealTotal, 2);
    document.getElementById("otherTotal").value = formatNumber(otherTotal, 2);
    document.getElementById("expTotal").value = formatUSCurrency(expTotal);

 }
 */

 function calcExp() {
    let totalExpenses = 0;
    var expenseCategories = ["trans", "lodge", "meal", "other"];

    expenseCategories.forEach(category => {
        var categoryTotal = calcClass(category); // Calculate subtotal
        totalExpenses += categoryTotal; // Add to total expenses

        // Locate the subtotal field and ensure it's updated properly
        var subtotalField = document.getElementById(category + "Total");
        if (subtotalField) {
            subtotalField.value = formatNumber(categoryTotal, 2); // Format as two-decimal numbers
        } else {
            console.error(`Subtotal field for '${category}Total' not found.`);
        }

        console.log(`${category} subtotal set to:`, categoryTotal);
    });

    // Update total expenses field, formatted as currency
    var totalField = document.getElementById("expTotal");
    if (totalField) {
        totalField.value = formatUSCurrency(totalExpenses); // Format as U.S. currency
    } else {
        console.error("Total field 'expTotal' not found.");
    }

    console.log("Total Expenses set to:", totalExpenses);
    console.log("calcExp executed successfully.");
}

 function formatNumber(val, decimals) {
    return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                          maximumFractionDigits: decimals});
 }
 
 function formatUSCurrency(val) {
    return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
 }

// Add event listeners on page load
window.addEventListener("load", function() {
    // Apply 'onchange' event handler to inputs in the 'travelExp' table
    var travelExpTable = document.getElementById("travelExp");
    if (travelExpTable) {
        const travelExpInputs = travelExpTable.querySelectorAll("input");
        travelExpInputs.forEach(input => {
            input.onchange = calcExp;
        });
    } else {
        console.error("The 'travelExp' table was not found.");
    }
 
    // Add 'onclick' event handler to the submit button
    var submitButton = document.getElementById("submitButton");
    if (submitButton) {
        submitButton.onclick = validateSummary;
    } else {
        console.error("The 'submitButton' was not found.");
    }
 
    console.log("Page is fully loaded, and functions are initialized.");
 });
 



/*
function validateSummary() {
   // Access the summary field and error message element
   var summaryField = document.getElementById("summary");
   var errorMessage = document.getElementById("errorMessage");

   // Check if the summary field and error message elements exist
   if (!summaryField || !errorMessage) {
       console.error("Required elements not found (summary or errorMessage).");
       return false;
   }

   // Trim whitespace and get the field value
   const summaryValue = summaryField.value.trim();
   
   // Validation: Ensure the summary is not empty
   if (summaryValue === "") {
       errorMessage.textContent = "You must include a summary of the trip in your report.";
       summaryField.focus();
       return false;
   }

   // Validation: Ensure the summary is under a character limit
   var maxLength = 250; // Adjust this limit as necessary
   if (summaryValue.length > maxLength) {
       errorMessage.textContent = "The summary cannot exceed 250 characters.";
       summaryField.focus();
       return false;
   }

   // Clear any existing error message if validation passes
   errorMessage.textContent = "";
   console.log("Summary field validated successfully.");
   return true;
}


function calcClass(sumClass) {
   // Select all elements with the specified class
   var elements = document.querySelectorAll(`.${sumClass}`);
   let total = 0;

   // Iterate through the elements and add their values to the total
   elements.forEach(element => {
       const value = parseFloat(element.value);
       // Ensure the value is a valid number before adding
       if (!isNaN(value)) {
           total += value;
       }
   });

   // Return the calculated total
   return total;
}

function calcExp() {
    let totalExpenses = 0;
    var expenseCategories = ["trans", "lodge", "meal", "other"];

    expenseCategories.forEach(category => {
        var categoryTotal = calcClass(category); // Calculate subtotal
        totalExpenses += categoryTotal; // Add to total expenses

        // Locate the subtotal field and ensure it's updated properly
        var subtotalField = document.getElementById(category + "Total");
        if (subtotalField) {
            subtotalField.value = formatNumber(categoryTotal, 2); // Format as two-decimal numbers
        } else {
            console.error(`Subtotal field for '${category}Total' not found.`);
        }

        console.log(`${category} subtotal set to:`, categoryTotal);
    });

    // Update total expenses field, formatted as currency
    var totalField = document.getElementById("expTotal");
    if (totalField) {
        totalField.value = formatUSCurrency(totalExpenses); // Format as U.S. currency
    } else {
        console.error("Total field 'expTotal' not found.");
    }

    console.log("Total Expenses set to:", totalExpenses);
    console.log("calcExp executed successfully.");
}


function formatNumber(val, decimals) {
   return val.toLocaleString(undefined, {minimumFractionDigits: decimals, 
                                         maximumFractionDigits: decimals});
}

function formatUSCurrency(val) {
   return val.toLocaleString('en-US', {style: "currency", currency: "USD"} );
}


// Add event listeners on page load
window.addEventListener("load", function() {
   // Apply 'onchange' event handler to inputs in the 'travelExp' table
   var travelExpTable = document.getElementById("travelExp");
   if (travelExpTable) {
       const travelExpInputs = travelExpTable.querySelectorAll("input");
       travelExpInputs.forEach(input => {
           input.onchange = calcExp;
       });
   } else {
       console.error("The 'travelExp' table was not found.");
   }

   // Add 'onclick' event handler to the submit button
   var submitButton = document.getElementById("submitButton");
   if (submitButton) {
       submitButton.onclick = validateSummary;
   } else {
       console.error("The 'submitButton' was not found.");
   }

   console.log("Page is fully loaded, and functions are initialized.");
});
*/

