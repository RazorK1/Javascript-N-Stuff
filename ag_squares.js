"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Review Assignment

   Author: Kyle Harris
   Date: 04/27/2024
   
   Filename: ag_squares.js

*/

window.addEventListener("load", playPokerSquares);

function playPokerSquares() {
   var newCard = document.getElementById("newCard");
   var startButton = document.getElementById("startButton");
   var rowSumCells = document.querySelectorAll("table#grid th.rowsum");   
   var colSumCells = document.querySelectorAll("table#grid th.colsum"); 
   var cardImages = document.querySelectorAll("table#grid tr td img");
   var gameScore = document.getElementById("gameScore");
   var gameResult = document.getElementById("gameResult");

   // Add an onclick event handler for the startButton
   startButton.onclick = function() {
      // Task 04: Set up the initial game board

      // Set the gameTotal property of the squareGame object to 0
      squareGame.gameTotal = 0;

      // Remove the current game score (set the value of the gameScore input box to an empty string)
      gameScore.value = "";

      // Remove the current game result (set the text content of the gameResult element to an empty string)
      gameResult.textContent = "";

      // Remove the current row and column totals
      rowSumCells.forEach(function(cell) {
         cell.textContent = "";
      });
      colSumCells.forEach(function(cell) {
         cell.textContent = "";
      });

      // Remove the current card images (set the source of every inline image to "ag_trans.gif")
      cardImages.forEach(function(img) {
         img.src = "ag_trans.gif";
      });

      // Task 05: Create a new pokerDeck object and shuffle it
      var myDeck = new pokerDeck();
      myDeck.shuffle();

      // Task 06: Create and initialize myStarterCard object
      var myStarterCard = myDeck.cards.shift();  // Remove the first card from the deck and assign it to myStarterCard

      // Task 07: Change the src attribute of the newCard inline image
      newCard.src = myStarterCard.cardImage();  // Call the cardImage() method of myStarterCard to set the src

      // Task 08 and Task 09: Add onclick event handler for cells in the grid table

      cardImages.forEach(function(img) {
         img.onclick = function(event) {
            // Apply the cardImage() method to display the image of the current card
            event.target.src = myStarterCard.cardImage(); 

            // Store the row number and column number of the clicked image
            var rowNum = event.target.id.charAt(1);  // Row number from the second character of the ID (e.g., 'r1', 'r2', etc.)
            var colNum = event.target.id.charAt(2);  // Column number from the third character of the ID (e.g., 'c1', 'c2', etc.)

            // Apply the insertCard() method to the squareGame.cardGrid[rowNum] object
            squareGame.cardGrid[rowNum].insertCard(myStarterCard, colNum);

            // After the card is placed, disable the onclick event to prevent further changes
            event.target.onclick = null;  // Disable further clicks on the cell

            // Task 10: Check if the grid is completed
            var gridCompleted = true;

            // Loop through the cardImages to check if all cells are filled
            cardImages.forEach(function(img) {
               if (img.src === "ag_trans.gif") {
                  gridCompleted = false;  // If any cell is empty, set gridCompleted to false
               }
            });

            // If the grid is completed, the game is over
            if (gridCompleted) {
               // Change the src attribute of newCard to "ag_cardback3.png" to indicate the game is over
               newCard.src = "ag_cardback3.png";

               // Calculate the row totals and update the gameTotal
               for (var i = 0; i < 5; i++) {
                  var rowTotal = squareGame.calcRowPoints(i);  // Calculate the row total for the i-th row
                  squareGame.gameTotal += rowTotal;  // Add the row total to the gameTotal
                  document.getElementById("row" + i + "sum").textContent = rowTotal;  // Display the row total in the corresponding element
               }

               // Calculate the column totals and update the gameTotal
               for (var j = 0; j < 5; j++) {
                  var colTotal = squareGame.calcColumnPoints(j);  // Calculate the column total for the j-th column
                  squareGame.gameTotal += colTotal;  // Add the column total to the gameTotal
                  document.getElementById("col" + j + "sum").textContent = colTotal;  // Display the column total in the corresponding element
               }

               // Update the gameScore input box with the final gameTotal
               gameScore.value = squareGame.gameTotal;

               // Show whether the user won or lost
               gameResult.textContent = squareGame.gameResult();  // Display the result ("Winner" or "No Winner")
            } else {
               // If there are more cards to be placed, continue the game
               if (myDeck.cards.length > 27) {
                  myStarterCard = myDeck.cards.shift();  // Shift the next card from myDeck into myStarterCard
                  newCard.src = myStarterCard.cardImage();  // Update the newCard image
               } else {
                  // If there are no cards left, end the game
                  console.log("Game Over: Not enough cards remaining.");
                  gameResult.textContent = "Game Over: Not enough cards remaining.";
               }
            }
         };
      });
   };
}
 
