// ==UserScript==
// @name         Custom FCResearch
// @version      2.0.0
// @description  Custom FCResearch
// @author       @luofarme & @theghosth4x0r
// @match        *://fcresearch-na.aka.amazon.com/*/results?s=*
// @match        *://*/*
// @updateURL    https://lucasfarmer.com/files/CustomFCResearch.meta.js
// @downloadURL  https://lucasfarmer.com/files/CustomFCResearch.user.js
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==

function waitforElement(element, max, timeout, callback) {
    let i = +max, loop = function() { $(element).length ? callback() : --i && setTimeout(() => { loop() }, timeout) };
    loop();
};

function customPage() {
    // extract all the data from the table into an object (tableData) with key:value pairs
    let tableData = {};
    $('table.a-keyvalue:first tr').each(function(index, row) {
        tableData[$(row).find('th').text()] = $(row).find('td').text();
    });
    // get the weight from tableData and extract just the numbers
    let weight = Number(tableData['Weight'].match(/\d+\.\d+|\d+/g)[0]);

    function weightColor(weight) {
        if (weight < 85) {return 'green';}
        else if (weight < 100) {return 'orange';}
        else if (weight < 150) {return 'yellow';}
        else if (weight > 150) {return 'red';};
    };
    $('.a-box-inner:first').css('background-color', weightColor(weight));
    $('table th:contains("Weight")').next().css('background-color', weightColor(weight));
    // get the dimension numbers from tableData into an array as numbers and sort them in ascending order
    let dimensions = tableData['Dimensions'].match(/\d+\.\d+|\d+/g).map(Number).sort(function(a, b){ return a-b });
    // calculate the girth using the array of numbers
    let girth = (2 * (dimensions[0] + dimensions[1])) + Math.max(...dimensions);
    // create a new row in the table for girth with the value
    $('table th:contains("Dimensions")').closest('tr').after($('<tr>')
        .append($('<th>').text('Girth').addClass('girthHead').css('background', '#F3F3F3'))
        .append($('<td>').text(girth)).addClass('girthData')
    );
    // weight has to be over 50, girth is greater than 130, and any dimension has to be over 70
    if (!(weight >= 50) && !(girth >= 130) && !(dimensions.some(value => { return value > 70 }))) {
        $('table.a-keyvalue:first').css('background-color', '#FFFFFF');
        $('head').append($('<style>').text(`
            @keyframes pulse-green {0% {background-color: #FFFFFF;}50% {background-color: #39FF14;}100% {background-color: #FFFFFF;}}
            .pulse-green {animation: pulse-green 2s ease-in-out infinite;}
        `));
        $('.a-box-inner').eq(1).addClass('pulse-green');
    };
};

waitforElement('table.a-keyvalue:first', 40, 200, customPage);