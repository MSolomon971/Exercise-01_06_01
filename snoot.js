/*

    snoot.js
    Form Validation functions for snoot.html
    
    Author: Michael Solomon
    Date: August 6, 2018
    
*/

"use strict";

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();

// functions to turn off select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

//funciton to set up document fragments for days of months
function setUpDays() {
    //get the days option tags
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

//function tp update the days select list
function updateDays() {
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryYear.selectedIndex = 0;
    }
    // if feb and 2020 - leap year
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDay.appendChild(twentyNine.cloneNode(true));
        
    }

    //else 30 day month - thirty
    else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" || selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));
        
    }

    //else 31 month - thirtyOne
      else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" || selectedMonth === "7" || selectedMonth === "8" || selectedMonth === "10" || selectedMonth === "12") {
          deliveryDay.appendChild(thirtyOne.cloneNode(true));          
      }  
}

// function to see if custom messages is checked
function autoCheckCustom() {
     var messageBox = document.getElementById("customText");
    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) { //if textarea actualll has something in it
        document.getElementById("custom").checked = "checked";
    }
    else  { //textarea has nothing
        document.getElementById("custom").checked = "";
    }
}

//functions to fun on page load
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

//Function to create out event listeners
function createEventListeners() {
     var deliveryMonth = document.getElementById("delivMo");
    
    if (deliveryMonth.addEventListener) {
       deliveryMonth.addEventListener("change", updateDays, false);
    } else if (deliveryMonth.attachEvent) {
        deliveryMonth.attachEvent("onchange", updateDays, false);
    }
    var deliveryYear = document.getElementById("delivYr");
     if (deliveryYear.addEventListener) {
       deliveryYear.addEventListener("change", updateDays, false);
    } else if (deliveryYear.attachEvent) {
        deliveryYear.attachEvent("onchange", updateDays, false);
    }   
    var messageBox = document.getElementById("customText");
     if (messageBox.addEventListener) {
       messageBox.addEventListener("change", autoCheckCustom, false);
    } else if (messageBox.attachEvent) {
        messageBox.attachEvent("onchange", autoCheckCustom, false);
    }
}

// enable load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage, false);
}
