"use strict";

/*
   New Perspectives on HTML5 and CSS3, 8th Edition
   Tutorial 10
   Case Problem 2

   Author: Kyle Harris
   Date: 02/19/2025
   
   Filename: vw_results.js
   
   Functions:
   
   The calcSum() function is a callback function used to
   calculte the total value from items within an array
   
   The calcPercent(value, sum) function calculates the percentage given
   a value and a sum
   
   The createBar(partyType, percent) function writes a different
   table data table based on the candidates party affilication.
   
      
*/
let reportHTML = `<h1>${raceTitle}</h1>`;

// Loop through each race
   for (let i = 0; i < race.length; i++) {
   let totalVotes = 0; // Reset for each race

   // Calculate total votes for the current race
   votes[i].forEach((num) => totalVotes += num);


   // Add race name and table headers to reportHTML
   reportHTML += `
   <table>
     <caption>${race[i]}</caption>
     <tr>
       <th>Candidate</th>
       <th>Votes</th>
       <th>Percentage</th>
       <th>Bar Chart</th>
     </tr>`;

   // Add candidate rows to the table
   reportHTML += candidateRows(i, totalVotes);

   // Close the table tag
   reportHTML += `</table>`;
}

// Write the reportHTML content into the section element in the HTML file
document.querySelector("section").innerHTML = reportHTML;

function candidateRows(raceNum, totalVotes) {
   let rowHTML = ""; // Initialize an empty string to store row HTML

   for (let j = 0; j < 3; j++) {
       // Retrieve candidate details
       let candidateName = candidate[raceNum][j];
       let candidateParty = party[raceNum][j];
       let candidateVotes = votes[raceNum][j];
       let candidatePercent = (candidateVotes / totalVotes) * 100;

       // Append candidate row to rowHTML
       rowHTML += `
       <tr>
         <td>${candidateName} (${candidateParty})</td>
         <td>${candidateVotes.toLocaleString()}</td>
         <td>${candidatePercent.toFixed(1)}%</td>
         <td>`;

       // Generate bar chart using createBar function
       for (let k = 0; k < candidatePercent; k++) {
           rowHTML += createBar(candidateParty);
       }

       rowHTML += `</td></tr>`; // Close table row
   }

   return rowHTML;
}

function createBar(partyType) {
   let barHTML = ""; 

   switch (partyType) {
       case "D":
           barHTML = "<td class='dem'></td>";
           break;
       case "R":
           barHTML = "<td class='rep'></td>";
           break;
       case "I":
           barHTML = "<td class='ind'></td>";
           break;
   }

   return barHTML;
}


/* Callback Function to calculate an array sum */
function calcSum(value) {
   totalVotes += value;
}

/* Function to calculate a percentage */
function calcPercent(value, sum) {
   return (100*value/sum);
}

