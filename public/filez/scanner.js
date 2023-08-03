// This is a Tampermonkey user script
(function() {
    'use strict';

    const MAX_BARCODES = 6;
    let barcodes = JSON.parse(sessionStorage.getItem('barcodes')) || [];

    // Create an input element
    const input = document.createElement('input');
    input.type = 'text';
    input.style.padding = '10px';
    input.style.border = '1px solid #ccc';
    document.body.appendChild(input);

    // Bind an event listener to the input element for the 'keypress' event
    input.addEventListener('keypress', event => {
        if (event.which === 13) {
            bcodePusher();
            barcodes.forEach(processBarcode);
        }
    });

    function bcodePusher() {
        if (barcodes.length === MAX_BARCODES) {
            barcodes.shift();
        }
        barcodes.push(input.value);
        input.value = '';
        sessionStorage.setItem('barcodes', JSON.stringify(barcodes));
        console.log('Barcodes array:', JSON.stringify(barcodes));
    }

    function processBarcode(barcode) {
        $("#" + barcode).JsBarcode(barcode);
        console.log('Processing barcode:', barcode);
        createModal(barcode);
    }

    function createModal(barcode) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", barcode);
        document.body.appendChild(svg);
    }


    // Add an SVG element to the page
    // const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // svg.setAttribute("id", "test");
    // document.body.appendChild(svg);

    console.log("r");
})();
