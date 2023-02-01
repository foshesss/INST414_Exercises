const fs = require("fs")

// preload movies
let file = fs.readFileSync(
    "resources/imdb_movies_1985to2022.json", 
    {encoding:'utf8', flag:'r'}
);
file = file.trim();
file = file.split('\n');
const movies = file.map(JSON.parse);

// part 1
const getActorAverage = (actor, weighted = false) => {
    actor = actor.toLowerCase();
    let rating = 0;
    let numMovies = 0;

    movies.forEach(movieInfo => {
        const movieActors = movieInfo.actors;

        // check if target actor was apart of the movie
        let inMovie = false;

        // continue iterating until all actors have been checked
        // or target actor has been found
        for (let i = 0; i < movieActors.length && inMovie === false; i++) {
            inMovie = movieActors[i][1].toLowerCase() == actor;
        }

        // gtfo-- we don't wanna calculate movies that the target actor isn't in
        if (inMovie === false) return;

        // add in rating for calculation
        let currRating = movieInfo.rating.avg
        let weight = 1

        // if the optional 'weighted' argument is flagged 'true',
        // we will factor in number of votes to the average
        if (weighted === true) {
            weight = movieInfo.rating.votes
            currRating *= weight
        }

        rating += currRating
        numMovies += weight
    })

    // round to nearest hundredth
    return (numMovies === 0)  ? 0 : Math.round(100*rating/numMovies)/100;
}

const targetActor = "Hugh Jackman"
console.log(`Average rating for '${targetActor}' is: ${getActorAverage(targetActor)}`)
