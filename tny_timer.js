/*

   New Perspectives on HTML5 and CSS3, 8th Edition
   Tutorial 9
   Review Assignment

   Event Timer
   Author: Kyle Harris
   Date: 01/24/2025

*/

//Enable Strict Mode 
"use strict";  

function showClock() 
{
   // Declare the thisDay variable (Leave empty for today's date)
   // Step 1: let thisDay = new Date('May 19, 2021 09:31:27'); ---> Countdown to the Fireworks 46 days, 11 hours, 28 minutes, and 33 seconds.
   let thisDay = new Date();

   // Step 2: Declare localDate variable with the local format date
   let localDate = thisDay.toLocaleDateString();

   // Step 3: Declare localTime variable with the local format time
   let localTime = thisDay.toLocaleTimeString();

   // Step 4: Write the date and time into the HTML element with the ID "currentTime"
   document.getElementById("currentTime").innerHTML = `<span>${localDate}</span><span>${localTime}</span>`;

   // Step 5: Get the next 4th of July using the nextJuly4() function
   let j4Date = nextJuly4(thisDay);

   // Step 6: Set j4Date to 9 p.m. (21:00) on the 4th of July
   j4Date.setHours(21, 0, 0, 0); // Setting the time to 9:00:00 PM

   // Step 7: Calculate the difference between j4Date and thisDay
   let timeDiff = j4Date - thisDay;

   // Calculate the number of days, hours, minutes, and seconds left
   let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
   let hrs = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   let mins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
   let secs = Math.floor((timeDiff % (1000 * 60)) / 1000);

   // Change the text content of the countdown elements
   document.getElementById("dLeft").textContent = days;
   document.getElementById("hLeft").textContent = hrs;
   document.getElementById("mLeft").textContent = mins;
   document.getElementById("sLeft").textContent = secs;
}

// Call the showClock function to initialize the clock
showClock();

// Run the showClock function every second (1000 milliseconds)
setInterval(showClock, 1000);

// This will automatically use the current date and time
let thisDay = new Date(); 

function nextJuly4(currentDate) {
   var cYear = currentDate.getFullYear();
   var jDate = new Date("July 4, 2021");
   jDate.setFullYear(cYear);
   if ((jDate - currentDate) < 0) jDate.setFullYear(cYear + 1);
   return jDate;
}

