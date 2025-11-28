"use strict";

/*

   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 1

   Author: Kyle Harris
   Date: 04/08/2025
   
   Filename: mpl_links.js

*/

window.onload = function () {
   // Get all select elements with the class 'optionLinks'
   let menus = document.querySelectorAll("select.optionLinks");

   // Loop through each select element and assign an onchange event handler
   for (let i = 0; i < menus.length; i++) {
      menus[i].onchange = function () {
         let selectedURL = this.value;

         // Only navigate if a valid URL is selected
         if (selectedURL !== "#") {
            window.location.href = selectedURL;
         }
      };
   }
};
