/*

    snoot.js
    Form Validation functions for snoot.html
    
    Author: Michael Solomon
    Date: August 6, 2018
    
*/

"use strict";

// functions to turn off select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    alert("Select lists: " + emptyBoxes.length);
}

// enable load event handlers
if (window.addEventListener) {
    window.addEventListener("load", removeSelectDefaults, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", removeSelectDefaults, false);
}
