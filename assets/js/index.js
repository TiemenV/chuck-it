"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    console.log("init");
    document.querySelector("button").addEventListener("click", fetchJoke);
}

function fetchJoke() {
    console.log("fetchJoke");

    fetch('https://api.chucknorris.io/jokes/random')
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            document.querySelector("p").innerHTML = myJson.value;
        });
}
