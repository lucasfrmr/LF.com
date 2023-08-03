// ==UserScript==
// @name         Auto Select DataTable Filter Input Box
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically selects text in the filter input box of a DataTable from dataTablejs when the page loads or the table is redrawn, and changes the background color of the body to green if the filter shows any results.
// @author       ChatGPT
// @match        *://*/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Attach a keyup event listener to the filter input box
    $(document).on('keyup', '#containers-record-report_filter input[type="text"]', function() {
        // Find the DataTable instance
        var dataTable = $('.dataTable').DataTable();

        // Get the number of filtered rows
        var filteredRows = dataTable.rows({ search: 'applied' }).nodes().length;

        // Change the background color of the body to green if there are any filtered rows
        if (filteredRows > 0) {
            $('body').css('background-color', 'green');
        } else {
            $('body').css('background-color', '');
        }

        // Code to run when the user enters text into the filter input box
        console.log('Filter changed: ' + $(this).val());
    });

    // Check if the current page has a DataTable
    if (typeof $ !== 'undefined' && $.fn.dataTable) {
        // Find the DataTable's filter input box
        var filterInput = $('#containers-record-report_filter input[type="text"]');

        // Keep the text selected when the user clicks on the input field
        filterInput.click(function() {
          this.select();
        });

        // Keep the text selected when the user tabs into the input field
        filterInput.focus(function() {
          this.select();
        });

        // Add a listener for DataTable's draw event
        $(document).on('draw.dt', function() {
            // Check if the filter input box exists and is not already focused
            if (filterInput.length && !filterInput.is(':focus')) {
                // Select the text in the filter input box
                filterInput.select();
            }
        });
    }
})();
