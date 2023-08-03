// ==UserScript==
// @name         Auto Select DataTable Filter Input Box
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically selects text in the filter input box of a DataTable from dataTablejs when the page loads or the table is redrawn, and changes the background color of the body to green if the filter shows any results.
// @author       ChatGPT
// @match        *://*/*
// @require        https://code.jquery.com/jquery-3.3.1.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Check if the current page has a DataTable
    if (typeof $ !== 'undefined' && $.fn.dataTable) {
        // Add a listener for DataTable's draw event
        $(document).on('draw.dt', function() {
            // Find the DataTable's filter input box
            var filterInput = $('.dataTables_filter input');

            // Keep the text selected when the user clicks on the input field
            filterInput.click(function() {
              this.select();
            });

            // Keep the text selected when the user tabs into the input field
            filterInput.focus(function() {
              this.select();
            });

            // Check if the filter input box exists and is not already focused
            if (filterInput.length && !filterInput.is(':focus')) {
                // Select the text in the filter input box
                filterInput.select();
            }

            // Check if the DataTable shows any results
            if ($.fn.dataTable.isDataTable('.dataTable')) {
                var dataTable = $('.dataTable').DataTable();
                var filteredRows = dataTable.rows({search: 'applied'}).nodes();

                if (filteredRows.length > 0) {
                    // Change the background color of the body to green
                    $('body').css('background-color', 'green');
                } else {
                    // Change the background color of the body back to its original color
                    $('body').css('background-color', '');
                }
            }
        });
    }
})();
