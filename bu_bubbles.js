"use strict";


/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 14
   Case Problem 1

   Author: Kyle Harris
   Date: 04/23/2025
   
   Filename: bu_bubbles.js

*/

// Object literal for the bubble box dimensions
var box = {
   width: 1024,
   height: 500
};

function bubble(size, img) {
   this.radius = size;
   this.imageURL = img;
   this.xVelocity = null;
   this.yVelocity = null;
   this.xPos = null;
   this.yPos = null;
   this.opacity = 1;
   this.hue = 0;
   this.rotate = 0;
   this.rotateDirection = 1;
}

// Method to gradually fade the bubble
bubble.prototype.fadeBubble = function() {
   this.opacity -= 0.0005;
};

// Method to gradually change the color hue
bubble.prototype.changeColor = function() {
   this.hue = (this.hue + 3) % 360;
};

// Method to rotate the bubble
bubble.prototype.rotateBubble = function() {
   this.rotate = (this.rotate + this.rotateDirection) % 360;
};

bubble.prototype.moveBubble = function(height, width) {
   var bubbleTop = this.yPos;
   var bubbleBottom = this.yPos + this.radius;
   var bubbleLeft = this.xPos;
   var bubbleRight = this.xPos + this.radius;

   // Bounce off top or bottom
   if (bubbleTop < 0 || bubbleBottom > height) {
      this.yVelocity = -this.yVelocity;
   }

   // Bounce off left or right
   if (bubbleLeft < 0 || bubbleRight > width) {
      this.xVelocity = -this.xVelocity;
   }

   // Update bubble position
   this.yPos += this.yVelocity;
   this.xPos += this.xVelocity;
};





window.addEventListener("load", function() {
   // Reference to the bubble box
   var bubbleBox = document.getElementById("bubbleBox");

   // Create a new bubble every half-second
   setInterval(function() {
      // Do not create more than 20 bubbles at any one time
      if (bubbleBox.childElementCount <= 20) {
         var newBubble = new bubble(randInt(50, 120), "bu_bubble" + randInt(1, 10) + ".png");

         // Position bubble in center of the box
         newBubble.xPos = box.width / 2;
         newBubble.yPos = box.height / 2;

         // Assign random velocities
         newBubble.xVelocity = randInt(-5, 5);
         newBubble.yVelocity = randInt(-5, 5);

         // Randomize rotation and color
         newBubble.rotate = randInt(0, 360);
         newBubble.hue = randInt(0, 360);

         // Randomize rotation direction
         newBubble.rotateDirection = randInt(-2, 2);

         // Create a new <img> element for the bubble
         var bubbleImg = document.createElement("img");
         bubbleImg.style.position = "absolute";

         // Set the bubble image source and styles
         bubbleImg.src = newBubble.imageURL;
         bubbleImg.style.width = newBubble.radius + "px";
         bubbleImg.style.left = newBubble.xPos + "px";
         bubbleImg.style.top = newBubble.yPos + "px";

         // Append the image to the bubble box
         bubbleBox.appendChild(bubbleImg);

         var bubbleInterval = setInterval(function() {
            // Steps 11-13 go here
            newBubble.fadeBubble();

            // Task 13 - Apply the color change effect
            newBubble.changeColor();   // Change hue
            bubbleImg.style.filter = "hue-rotate(" + newBubble.hue + "deg)";

            // Task 13 - Apply the rotation effect
            newBubble.rotateBubble();  // Rotate bubble
            bubbleImg.style.transform = "rotate(" + newBubble.rotate + "deg)";

            // Task 13 - Apply the move effect
            newBubble.moveBubble(box.height, box.width);  // Move bubble
            bubbleImg.style.opacity = newBubble.opacity;   // Apply opacity
            bubbleImg.style.left = newBubble.xPos + "px";  // Apply horizontal position
            bubbleImg.style.top = newBubble.yPos + "px";   // Apply vertical position

            // Task 12 - Remove the bubble if its opacity is less than 0
            if (newBubble.opacity <= 0) {
               // Stop the animation interval
               clearInterval(bubbleInterval);
               // Remove the bubble image from the bubble box
               bubbleBox.removeChild(bubbleImg);
            }

         }, 25);
      }

   }, 500);

   /* Function to return a random integer between minVal and maxValue inclusive */
   function randInt(minVal, maxVal) {
      var size = maxVal - minVal + 1;
      return Math.floor(minVal + size*Math.random());
   }  
});
