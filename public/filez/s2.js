//this is a tampermonkey user script
(function() {
    'use strict';
    
    var barcodes = JSON.parse(sessionStorage.getItem('barcodes')) || [];
    // Define the maximum length of the barcodes array
    var MAX_BARCODES = 6;
    
    // Define the Barcode modal
    function barcode(code) {
        this.code = code;
        //add an svg element to the page
        modal = document.createElement("div");
        modal.innerHTML = `<h1>Girth: ${code}</h1>`;
        modal.style.display = "block";
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("id", "test");
        document.body.appendChild(modal);
        document.moadl.appendChild(svg);
    }
    
    
    // Input stuff
    var $input = $('<input>').attr('type', 'text');
    $input.css({
    'padding': '10px',
    'border': '1px solid #ccc'
    });
    $('body').append($input);
    $input.on('keypress', function(event) {
        if (event.which === 13) {
            bcodePusher();
    // Call the function for each barcode in the array
            barcodes.forEach(function(barcode) {
                processBarcode(barcode); 
            });
        }
    });
    
    function bcodePusher() {
        // Get the value of the input element
        var barcode = $input.val();
        if (barcodes.length === MAX_BARCODES) {
            // Remove the oldest entry from the array
            barcodes.shift();
        }
        barcodes.push(barcode);
        // Clear the input element
        $input.val('');
        // Update session storage with the new barcodes array
        sessionStorage.setItem('barcodes', JSON.stringify(barcodes));
        console.log('Barcodes array: ' + JSON.stringify(barcodes));
    }



    // Define the function to process each barcode
    function processBarcode(barcode) {
        $("#test").JsBarcode(barcode);
        console.log('Processing barcode: ' + barcode);
    }
    //add an svg element to the page
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "test");
    document.body.appendChild(svg);
    
    $( "#test" ).draggable();
    GM_addStyle(`
        #test {
            width: 100px;
            height: 100px;
            background: #ccc;
        }
    `);
    console.log("sdlf");

})();