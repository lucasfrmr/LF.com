// ==UserScript==
// @name My Navbar Modal
// @namespace http://www.example.com/
// @version 1.0
// @description Adds a navbar modal with links to the top of the window
// @author Your Name
// @match *://*/*
// @grant none
// ==/UserScript==

// Create the modal element
var modal = document.createElement("div");
modal.style.position = "fixed";
modal.style.top = "0";
modal.style.left = "0";
modal.style.width = "100%";
modal.style.height = "5em";
modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
modal.style.display = "none";

// Create the navbar element
var navbar = document.createElement("nav");
navbar.style.display = "flex";
navbar.style.justifyContent = "space-between";
navbar.style.alignItems = "center";
navbar.style.height = "100%";
navbar.style.padding = "0 1em";

// Add the navbar to the modal
modal.appendChild(navbar);

// Create the links
var links = [
  {
    name: "Link 1",
    url: "http://www.example.com/link1",
  },
  {
    name: "Link 2",
    url: "http://www.example.com/link2",
  },
  {
    name: "Link 3",
    url: "http://www.example.com/link3",
  },
  {
    name: "Link 4",
    url: "http://www.example.com/link4",
  },
  {
    name: "Link 5",
    url: "http://www.example.com/link5",
  },
  {
    name: "Link 6",
    url: "http://www.example.com/link6",
  },
];

// Add the links to the navbar
for (var i = 0; i < links.length; i++) {
  var link = document.createElement("a");
  link.href = links[i].url;
  link.innerText = links[i].name;
  navbar.appendChild(link);
}

// Add the modal to the body of the page
document.body.appendChild(modal);

// Add a keydown event listener to the document to toggle the modal
document.addEventListener("keydown", function (event) {
    if (event.altKey && event.shiftKey && event.code == "KeyX") {
      if (modal.style.display === "none") {
        modal.style.display = "block";
      } else {
        modal.style.display = "none";
      }
    }
  });
  