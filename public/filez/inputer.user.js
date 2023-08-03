// ==UserScript==
// @name         Highlight Input Text Value
// @namespace    http://tampermonkey-highlight-input-text-value
// @version      1
// @description  Highlights the input text value once it's entered using jQuery
// @include      *
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    $('input[type="text"]').on('input', function() {
      $(this).css('background-color', 'yellow');
      $(this).select();
    });
  });