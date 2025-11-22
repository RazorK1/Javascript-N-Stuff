"use strict";

/*

   New Perspectives on HTML5 and CSS3, 8th Edition
   Tutorial 10
   Review Assignment

   Author: Kyle Harris
   Date: 02/14/2025
	
*/

//Set the reference date (October 1, 2021);
let thisDay = new Date("October 1, 2021");

//Compute the end date (14 days after thisDay)
let endDate = new Date(thisDay.getTime() + 14 * 24 * 60 * 60 * 1000);

//Initialize the table structure
let tableHTML = `
  <table id="eventTable">
    <caption>Upcoming Events</caption>
    <tr>
      <th>Date</th>
      <th>Event</th>
      <th>Price</th>
    </tr>
`;

//Loop through events and check if they are within range
for (let i = 0; i < eventDates.length; i++) {
    let eventDate = new Date(eventDates[i]); // Convert to Date object

    // Debugging: Ensure the date is correctly parsed
    console.log(`Checking event: ${eventDate}`);

    //If the event falls within the two-week range, add it to the table
    if (eventDate >= thisDay && eventDate <= endDate) {
        let eventDay = eventDate.toDateString(); // Format the date
        let eventTime = eventDate.toLocaleTimeString(); // Format the time

        console.log(`Adding event: ${eventDescriptions[i]} on ${eventDay}`);

        tableHTML += `
          <tr>
            <td>${eventDay} @ ${eventTime}</td>
            <td>${eventDescriptions[i]}</td>
            <td>${eventPrices[i]}</td>
          </tr>
        `;
    }
}

//Close the table tag
tableHTML += `</table>`;


//Insert table into the eventList div
document.addEventListener("DOMContentLoaded", function () {
    let eventListDiv = document.getElementById("eventList");
    if (eventListDiv) {
        eventListDiv.innerHTML = tableHTML;
    } else {
        console.error("Error: eventList div not found!");
    }
});

