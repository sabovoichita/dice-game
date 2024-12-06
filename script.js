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

// Step 9
// When you roll the dice and make a selection,
// you are not able to keep the score you selected
// and move onto the next round.
// Create an updateScore function to add this functionality.
// Your function will need two parameters for the user selected score option
// The first parameter will be passed the value of the radio button,
// remember this is a string===parseInt(value)
// and the second parameter will be passed the id value of the radio button,
// which is the type of score they achieved.
// The function will need to add the user selected value to the score,
// update the total score text on the page,
// and add a new li element to the score history ul element,
// using the format ${achieved} : ${selectedValue} for
// the li element content.

const updateScore = (value, id) => {
  //   console.log(value);
  //   console.log(id);
  //   console.log(parseInt(value));
  const scoreVal = parseInt(value);
  score += scoreVal;
  totalScoreElement.innerText = score;
  scoreHistory.innerHTML += `<li>${id} : ${value}</li>`;
};
// console.log(updateScore(10, "hi"));

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

// Step 13
// If the user rolls three of one number,
// and two of another number, this is called a full house.
//  Declare a detectFullHouse function that accepts a single argument.
//   The function will be passed the diceValuesArr array when called.
// Your detectFullHouse function should check
// if the user has rolled three of one number and two of another number.
//  If so, it should update the third radio button to display a score of 25,
//   with the correct attributes.
// Regardless,
// it should always update the last radio button to display a score of 0,
//  with the correct attributes.
// Don't forget to call your new function when the dice are rolled.

const detectFullHouse = (arr) => {
  const counts = {};
  // Count occurrences of each number
  arr.forEach((number) => {
    counts[number] = (counts[number] || 0) + 1;
  });
  //   console.log(arr);
  const maxCount = Math.max(...Object.values(counts));
  const minCount = Math.min(...Object.values(counts));
  //   console.log(maxCount === 3);
  //   console.log(minCount === 2);
  if (minCount === 2 && maxCount === 3) {
    // score = 25;
    updateRadioOption(2, 25);
  } else {
    updateRadioOption(5, 0);
  }
};

// Step 8
// Before each dice roll,
//  you will need to reset the values for the score inputs and spans
//  so a new value can be displayed.
// Create a resetRadioOptions function.
// Your function should iterate through the scoreInputs
// to disable them and remove the checked attribute.
// Your function should also remove the text from each of the scoreSpans.
// Finally, call this function before you roll the dice.

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach((span) => {
    span.textContent = "";
  });
};

// 12.
// If you go through six rounds of the game,
// you should see the alert show up with your final score.
// But when you dismiss the alert,
// you are able to keep playing for more rounds past the original six.
//  To fix this, you will need to reset the game.
// Declare a resetGame function to do so.
// Reset all of the listOfAllDice elements to display 0,
//  update score and rolls to be 0,
// update round to be 1,
// set the totalScoreElement text to the user's total score,
//  clear the score history by setting it to an empty string,
//  set the rollsElement text to the number of rolls,
//  and set the roundElement text to the current round.
//  Finally, reset all of the radio buttons to their initial states.
// Call this function after displaying the alert with the final score.
const resetGame = () => {
  listOfAllDice.forEach((list) => (list.innerText = 0));
  round = 1;
  rolls = 0;
  score = 0;
  totalScoreElement.innerText = score;
  scoreHistory.innerHTML = "";
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
  resetRadioOptions();
};

rollDiceBtn.addEventListener("click", () => {
  if (rolls === 3) {
    alert("Please select a score!");
    return;
  } else {
    rolls++;
    // rollsElement.textContent = rolls;
    // console.log(rolls);
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
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

// Step 10
// After a user makes a selection,
//  they should be able to keep that score and move onto the next round
//  by clicking the keepScoreBtn.
//
// When that button is clicked,
// you should find which radio option is checked
//  and capture its value
//  and id attributes.
//   If the user has selected an option,
//   call your functions to update the score,
//   reset the radio options,
//   and add the value
//   and id to the score history.

// If the user has not selected an option,
// display an alert informing them to do so.

// keepScoreBtn.addEventListener("click", () => {
//   // Clear the score history for this round
//   scoreHistory.innerHTML = "";

//   let isOptionSelected = false;

//   // Iterate over radio inputs to check if any is selected
//   scoreInputs.forEach((input) => {
//     if (input.checked) {
//       isOptionSelected = true;

//       // Capture the selected ID and value
//       const selectedId = input.attributes.id.value;
//       const selectedValue = parseInt(input.value, 10); // Convert value to number

//       // Update the total score
//       score += selectedValue;
//       totalScoreElement.innerHTML = `Total Score: ${score}`;

//       // Append to the score history
//       const scoreEntry = document.createElement("div");
//       scoreEntry.textContent = `Round ${round}: Selected Score - ${selectedValue}, Option - ${selectedId}`;
//       scoreHistory.appendChild(scoreEntry);

//       // Reset radio options and move to the next round
//       resetRadioOptions();
//       round++;
//       updateStats(); // Update round and roll stats on the page
//     }
//   });

//   // Alert if no option was selected
//   if (!isOptionSelected) {
//     alert("Please choose an option to keep your score.");
//   }
// });

// version2;
keepScoreBtn.addEventListener("click", () => {
  if (round >= 6) {
    setTimeout(() => {
      alert(`Game Over! Your final score is: ${score}`);
      //   console.log(`Final score: ${score}`);
      resetGame();
    }, 500);
  }
  // Purpose: Adds an event listener to the keepScoreBtn button.
  // Action: When the button is clicked, the callback function is executed.
  for (let i = 0; i < scoreInputs.length; i++) {
    // Purpose: Iterates over all the radio buttons (scoreInputs) to check which one is selected.
    // Key Idea: The for loop cycles through each element in the scoreInputs list.
    if (scoreInputs[i].checked) {
      rolls = 0;
      round++;
      // Purpose: Checks if the current radio button (scoreInputs[i]) is selected (checked is true).
      // Key Idea: Only one radio button can be selected at a time because they are grouped by the same name.
      updateStats();
      resetRadioOptions();
      // Purpose: Resets all the radio buttons and related spans to their initial state (disabled and unchecked).
      // Key Idea: Prepares the inputs for the next round after the user makes a selection.

      updateScore(scoreInputs[i].value, scoreInputs[i].id);
      // Purpose: If a radio button is selected:
      // Its value (representing the score) and id (describing the scoring category) are passed to the updateScore function.
      // updateScore likely:
      // Adds the score to the total.
      // Updates the score display.
      // Logs the action in a history or summary.
      // Key Idea: Processes the user’s selected score.

      break;
      // Purpose: Ends the loop after finding a checked radio button.
      // Key Idea: Prevents unnecessary iterations once the selection is found.
    } else if (i === scoreInputs.length - 1) {
      alert("Please select an option");
    }
  }
});
// Purpose:
// else if ensures this block is executed only when no radio button is selected.
// i === scoreInputs.length - 1:
// This checks if the loop has reached the last radio button.
// If none were selected by this point, the user is alerted.
// Key Idea: Ensures the user makes a selection before proceeding.
