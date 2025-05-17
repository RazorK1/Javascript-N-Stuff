"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Kyle Harris
   Date: 02/22/2025
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/

/*
function init() {
  
}

function buttonClick(e) {
  
}

function calcKeys(e) {
  
}
*/


window.onload = init;

function init() {
   // Declare the calcButtons variable containing the collection of page elements belonging to the calcButton class
   const calcButtons = document.getElementsByClassName('calcButton');
   
   // Loop through the calcButtons collection
   for (let i = 0; i < calcButtons.length; i++) {
       // For each button in the collection, run the buttonClick() function on click event
       calcButtons[i].onclick = buttonClick;
   }
   
   // Add a command that runs calcKeys() when the keydown event occurs within the element with the ID "calcWindow"
   const calcWindow = document.getElementById('calcWindow');
   calcWindow.onkeydown = calcKeys;
}

function calcKeys(event) {
   // Declare the calcValue and calcDecimal variables
   let calcValue = document.getElementById('calcWindow').value;
   let calcDecimal = document.getElementById('decimals').value;
   
   // Switch-case structure for key actions
   switch(event.key) {
       case 'Delete':
           // Clear the contents of the calculator window
           calcValue = '';
           break;
       case 'Enter':
           // Add the calculated value to calcValue
           calcValue = ' = ' + evalEq(calcValue, calcDecimal) + '\n';
           break;
       case 'ArrowUp':
           // Add the last equation to calcValue
           calcValue = lastEq(calcValue);
           // Prevent the browser's default action for the up-arrow key
           event.preventDefault();
           break;
   }
   
   // Set the value attribute of the calcWindow text area box to calcValue
   document.getElementById('calcWindow').value = calcValue;
}


/*
function buttonClick(event) {
   // Declare the calcValue variable equal to the value attribute of the calcWindow text area box
   let calcValue = document.getElementById('calcWindow').value;
   
   // Declare the calcDecimal variable equal to the value attribute of the decimals input box
   let calcDecimal = document.getElementById('decimals').value;
   
   // Declare the buttonValue attribute equal to the value attribute of the event object target
   let buttonValue = event.target.value;
   
   // Switch-case structure for button actions
   switch(buttonValue) {
       case 'del':
           // Clear the contents of the calculator window
           calcValue = '';
           break;
       case 'bksp':
           // Erase the last character in the calculator window
           calcValue = eraseChar(calcValue);
           break;
       case 'enter':
           // Calculate the value of the current expression
           calcValue = evalEq(calcValue, calcDecimal);
           // Format the output to show the equation followed by the result
           calcValue = calcValue.split('=')[0] + '=' + calcValue.split('=')[1];
           break;
       case 'prev':
           // Copy the last equation
           calcValue = lastEq(calcValue);
           break;
       default:
           // Append the calculator button character to the calcValue
           calcValue += buttonValue;
           break;
   }
   
   
   // Set the value attribute of the calcWindow text area box to calcValue
   document.getElementById('calcWindow').value = calcValue;
   
   // Put the cursor focus within the calculator window
   document.getElementById('calcWindow').focus();
}


function calcKeys(event) {
   // Declare the calcValue and calcDecimal variables
   let calcValue = document.getElementById('calcWindow').value;
   let calcDecimal = document.getElementById('decimals').value;
   
   // Switch-case structure for key actions
   switch(event.key) {
       case "Delete":
           // Clear the contents of the calculator window
           calcValue = '';
           break;
       case "Enter":
           // Add the calculated value to calcValue
           calcValue = " = " + evalEq(calcValue, calcDecimal);
           break;
       case "ArrowUp":
           // Add the last equation to calcValue
           calcValue = lastEq(calcValue);
           // Prevent the browser's default action for the up-arrow key
           event.preventDefault();
           break;
   }
   
   // Set the value attribute of the calcWindow text area box to calcValue
   document.getElementById('calcWindow').value = calcValue;
}

// Erase the last character from a string
function eraseChar(value) {
   return value.slice(0, -1);
}

// Evaluate the expression in the calculator window
function evalEq(value, decimals) {
   try {
       let result = eval(value); // Evaluate the expression
       return result.toFixed(decimals); // Limit decimal places based on input
   } catch (e) {
       return "Error"; // Return error if the expression is invalid
   }
}

// Get the last equation entered
function lastEq(value) {
   return value; // Placeholder: This function can be modified to retrieve actual last equation history if implemented
}
*/

function buttonClick(event) {
   // Declare the calcValue variable equal to the value attribute of the calcWindow text area box
   let calcValue = document.getElementById('calcWindow').value;
   
   // Declare the calcDecimal variable equal to the value attribute of the decimals input box
   let calcDecimal = document.getElementById('decimals').value;
   
   // Declare the buttonValue attribute equal to the value attribute of the event object target
   let buttonValue = event.target.value;
   
   // Switch-case structure for button actions
   switch(buttonValue) {
       case 'del':
           // Clear the contents of the calculator window
           calcValue = '';
           break;
       case 'bksp':
           // Erase the last character in the calculator window
           calcValue = eraseChar(calcValue);
           break;
       case 'enter':
           // Calculate the value of the current expression
           let result = evalEq(calcValue, calcDecimal);
           // Format the output to show the equation followed by the result
           calcValue = `${calcValue}=${result}\n`;
           break;
       case 'prev':
           // Copy the last equation
           let lastExpression = lastEq(calcValue);
           calcValue = `${calcValue.trim()}\n${lastExpression}`;
           break;
       default:
           // Append the calculator button character to the calcValue
           calcValue += buttonValue;
           break;
   }
   
   // Set the value attribute of the calcWindow text area box to calcValue
   document.getElementById('calcWindow').value = calcValue;
   
   // Put the cursor focus within the calculator window
   document.getElementById('calcWindow').focus();
}





/* ===================================================================== */

function eraseChar(textStr) { 
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length-1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}  

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length-2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}
