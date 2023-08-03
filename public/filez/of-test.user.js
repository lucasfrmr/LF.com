// ==UserScript==
// @name         Ajax Request Test
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Test Ajax Request with Tampermonkey
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';
    let queryParam = "name=John";
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://example.com/oldfart/oldfart.cgi?" + queryParam,
        onload: function(response) {
            console.log(response.responseText);
        }
    });
})();
