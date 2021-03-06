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
var formValidity = false;

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
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }
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
    } else { //textarea has nothing
        document.getElementById("custom").checked = "";
    }
}

//functions to fun on page load
function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
}

// function to validate address
function validateAddress(fieldsetId) {
    var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
    var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = inputElements.length;
    var currentElement = null;
    try {
        //loop required input elements
        for (var i = 0; i < elementCount; i++) {
            currentElement = inputElements[i];
            // test for blank
            if (currentElement.value === "") {
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            } else {
                currentElement.style.background = "white";
            }
        }
        //validate select listenrs
        currentElement = document.querySelectorAll("#" + fieldsetId + " select")[0];
        //blank
        if (currentElement.selectedIndex === -1) {
            currentElement.style.border = "1px solid red";
            fieldsetValidity = false;
        }
        //validate 
        else {
            currentElement.style.border = "white";

        }
        if (fieldsetValidity === false) {
            if (fieldsetId === "billingAddress") {
                throw "Please complete all billing Address information";
            } else {
                throw "Please complete all delivery Address information"
            }
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// function to validate delivery dates
function validateDeliveryDate() {
    var selectElements = document.querySelectorAll("#deliveryDate" + " select");
    var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
    var fieldsetValidity = true;
    var elementCount = selectElements.length;
    var currentElement = null;
    try {
        //loop required select elements
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            // test for blank
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else {
                currentElement.style.border = "none";
            }
        }
        if (fieldsetValidity === false) {
            throw "Please specify a delivery date.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "Please specify a delivery date.";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        formValidity = false;
    }
}

// function to validate payment
function validatePayment() {
    var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
    var fieldsetValidity = true;
    //Get radio buttons
    var cards = document.getElementsByName("PaymentType");
    var ccNumElement = document.getElementById("ccNum");
    var selectElements = document.querySelectorAll("#paymentInfo" + " select");
    var elementCount = selectElements.length;
    var cvvElement = document.getElementById("cvv");
    var currentElement = null;
    try {
        // check radio buttons or require 1 checked
        if (!cards[0].checked && !cards[1].checked && !cards[2].checked && !cards[3].checked) {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "1px solid red";
            }
            fieldsetValidity = false;
        } else {
            for (var i = 0; i < cards.length; i++) {
                cards[i].style.outline = "";
            }
        }
        // check card number format
        if (ccNumElement.value === "") {
            ccNumElement.style.background = "rgb(255, 233, 233)";
            fieldsetValidity = false;
        } else {
            ccNumElement.style.background = "white";
        }
        // validate exploration
        for (var i = 0; i < elementCount; i++) {
            currentElement = selectElements[i];
            if (currentElement.selectedIndex === -1) {
                currentElement.style.border = "1px solid red";
                fieldsetValidity = false;
            } else {
                currentElement.style.border = "none";
            }
        }
        // check cvv number format
        if (cvvElement.value === "") {
            cvvElement.style.background = "rgb(255, 233, 233)";
            fieldsetValidity = false;
        } else {
            cvvElement.style.background = "white";
            alert("else");
        }

        if (fieldsetValidity === false) {
            throw "Please complete all Payment Info.";
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "Please specify a delivery date.";
        }
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msg.style.background = "rgb(255,233,233)";
        formValidity = false;
    }
}

//validate custom message
function validateMessage() {
    var msgBox = document.querySelectorAll("customText");
    var errorDiv = document.querySelectorAll("#message" + " .errorMessage")[0];
    var fieldsetValidity = true;
    try {
        if (document.getElementById("custom").checked && (msgBox.placeholder)){
            throw"please enter your Message text"
            
        } else {
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
            msgBox.style.background = "white";
            
        }
      
    } catch (msg) {
        errorDiv.style.display = "block";
        errorDiv.innerHTML = msg;
        msg.style.background = "rgb(255,233,233)";
        formValidity = false;
    }
}



// function to validate entire formValidity
function validateForm(evt) {
    if (evt.preventDefault) {
        evt.preventDefault();
    } else {
        evt.returnValue = false;
    }

    validateAddress("billingAddress");
    validateAddress("deliveryAddress");
    validateDeliveryDate();
    validatePayment();


    if (formValidity === true) {
        document.getElementById('errorText').innerHTML = "";
        document.getElementById('errorText').style.display = "none";
        document.getElementsByTagName("form")[0].submit();
    } else {
        document.getElementById('errorText').innerHTML = "Please Fix the indicated problems and then resubmit you order.";
        document.getElementById('errorText').style.display = "block";
        scroll(0, 0);
    }
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
    var same = document.getElementById("sameAddr");
    if (same.addEventListener) {
        same.addEventListener("change", copyBillingAddress, false);
    } else if (same.attachEvent) {
        same.attachEvent("onchange", copyBillingAddress, false);
    }
    var form = document.getElementsByTagName("form")[0];
    if (form.addEventListener) {
        form.addEventListener("submit", validateForm, false);
    } else if (form.attachEvent) {
        form.attachEvent("onsubmit", validateForm);
    }
}

//functions to copy delivery to billing address
function copyBillingAddress() {
    var billingInputElments = document.querySelectorAll("#billingAddress input");
    var deliveryInputElments = document.querySelectorAll("#deliveryAddress input");
    // if checkbox checked - copy all feilds
    if (document.getElementById("sameAddr").checked) {
        for (var i = 0; i < billingInputElments.length; i++) {
            deliveryInputElments[i + 1].value = billingInputElments[i].value;
        }
        document.querySelector("#deliveryAddress select").value = document.querySelector("#billingAddress select").value;
    }
    // else erase all fields
    else {
        for (var i = 0; i < billingInputElments.length; i++) {
            deliveryInputElments[i + 1].value = "";
        }
        document.querySelector("#deliveryAddress select").value = -1;
    }
}

// enable load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage, false);
}
