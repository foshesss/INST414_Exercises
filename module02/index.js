
// part 1
fetch("https://api.aviationapi.com/v1/airports?apt=DCA,IAD,BWI")
.then(response => {
    ret = response.json()
    ret.then(response => {
        console.log(response)
    })
})

// part 2
const fs = require("fs")

// preload movies
let file = fs.readFileSync(
    "resources/imdb_movies_1985to2022.json", 
    {encoding:'utf8', flag:'r'}
);
file = file.trim();
file = file.split('\n');
const movies = file.map(JSON.parse);

// define all connections
const connections = {
    
}

movies.forEach(movie => {
    // loop through actors
    movie.actors.forEach(([_, actor]) => {
        if (!connections[actor]) {
            connections[actor] = new Set()
        }

        movie.actors.forEach(([_, friend]) => {
            if (actor === friend) return;
            connections[actor].add(friend)
        })
    })
})

// create adjacencyList
var adjacencyList = Object.keys(connections).map(
    (key) => { return [key, connections[key]] });

// sort from most connections to least
adjacencyList.sort(
    ([_a, numConnectA], [_b, numConnectB]) => { return numConnectB.size - numConnectA.size }
);

// get top 10
for (let i = 0; i < 10; i++) {
    console.log(adjacencyList[i][0], 
        `has ${adjacencyList[i][1].size} connections.`)
}

// part 3



