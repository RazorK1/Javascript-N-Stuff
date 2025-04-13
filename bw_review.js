"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Case Problem 1

   Author: Kyle Harris
   Date: 02/22/2025
   
   Filename: bw_review.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers.
      
   lightStars(e)
      Function that colors the stars representing the user rating
      for the book.
      
   turnOffStars(e)
      Function that restores the stars to empty colors, removing
      the user rating for the book.

   updateCount()
      Updates the count of characters in the wordCountBox
      element.

   countCharacters(textStr)
      Returns the number of a non-whitespace characters
      within textStr

*/
window.onload = init;

/*
function init() {
   // Declare the stars variable that stores the object collection of the reviewing stars
   var stars = document.querySelectorAll('span#stars img');
   
   // Loop through the star collection using a traditional for loop
   for (var i = 0; i < stars.length; i++) {
       // Change the cursor style to pointer for each star
       stars[i].style.cursor = 'pointer';
       
       // Add an event listener to run the lightStars() function on mouseenter
       stars[i].addEventListener('mouseenter', lightStars);
   }

   // Add an event listener to the comment text area box
   var commentBox = document.getElementById('comment');
   if (commentBox) {
       console.log("Comment box found, adding event listener.");
       commentBox.addEventListener('keyup', updateCount);
   } else {
       console.error("Element with id 'comment' not found.");
   }
}
*/

function init() {
   var stars = document.querySelectorAll('span#stars img');
   
   for (var i = 0; i < stars.length; i++) {
       stars[i].style.cursor = 'pointer';
       stars[i].addEventListener('mouseenter', lightStars);
   }

   var commentBox = document.getElementById('comment');
   if (commentBox) {
       console.log("Comment box found, adding event listener.");
       commentBox.addEventListener('keyup', function() {
           updateCount();
       });
   } else {
       console.error("Element with id 'comment' not found.");
   }
}

document.addEventListener("DOMContentLoaded", init);

document.addEventListener("DOMContentLoaded", function() {
   init();
});


function lightStars(event) {
   // Store the value of the alt attribute of the target star image in the starNumber variable
   var starNumber = parseInt(event.target.getAttribute('alt'), 10);  // Ensure it's an integer

   // Declare the stars variable containing the object collection of the star images
   var stars = document.querySelectorAll('span#stars img');
   
   // Loop through the stars collection and light the stars up to the starNumber
   for (var i = 0; i < starNumber; i++) {
       stars[i].src = 'bw_star2.png';  // Light the star
   }
   
   // After the for loop, unlight the stars from starNumber to 4
   for (var i = starNumber; i < 5; i++) {
       stars[i].src = 'bw_star.png';  // Unlight the star
   }

   // Change the value of the rating input box to reflect the starNumber
   document.getElementById('rating').value = starNumber + " stars";

   // Add an event listener to the target to run the turnOffStars() function on mouseleave
   event.target.addEventListener('mouseleave', turnOffStars);

   // Add a click event to lock the rating on click (so it doesn’t reset on mouseleave)
   event.target.addEventListener('click', function() {
       event.target.removeEventListener('mouseleave', turnOffStars);
   });
}

function turnOffStars() {
   // Declare the stars variable containing the object collection of the star images
   var stars = document.querySelectorAll('span#stars img');
   
   // Loop through all images in the stars collection and unlight them
   for (var i = 0; i < stars.length; i++) {
       stars[i].src = 'bw_star.png';  // Unlight each star
   }

   // Clear the value of the rating input box
   document.getElementById('rating').value = '';
}

/*
function countdown() {
   var commentText = document.getElementById("comment").value;
   var charCount = countCharacters(commentText);
   var wordCountBox = document.getElementById("wordCount");

   wordCountBox.value = charCount / 1000;

   if (charCount > 1000) {
       wordCountBox.style.color = "white";
       wordCountBox.style.backgroundColor = "red";
   } else {
       wordCountBox.style.color = "black";
       wordCountBox.style.backgroundColor = "white";
   }
}
*/

function updateCount() {
   // Your code to update the count
   var commentText = document.getElementById("comment").value;
   var charCount = countCharacters(commentText);
   var wordCountBox = document.getElementById("wordCount");

   wordCountBox.value = charCount + "/1000";

   if (charCount > 1000) {
       wordCountBox.style.color = "white";
       wordCountBox.style.backgroundColor = "red";
   } else {
       wordCountBox.style.color = "black";
       wordCountBox.style.backgroundColor = "white";
   }
}

function countCharacters(text) {
   return text.length;
}

/*=================================================================*/

function countCharacters(textStr) {
   var commentregx = /\s/g;
   var chars = textStr.replace(commentregx, "");
   return chars.length;
}  
