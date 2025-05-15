"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Kyle Harris
   Date: 03/28/2025

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

// Global variables initialization
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

// Event handler to run makeTree() when the page loads
window.onload = makeTree;

function makeTree() {
   var treeBox = document.createElement("aside");
   treeBox.id = "treeBox";
   treeBox.innerHTML = "<h1>Node Tree</h1>";
   
   var nodeList = document.createElement("ol");
   treeBox.appendChild(nodeList);
   
   var sourceArticle = document.querySelector("#main article");
   makeBranches(sourceArticle, nodeList);
   
   document.getElementById("main").appendChild(treeBox);

   //////////////////////////////////////////////////////////////////////////////////
    // Update the span elements with the count of nodes, element nodes, text nodes, and whitespace nodes
    document.getElementById("totalNodes").textContent = nodeCount; // Total number of nodes
    document.getElementById("elemNodes").textContent = elemCount; // Number of element nodes
    document.getElementById("textNodes").textContent = textCount; // Number of text nodes
    document.getElementById("wsNodes").textContent = wsCount; // Number of whitespace text nodes
}

// Define Node constants for non-browser environments
const Node = {
   ELEMENT_NODE: 1,
   TEXT_NODE: 3
};


function makeBranches(treeNode, nestedList) {
   // Increment the node count
   nodeCount++;

   // Create the list item and span element
   var liElem = document.createElement("li");
   var spanElem = document.createElement("span");

   liElem.appendChild(spanElem);
   nestedList.appendChild(liElem);

   // Check if the node is an element node
   if (treeNode.nodeType === Node.ELEMENT_NODE) {
      elemCount++;
      spanElem.className = "elementNode";
      spanElem.textContent = `+--<${treeNode.nodeName.toLowerCase()}>`; // Add +-- here
   }
   // Check if the node is a text node
   else if (treeNode.nodeType === Node.TEXT_NODE) {
       var textString = treeNode.nodeValue;

       if (isWhiteSpaceNode(textString)) {
           wsCount++;
           spanElem.className = "whiteSpaceNode";
           spanElem.textContent = "#text";
       } else {
           spanElem.className = "textNode";
           spanElem.textContent = textString;
       }
       textCount++; // Ensure text nodes are always counted
   }

   // Recursively process child nodes
   if (treeNode.childNodes.length > 0) {
       var newList = document.createElement("ol");
       newList.textContent = "|"; // Ensure it visually represents the hierarchy
       nestedList.appendChild(newList);

       for (let n = 0; n < treeNode.childNodes.length; n++) {
           makeBranches(treeNode.childNodes[n], newList);
       }
   }
}

function isWhiteSpaceNode(tString) {
   return !(/[^\t\n\r ]/.test(tString));
}
