const listOfAllDice = document.querySelectorAll(".die");
const scoreInputs = document.querySelectorAll("#score-options input");
const scoreSpans = document.querySelectorAll("#score-options span");
const roundElement = document.querySelector("#current-round");
const rollsElement = document.querySelector("#current-round-rolls");
const totalScoreElement = document.querySelector("#total-score");
const scoreHistory = document.querySelector("#score-history");
const rollDiceBtn = document.querySelector("#roll-dice-btn");
const keepScoreBtn = document.querySelector("#keep-score-btn");
const rulesBtn = document.querySelector("#rules-btn");
const rulesContainer = document.querySelector(".rules-container");
let isModalShowing = false;
let diceValuesArr = [];
let rolls = 0;
let score = 0;
let round = 1;

const rollDice = () => {
  diceValuesArr = [];

  for (let i = 0; i < 5; i++) {
    const randomDice = Math.floor(Math.random() * 6) + 1;
    diceValuesArr.push(randomDice);
  }

  listOfAllDice.forEach((dice, index) => {
    dice.textContent = diceValuesArr[index];
  });
};

// The logic for your button click is:
// 1 . roll the dice
// 2a. if the number of rolls is equal to three, display an alert
// 2b. otherwise(else) increment(++) the number of rolls.
// users are allowed to roll the dice a maximum of three(===3) times

// If a user clicks the rollDiceBtn but has already made three rolls
// alert() to indicate they must select a score -
// otherwise, it should roll the dice as it currently does(rollDice())
// and increment the rolls variable(rolls++)

const updateStats = () => {
  rollsElement.innerHTML = rolls;
  roundElement.innerHTML = round;
};

const rollDiceClicked = rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("Please select a score!");
    return;
  } else {
    rolls++;
    rollsElement.textContent = rolls;
    console.log(rolls);
    rollDice();
    updateStats();
  }
});

// Step 5
// You'll need to be able to update your rolls
//  and your round on the page.
//  Create an updateStats function
//  to update the text of those two elements
//  with the appropriate values.
//  Then, call that function
//  when your rollDiceBtn is clicked
//  and the dice are rolled.

rulesBtn.addEventListener("click", () => {
  isModalShowing = !isModalShowing;
  rulesBtn.textContent = isModalShowing ? "Hide rules" : "Show rules";
  rulesContainer.style.display = isModalShowing ? "block" : "none";
});
