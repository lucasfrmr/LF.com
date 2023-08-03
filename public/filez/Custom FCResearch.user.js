// ==UserScript==
// @name         XLResearch
// @version      2.4.1
// @description  Custom FCResearch for AMXL terminals
// @author       @luofarme & @jamestgh special thanks to @brausean 
// @match        *://fcresearch-na.aka.amazon.com/*/results?s=*
// @updateURL    #
// @downloadURL  #
// @require      https://code.jquery.com/jquery-3.6.4.min.js#sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=
// ==/UserScript==

function waitforElement(e,t,n,o){let a=+t,r=function(){$(e).length?o():--a&&setTimeout(()=>{r()},n)};r()}function CustomFCR(){$("span.warehouse-id").prop("contenteditable",!0).css({"outline-style":"none"}),$("span.warehouse-id").click(function(){$(this).keypress(function(e){(e.keyCode?e.keyCode:e.which)=="13"&&(window.location.href=window.location.href.replace(RegExp("(/"+window.location.href.split("/")[3]+"/)","g"),"/"+$(this).text()+"/"))})});let e={};$("table.a-keyvalue:first tr").each(function(t,n){e[$(n).find("th").text()]=$(n).find("td").text()});let t=Number(e.Weight.match(/\d+\.\d+|\d+/g)[0]);function n(e){return e<=85?"green":e<=100?"orange":e<150?"yellow":e>=150?"red":void 0}$(".a-box-inner").eq(0).css("background-color",n(t)),$('table th:contains("Weight")').next().css("background-color",n(t));let o=e.Dimensions.match(/\d+\.\d+|\d+/g).map(Number).sort(function(e,t){return e-t}),a=2*(o[0]+o[1])+Math.max(...o);$('table th:contains("Dimensions")').closest("tr").after($("<tr>").append($("<th>").text("Girth").css("background","#F3F3F3")).append($("<td>").text(a))),t>=50||a>=130||o.some(e=>e>70)||($("table.a-keyvalue:first").css("background-color","#FFFFFF"),$("head").append($("<style>").text(`
            @keyframes pulse-neongreen { 0% { background-color: #FFFFFF; } 50% { background-color: #39FF14; } 100% { background-color: #FFFFFF; } }
            .pulse-neongreen { animation: pulse-neongreen 2s ease-in-out infinite; }
        `)),$(".a-box-inner").eq(1).addClass("pulse-neongreen"))}waitforElement("table.a-keyvalue:first",40,250,CustomFCR);