/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the 'games' array
    for (const game of games) {
        // Create a new div element, which will become the game card
        const gameCard = document.createElement("div");

        // Add the class 'game-card' to the game card
        gameCard.classList.add("game-card");

        // Set the inner HTML using a template literal to display info about each game
        gameCard.innerHTML = ` 
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
            <p>Backers: ${game.backers.toLocaleString()}</p>
            <p>Goal: $${game.goal.toLocaleString()}</p>
            `;

        // Append the game card to the 'games-container'
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function with the 'GAMES_JSON' data to add all games to the page
addGamesToPage(GAMES_JSON);



// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => {
  return accumulator + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// use reduce() to calculate the total amount raised by summing the 'pledged' property of each game
const totalRaised = GAMES_JSON.reduce((accumulator, game) => {
  return accumulator + game.pledged;
}, 0);

// set inner HTML using template literal and toLocaleString to get a number with commas
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// set inner HTML with the length of the GAMES_JSON array to display the total number of games
gamesCard.innerHTML = GAMES_JSON.length;

// rest of the code related to other challenges...


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// Select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}
// Add event listener to the unfundedBtn
unfundedBtn.addEventListener("click", function () {
    console.log("unfunded btn clicked!"); // This log will appear when the button is clicked
    filterUnfundedOnly(); // Call the filterFundedOnly function
});

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add funded games to the DOM
    addGamesToPage(fundedGames);
}

// Add event listener to the fundedBtn
fundedBtn.addEventListener("click", function () {
    console.log("fundedBtn clicked!"); // This log will appear when the button is clicked
    filterFundedOnly(); // Call the filterFundedOnly function
});


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}
// Add event listener to the fundedBtn
allBtn.addEventListener("click", function () {
    console.log("all games clicked!"); // This log will appear when the button is clicked
    showAllGames(); // Call the filterFundedOnly function
});




/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
const descriptionContainer = document.getElementById("description-container");

// Use the filter function to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter((game) => game.pledged < game.goal).length;

// Create a template string that explains the number of unfunded games
const unfundedGamesMessage = unfundedGamesCount > 0
  ? `We currently have ${unfundedGamesCount} unfunded games waiting for support.`
  : "All of our games are fully funded! Thank you for your support.";

// Create a new DOM element containing the template string and append it to the description container
const unfundedGamesElement = document.createElement("p");
unfundedGamesElement.textContent = unfundedGamesMessage;
descriptionContainer.appendChild(unfundedGamesElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games array based on the pledged amount (descending order)
const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

// Use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// Create a template string to display the top two games' information
const firstGameTemplate = `
    <h3>🥇 Top Funded Game</h3>
    <p>${firstGame.name}</p>
    <p>Pledged: $${firstGame.pledged.toLocaleString()}</p>
`;

const secondGameTemplate = `
    <h3>🥈 Runner Up</h3>
    <p>${secondGame.name}</p>
    <p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
`;

// Set the innerHTML of the firstGameContainer and secondGameContainer
firstGameContainer.innerHTML = firstGameTemplate;
secondGameContainer.innerHTML = secondGameTemplate;
