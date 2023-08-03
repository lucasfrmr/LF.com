// ==UserScript==
// @name         Add Girth Column V3.0
// @version      0.1
// @description  Calculates & adds girth to fcresearch
// @author       @luofarme
// @match        *://fcresearch-na.aka.amazon.com/*/results?s=*
// @match        *://*/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var $ = window.jQuery;
    function waitForKeyElements(e, t, a, n) {
        var o, r;
        (o = void 0 === n ? $(e) : $(n).contents().find(e)) && o.length > 0 ? (r = !0, o.each(function() {
            var e = $(this);
            e.data("alreadyFound") || !1 || (t(e) ? r = !1 : e.data("alreadyFound", !0))
        })) :
        r = !1;
        var l = waitForKeyElements.controlObj || {},
            i = e.replace(/[^\w]/g, "_"),
            c = l[i];
        r && a && c ? (clearInterval(c), delete l[i]) : c || (
            c = setInterval(function() {
                waitForKeyElements(e, t, a, n)
            }, 300),
            l[i] = c);
        waitForKeyElements.controlObj = l;
    };

    function addGirthColumn(){
        // Find the table element
        var table = document.getElementsByClassName("a-keyvalue")[0];

        // Find the index of the "Dimensions" row
        var dimensionsRowIndex;
        for (var i = 0; i < table.rows.length; i++) {
            if (table.rows[i].cells[0].innerHTML === "Dimensions") {
                dimensionsRowIndex = i;
                break;
            }
        }

        // Extract the numbers from the "Dimensions"
        function getNumbersFromString(string) {
            // Use a regular expression to match all the numbers in the string
            var numbers = string.match(/\d+\.\d+|\d+/g);
            console.log("getNumbersFromString " + numbers);
            // Convert the matched numbers to an array of floats
            return numbers.map(function(number) {
                return parseFloat(number);
            });
        }

        // Extract the numbers from the "Dimensions" column
        var dimensionsString = table.rows[dimensionsRowIndex].cells[1].innerHTML;
        var dimensionsNumbers = getNumbersFromString(dimensionsString);

        // Calculate the girth using the girthCalc function
        function girthCalc(numbers) {
            numbers.sort(function(a, b){return a-b});
            var result = (2 * (numbers[0] + numbers[1])) + Math.max(...numbers);
            return result;
        }
        var girth = girthCalc(dimensionsNumbers);

        //Checking if any one number in the dimensionsNumbers array is greater than or equal to 70
        var moreThanSeventyInches = dimensionsNumbers.some(num => num >= 70);
        console.log(moreThanSeventyInches);

        // Create a new row element
        var row = table.insertRow(dimensionsRowIndex - 1);

        // Create a new cell element for the "Girth" column
        var girthCell = row.insertCell(0);
        girthCell.innerHTML = "Girth";
        girthCell.style.backgroundColor = "lightgrey";

        // Create a new cell element for the calculated girth value
        var girthValueCell = row.insertCell(1);
        girthValueCell.innerHTML = girth;

        // If the girth is less than 130, highlight the cell red
        if (girth < 130) {
            girthValueCell.style.border = "3px solid red";
        } else {
            girthValueCell.style.backgroundColor = "white";
        }

        //still need to split this into its own function for handling weight stuff

        // Find the index of the "Weight" row
        var weightRowIndex;
        for (let j = 0; j < table.rows.length; j++) {
            if (table.rows[j].cells[0].innerHTML === "Weight") {
                weightRowIndex = j;
                break;
            }
        }
        //Broken things ahead....

        // Extract the weight value from the "Weight" column
        var weightString = table.rows[weightRowIndex].cells[1].innerHTML;
        var weight = parseFloat(weightString.match(/\d+\.\d+|\d+/g));
        console.log(weight);
        if(weight > 50){
            weightString.style.border = "3px solid red";
        }

        var transOut;
        if (girth < 130 && weight < 50 && moreThanSeventyInches === false) {
            transOut = true;
            console.log(transOut);
            document.body.style.backgroundColor = "lightred";
        }

        console.log(transOut);

        a = true;
    };

    waitForKeyElements( $("table th:contains('Dimensions')"), addGirthColumn);




    if (transOut){
        document.body.style.backgroundColor = "lightred";
    }
})();
