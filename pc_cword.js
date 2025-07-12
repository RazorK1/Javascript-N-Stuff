"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 3

   Crossword Puzzle Script
   
   Author: 
   Date:   
   
   Global Variables
   ================
   allLetters
      References all of the letter cells in the crossword table#crossword
   
   currentLetter
      References the letter currently selected in the puzzleLetter
      
   wordLetters
      References the across and down letters in the word(s) associated with the current letter
   
   acrossClue
      References the across clue associated with the current letter
      
   downClue
      References the down clue associated with the current letter
      
         
   Functions
   =========
   
   init()
      Initializes the puzzle, setting up the event handlers and the variable values
       
   formatPuzzle(puzzleLetter)
      Formats the appearance of the puzzle given the selected puzzle letter
      
   selectLetter(e)
      Applies keyboard actions to select a letter or modify the puzzle navigation
      
   switchTypeDirection()
      Toggles the typing direction between right and down
      
   getChar(keyNum)
      Returns the text character associated with the key code value, keyNum


*/

// Declare global variables
let allLetters;
let currentLetter;
let wordLetters;
let acrossClue;
let downClue;
let typeDirection = "right";  // Initial typing direction
let typeImage;  // Declare typeImage variable

// Set the onload event to run the init function
window.onload = init;


function init() {
    // Reference all letter cells in the crossword puzzle table
    allLetters = document.querySelectorAll("table#crossword span");
    // Reference the first letter cell
    currentLetter = allLetters[0];
    // Get the across and down clue IDs for the current letter
    let acrossID = currentLetter.getAttribute("data-clue-a");
    let downID = currentLetter.getAttribute("data-clue-d");
    // Reference the across and down clues
    acrossClue = document.getElementById(acrossID);
    downClue = document.getElementById(downID);

    // Reference the typing direction image
    typeImage = document.getElementById("directionImg");

        // Change cursor style to pointer
        typeImage.style.cursor = "pointer";
        // Run switchTypeDirection() when the image is clicked
        typeImage.onclick = switchTypeDirection;

    // Reference the 'Show Errors' button
    let showErrorsButton = document.getElementById("showErrors");
    // Add onclick event handler for the 'Show Errors' button
    showErrorsButton.onclick = function() {
        // Loop through all items in the allLetters object collection
        for (let letter of allLetters) {
            // If the text content does not match the dataset.letter property, change the color to red
            if (letter.textContent !== letter.dataset.letter) {
                letter.style.color = "red";
            }
        }
        // After 3 seconds, restore the letters to the default font color
        setTimeout(function() {
            for (let letter of allLetters) {
                letter.style.color = "";
            }
        }, 3000);
    };

        // Color the first letter of the crossword puzzle
        formatPuzzle(currentLetter);
    
        // Enable selection of puzzle cells with the mouse
        for (let letter of allLetters) {
            letter.style.cursor = "pointer";
            letter.onmousedown = function(e) {
                formatPuzzle(e.target);
            }
        }

            // Add onclick event handler for the Show Solution button
    document.getElementById("showSolution").onclick = function() {
      for (let letter of allLetters) {
          letter.textContent = letter.dataset.letter;
      }
  };

       // Add event handler to run selectLetter() on keydown event
       document.onkeydown = selectLetter;
} //END OF INIT() FUNCTION

function formatPuzzle(puzzleLetter) {
   // Change the value of currentLetter to puzzleLetter
   currentLetter = puzzleLetter;
   // Remove current colors in the puzzle
   for (let letter of allLetters) {
        letter.style.backgroundColor = "";
   }
    // Remove highlighting of current clues
   acrossClue.style.color = "";
   downClue.style.color = "";
    
   // Check for across clue
   if (currentLetter.dataset.clueA !== undefined) {
        acrossClue = document.getElementById(currentLetter.dataset.clueA);
        acrossClue.style.color = "blue";
        wordLetters = document.querySelectorAll(`[data-clue-a="${currentLetter.dataset.clueA}"]`);
        for (let letter of wordLetters) {
            letter.style.backgroundColor = "rgb(231, 231, 255)";
        }
    }
    
    // Check for down clue
    if (currentLetter.dataset.clueD !== undefined) {
        downClue = document.getElementById(currentLetter.dataset.clueD);
        downClue.style.color = "red";
        wordLetters = document.querySelectorAll(`[data-clue-d="${currentLetter.dataset.clueD}"]`);
        for (let letter of wordLetters) {
            letter.style.backgroundColor = "rgb(255, 231, 231)";
        }
    }
    
    // Indicate typing direction
   if (typeDirection === "right") {
        currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
   } else {
        currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
   }
}

function selectLetter(e) {
       // Reference the letters to the left, above, right, and below the current letter
       let leftLetter = document.getElementById(currentLetter.dataset.left);
       let upLetter = document.getElementById(currentLetter.dataset.up);
       let rightLetter = document.getElementById(currentLetter.dataset.right);
       let downLetter = document.getElementById(currentLetter.dataset.down);
   
       // Store the code of the key pressed by the user
       let userKey = e.keyCode;
   
       // Determine the program response based on the value of userKey
       if (userKey === 37) { // Left arrow key
           formatPuzzle(leftLetter);
       } else if (userKey === 38) { // Up arrow key
           formatPuzzle(upLetter);
       } else if (userKey === 39 || userKey === 9) { // Right arrow or tab key
           formatPuzzle(rightLetter);
       } else if (userKey === 40 || userKey === 13) { // Down arrow or enter key
           formatPuzzle(downLetter);
       } else if (userKey === 8 || userKey === 46) { // Backspace or delete key
           currentLetter.textContent = "";
       } else if (userKey === 32) { // Spacebar key
           switchTypeDirection();
       } else if (userKey >= 65 && userKey <= 90) { // Letters a to z
           currentLetter.textContent = getChar(userKey);
           if (typeDirection === "right") {
               formatPuzzle(rightLetter);
           } else {
               formatPuzzle(downLetter);
           }
       }
   
       // Prevent the browser from performing the default action in response to the keyboard event
       e.preventDefault();
}

function switchTypeDirection() {
    // Toggle the typing direction
    if (typeDirection === "right") {
      typeDirection = "down";
      typeImage.src = "pc_down.png";
      currentLetter.style.backgroundColor = "rgb(255, 191, 191)";
  } else {
      typeDirection = "right";
      typeImage.src = "pc_right.png";
      currentLetter.style.backgroundColor = "rgb(191, 191, 255)";
  }
}








/*====================================================*/

function getChar(keyNum) {
   return String.fromCharCode(keyNum);
}
