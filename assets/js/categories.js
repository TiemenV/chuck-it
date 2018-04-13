"use strict";

document.addEventListener("DOMContentLoaded", init);
let allButtons = [];
let debug = true;

function init() {
    allButtons = document.querySelectorAll(".buttonholder");
    for (let i = 0; i < allButtons.length; i++) {
        allButtons[i].addEventListener("click", fetchJoke);
    }
    if (debug) {
        console.log(allButtons);
    }
}

function fetchJoke(e) {
    e.preventDefault();
    if (debug) {
        console.log("fetchJoke");
        console.log("e.target.value: " + e.target.value);
        console.log("e.target.innerHTML: " + e.target.innerHTML);
    }
    let category = e.target.value;
    fetch('https://api.chucknorris.io/jokes/random?category=' + category)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            document.querySelector("p").innerHTML = myJson.value;
            document.querySelector("h2").innerHTML = "Category: " + e.target.innerHTML.toLowerCase();
        });
}
