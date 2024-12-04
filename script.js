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

const updateRadioOption = (index, score) => {
  if (scoreInputs[index]) {
    // Enable the input
    scoreInputs[index].disabled = false;
    // Set the value of the input
    scoreInputs[index].value = score;
    // Update the corresponding score span
    scoreSpans[index].textContent = `, score = ${score}`;
  } else {
    console.error(`Invalid index: ${index}`);
  }
};

// Step 6
// Each time you roll the dice,
//  you could end up with
// a Three of a kind
// , Four of a kind,
// Full house,
// Straight
// or a random combination of numbers.
//  Based on the outcome,
//  you can make a selection and add points to your score.

// Start by creating a function called updateRadioOption
//  that takes an index and a score value as arguments.
//  It should set the scoreInputs at that index to be enabled,
// set the value of that input to the score,
//  and display , score = ${score} in the correct scoreSpans element.

// Step 7
// If you roll the dice(roll) and (&&)
// get a Three of a kind (||) Four of a kind,
//  then you can get a score totalling the sum of all five dice values
// totalScore = diceValuesArr sum
// . To calculate this,
//  create a getHighestDuplicates function
//  which takes an array of numbers.
//   The function will need to count
//   how many times each number is found in the array.
// count var
// If a number appears four or more times,
// if (count > 4 and count >5)
// you will need to update the Four of a Kind option
// scoreInputs[index] = "three-of-a-kind";
// with your updateRadioOption function.
//  If a number appears three or more times,
//  else of (count >=3)
//  you will need to update the Three of a Kind option.
//   In both cases,
//    the score value should be the sum of all five dice.
// score.value1+val2+...
// Regardless of the outcome,
// the final option should be updated with a score of 0.
// Make sure to call your getHighestDuplicates
//  when the dice are rolled.

const getHighestDuplicates = (diceValuesArr) => {
  const counts = {};
  let totalScore = diceValuesArr.reduce((sum, val) => sum + val, 0);
  // Count occurrences of each number
  diceValuesArr.forEach((number) => {
    counts[number] = (counts[number] || 0) + 1;
  });
  // Find the highest duplicate count
  const maxCount = Math.max(...Object.values(counts));
  if (maxCount >= 4) {
    // Update Four of a Kind option (index 1 for "four-of-a-kind")
    updateRadioOption(1, totalScore);
    // Also update Three of a Kind option (index 0 for "three-of-a-kind")
    updateRadioOption(0, totalScore);
  } else if (maxCount >= 3) {
    // Update Three of a Kind option (index 0 for "three-of-a-kind")
    updateRadioOption(0, totalScore);
  } else {
    // Update "None of the above" option (index 5 for "none")
    updateRadioOption(5, 0);
  }
};

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("Please select a score!");
    return;
  } else {
    rolls++;
    // rollsElement.textContent = rolls;
    // console.log(rolls);
    rollDice();
    getHighestDuplicates(diceValuesArr);
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
