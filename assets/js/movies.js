"use strict";

document.addEventListener("DOMContentLoaded", init);

let debug = true;
let APIkey = "3f73c98cb2fa0665149b568b9a437482";
let posterBaseURL = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

function init() {
    fetchMovies(APIkey);
}

function fetchMovies(APIkey) {

    fetch('https://api.themoviedb.org/3/person/51576/movie_credits?api_key=' + APIkey + '&language=en-US')
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {

            fillPosterArray(myJson);
            if (debug) {
                console.log("posterPath: " + myJson.cast[0].poster_path);
                console.log("myJson: " + JSON.stringify(myJson));
                console.log("APIkey: " + APIkey);
            }
        });
}

function fillPosterArray(myJson) {
    let posterArray = [];
    let titleArray = [];
    let yearArray = [];
    let overviewArray = [];
    for (let i = 0; i < myJson.cast.length; i++) {
        posterArray.push(myJson.cast[i].poster_path);
        titleArray.push(myJson.cast[i].title);
        yearArray.push(myJson.cast[i].release_date.substring(0,4));
        overviewArray.push(myJson.cast[i].overview);
    }
    displayPosters(posterArray, titleArray, yearArray, overviewArray);
    if (debug) {
        console.log("posterArray: " + posterArray);
        console.log("titleArray: " + titleArray);
        console.log("yearArray: " + yearArray);
        console.log("overviewArray :" + overviewArray);
    }
}

function displayPosters(posterArray, titleArray, yearArray, descriptionArray) {
    for (let i = 0; i < posterArray.length; i++) {
        /*description*/
        let description = document.createElement("div");
        let container = document.createElement("div");

        description.classList.add("leftcontainer","movie");


        let movieTitle = document.createElement("h2");
        let movieYear = document.createElement("h3");
        let movieOverview = document.createElement("p");
        let title = document.createTextNode(titleArray[i]);
        let year = document.createTextNode(yearArray[i]);
        let overview = document.createTextNode(descriptionArray[i]);
        movieTitle.appendChild(title);
        movieYear.appendChild(year);
        movieOverview.appendChild(overview);
        container.appendChild(movieTitle);
        container.appendChild(movieYear);
        container.appendChild(movieOverview);
        description.appendChild(container);
        document.querySelector("main").appendChild(description);

        /*poster*/
        let src;
        if (posterArray[i] === null) {
            src = "images/noimage.jpg";
        }
        let poster = document.createElement("figure");
        poster.classList.add("rightcontainer", "movie");
        let img = document.createElement("img");
        src = posterBaseURL + posterArray[i];
        img.setAttribute("src", src);
        img.setAttribute("title",titleArray[i]);
        img.setAttribute("alt",titleArray[i] + ": no image available");
        poster.appendChild(img);
        document.querySelector("main").appendChild(poster);
        if (debug) {
            console.log("img attributes: " + img.attributes);
            console.log("movieTitle: " + titleArray[i]);
        }
    }
}