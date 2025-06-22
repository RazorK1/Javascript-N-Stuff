"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Review Assignment

   Author: Kyle Harris
   Date: 03/24/2025

   Filename: bc_keys.js (not bc_keys_txt.js)

   Functions
   =========
   
   findKeyWords()
      Locate the keywords in the article indicated by the <dfn> tag
      and add those keywords in alphabetical order to a keyword box.
      
   makeKeyStyles()
      Create an embedded style sheet for the keyword box.

      
   replaceWS(textStr)
      Replaces occurences of one or more consecutive white space
      characters with the _ character.

*/



/* Supplied Functions */

console.log('JavaScript loaded');

function replaceWS(textStr) {
   var revText = textStr.replace(/\s+/g,"_");
   return revText;
}


/////////// Task #02: Define the findKeyWords() function
function findKeyWords() {
   // Select all <dfn> elements in the article
   let keywords = document.querySelectorAll("article dfn");

   // Create an array to store the text content of the keywords
   let keywordList = [];

   // Loop through each <dfn> element, add the text content to the array,
   // and assign an ID to the <dfn> element based on the keyword
   keywords.forEach(function(keyword, index) {
      let keywordText = keyword.textContent.trim();
      let keywordId = replaceWS(keywordText);

      // Assign an ID to the <dfn> element (if it doesn't already have one)
      if (!keyword.id) {
         keyword.id = keywordId;
      }

      // Push the keyword to the list for later use
      keywordList.push({ text: keywordText, id: keywordId });
   });

   // Sort the keyword list alphabetically
   keywordList.sort((a, b) => a.text.localeCompare(b.text));

   // Get the aside#keywords element to display the sorted list
   let keywordBox = document.getElementById("keywords");
   let keywordListHtml = "<h1>Keywords</h1><ol>";

   // Add each keyword to the ordered list in the keyword box
   keywordList.forEach(function(keyword) {
      let link = `<a href="#${keyword.id}">${keyword.text}</a>`;
      keywordListHtml += `<li>${link}</li>`;
   });

   keywordListHtml += "</ol>";
   keywordBox.innerHTML = keywordListHtml;

   // Now, add event listeners to the keyword links
   addKeywordEventListeners();
}


///////// Task #03: Define the makeKeyStyles() function 
function makeKeyStyles() {
   // Create a <style> element to hold the styles
   let styleSheet = document.createElement("style");
   styleSheet.type = "text/css";
   document.head.appendChild(styleSheet);

   // Add styles for the keyword box
   styleSheet.innerHTML = `
      aside#keywords {
         float: right;
         width: 320px;
         margin: 20px 0px 20px 20px;
         border: 1px solid rgb(101, 101, 101);
         padding: 10px;
      }

      aside#keywords h1 {
         font-size: 2em;
         margin: 5px;
         text-align: center;
      }

      aside#keywords ol {
         margin-left: 20px;
         font-size: 1.2em;
      }

      aside#keywords ol li {
         line-height: 1.5em;
      }

      aside#keywords ol li a {
         text-decoration: none;
         color: rgb(101, 101, 101);
      }

      aside#keywords ol li a:hover {
         color: rgb(255, 102, 102);
         text-decoration: underline;
      }
   `;
}

//////////// Task #04: Add event listeners 
function addKeywordEventListeners() {
   // Get all the <a> tags inside the <ol> in the keywords section
   let keywordLinks = document.querySelectorAll("aside#keywords ol li a");

   // Loop through all the <a> tags and add an event listener to each one
   keywordLinks.forEach(function(link) {
      link.addEventListener("click", function(event) {
         // Prevent the default behavior of the link (optional, if links are to be used for other actions)
         event.preventDefault();
         
         // Highlight the clicked keyword
         keywordLinks.forEach(function(otherLink) {
            otherLink.style.fontWeight = "normal"; // Reset the style for all keywords
         });

         // Change the style of the clicked keyword (highlight it)
         //link.style.fontWeight = "bold";
         link.style.color = "rgb(255, 102, 102)"; // Optional: Change the color to make it stand out

         // Scroll to the section where the keyword is defined
         let keywordId = link.getAttribute("href").substring(1); // Get the ID from href
         let keywordElement = document.getElementById(keywordId);
         if (keywordElement) {
            keywordElement.scrollIntoView({
               behavior: "smooth", 
               block: "center"
            });
         }

         // Optionally, you can add other actions here, such as displaying more information about the keyword
         console.log("Keyword clicked:", link.textContent);
      });
   });
}

// Run functions after the page content has loaded
window.onload = function() {
   makeKeyStyles();  // Make sure the styles are applied first
   findKeyWords();  // Populate the keyword box
   addKeywordEventListeners();  // Add event listeners to the keyword links
};


//////////////////////////////////////// OLD CODE
/*
function findKeyWords() {
   // Select all <dfn> elements inside the article
   let dfnElements = document.querySelectorAll("article dfn");
   
   // Extract and clean text content from each <dfn> element
   let keywords = Array.from(dfnElements).map(dfn => dfn.textContent.trim());

   // Sort the keywords alphabetically (case-insensitive)
   keywords.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

   // Get the keyword box element
   let keywordBox = document.getElementById("keywords");

   // Clear previous content
   keywordBox.innerHTML = "";

   // Populate the keyword box with the sorted keywords
   keywords.forEach(word => {
       let keywordSpan = document.createElement("span");
       keywordSpan.textContent = word;
       keywordSpan.classList.add("keyword");
       keywordBox.appendChild(keywordSpan);
       keywordBox.appendChild(document.createTextNode(" ")); // Add space between words
   });
}
*/
