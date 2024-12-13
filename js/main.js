/*jslint browser:true */
"use strict";

function addMonths(elem) {
    var annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
    var months = document.getElementById(elem).getElementsByTagName('input');
    for (i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        annualUseKw += x;
    }
    dailyUseKw = annualUseKw / 365;
    return dailyUseKw;
}

function sunHours() {
    var hrs;
    var theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;
    switch (theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    }
    return hrs;
}

function calculatePanel() {
    var userChoice = document.forms.solarForm.panel.selectedIndex;
    var panelOptions = document.forms.solarForm.panel.options;
    var power = panelOptions[userChoice].value;
    var name = panelOptions[userChoice].text;
    var x = [power, name];
    return x;
}

function calculateSolar() {
    // Get the user's power consumption and calculate daily use
    var dailyUseKw = addMonths('mpc');
    
    // Get the sunshine hours per day for the selected zone
    var sunHoursPerDay = sunHours();
    
    // Calculate minimum kW needs and adjust for real-world conditions
    var minKwNeeds = dailyUseKw / sunHoursPerDay;
    var realKwNeeds = minKwNeeds * 1.25;
    var realWattNeeds = realKwNeeds * 1000; // Convert to watts

    // Get the selected solar panel info
    var panelInfo = calculatePanel();
    var panelOutput = panelInfo[0]; // panel output in watts
    var panelName = panelInfo[1];

    // Calculate number of panels needed (rounded up)
    var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);

    // Prepare feedback to display to the user
    var feedback = "";
    feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + " kWh, you will need to purchase " + panelsNeeded + " " + panelName + " solar panels to offset 100% of your electricity bill.</p>";
    feedback += "<h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " KWh per day.</p>";
    feedback += "<p>Average sunshine hours per day: " + sunHoursPerDay + " hours.</p>";
    feedback += "<p>Realistic watts needed per hour: " + Math.round(realWattNeeds) + " watts/hour.</p>";
    feedback += "<p>The " + panelName + " panel you selected generates about " + panelOutput + " watts per day.</p>";

    // Display the feedback on the webpage
    document.getElementById('feedback').innerHTML = feedback;
}

// Function to reset the form and clear feedback
function resetForm() {
    // Reset all form inputs
    document.forms.solarForm.reset();
    
    // Reset feedback
    document.getElementById('feedback').innerHTML = "<p>Enter your information above to calculate your solar needs.</p>";
}
