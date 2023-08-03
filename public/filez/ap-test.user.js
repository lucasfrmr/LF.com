// ==UserScript==
// @name         AP Test
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  AP Test Ajax Request with Tampermonkey
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    let asin = "your_asin_value_here";

    GM_xmlhttpRequest({
        method: "POST",
        headers: {'content-type':"application/x-www-form-urlencoded; charset=UTF-8"},
        url: "http://fcresearch-"+$.cookie('cfg-region')+".aka.amazon.com/"+$.cookie('fcmenu-warehouseId')+"/results/product",
        data: { s: asin},
        onload: function(response) {
            console.log(response.responseText);
        }
    });
})();
