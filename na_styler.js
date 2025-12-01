"use strict";

/*

   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Case Problem 1

   Author: Kyle Harris
   Date: 03/10/2025

   Filename: na_styler.js

   Functions
   =========
   
   setStyles()
      Sets up the style sheets and the style sheet switcher.
      
   randInt(size)
      Returns a random integer from 0 up to size-1.

*/

function randInt(size) {
   return Math.floor(size*Math.random());
}

// Function to set up the style sheets and the style sheet switcher
function setStyles() {
   var styleNum = randInt(5);
   
   // Create an element node for the link element
   var fancySheet = document.createElement("link");
   
   // Set the attributes for the link element
   fancySheet.setAttribute("rel", "stylesheet");
   fancySheet.setAttribute("id", "fancySheet");
   fancySheet.setAttribute("href", "na_style_" + styleNum + ".css");

   // Append the fancySheet link element to the document head
   document.head.appendChild(fancySheet);

   // Create an element node named figBox for the figure element
   var figBox = document.createElement("figure");
   
   // Set the id attribute of the figBox element
   figBox.setAttribute("id", "styleThumbs");
   
   // Append the figBox element to the div element with the ID "box"
   document.getElementById("box").appendChild(figBox);

   //TASK 06 STARTS HERE
   // Apply basic styles to ensure figBox and its children are clickable
   figBox.style.position = "relative";
   figBox.style.zIndex = "10";
   figBox.style.display = "flex";
   figBox.style.gap = "10px";

   // Populate the figure box with preview images of the five fancy style sheets
   for (var i = 0; i < 5; i++) {
      var sheetImg = document.createElement("img");
      sheetImg.setAttribute("src", "na_small_" + i + ".png");
      sheetImg.setAttribute("alt", "na_style_" + i + ".css");

      // Add event handler to load a different style sheet when the user clicks the thumbnail image
      sheetImg.addEventListener("click", function(event) {
         document.getElementById("fancySheet").setAttribute("href", event.target.alt);
      });

      // Append the sheetImg to the figBox element node
      figBox.appendChild(sheetImg);
   }

   // Create an embedded style sheet named thumbStyles
   var thumbStyles = document.createElement("style");

   // Add the style rules to the thumbStyles style sheet
   thumbStyles.textContent = `
      figure#styleThumbs {
         position: absolute;
         left: 0px;
         bottom: 0px;
      }
      figure#styleThumbs img {
         outline: 1px solid black;
         cursor: pointer;
         opacity: 0.75;
      }
      figure#styleThumbs img:hover {
         outline: 1px solid red;
         opacity: 1.0;
      }
   `;

   // Append the thumbStyles style sheet to the document head
   document.head.appendChild(thumbStyles);

}

// Adding an event listener to call the setStyles() function when the page loads
window.addEventListener("load", setStyles);
