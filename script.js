"use strict";

/**
 * Rock Paper Scissors: a console-based game played against the computer.
 * Open the browser console to see the output; input is collected via prompt().
 */

const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const TOTAL_ROUNDS = 5;

/**
 * Randomly returns "rock", "paper" or "scissors" for the computer.
 * Math.random() yields a number in [0, 1), which is split into three equal ranges.
 * @returns {string}
 */
function getComputerChoice() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return ROCK;
  }
  if (randomNumber < 2 / 3) {
    return PAPER;
  }
  return SCISSORS;
}

/**
 * Prompts the human player for a choice and returns it normalised
 * (trimmed, lowercase). Re-prompts on invalid input.
 * Returns null if the player cancels the prompt.
 * @returns {string|null}
 */
function getHumanChoice() {
  const validChoices = [ROCK, PAPER, SCISSORS];

  while (true) {
    const input = prompt("Enter your choice: rock, paper or scissors");

    if (input === null) {
      return null; // Player pressed Cancel
    }

    const choice = input.trim().toLowerCase();
    if (validChoices.includes(choice)) {
      return choice;
    }

    console.warn(`"${input}" is not a valid choice. Please try again.`);
  }
}

/**
 * Capitalises the first letter of a word for display purposes.
 * @param {string} word
 * @returns {string}
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Determines the winner of a single round.
 * @param {string} humanChoice - Case-insensitive choice of the human.
 * @param {string} computerChoice - Choice of the computer.
 * @returns {"human"|"computer"|"tie"}
 */
function getRoundWinner(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "tie";
  }

  const humanWins =
    (humanChoice === ROCK && computerChoice === SCISSORS) ||
    (humanChoice === PAPER && computerChoice === ROCK) ||
    (humanChoice === SCISSORS && computerChoice === PAPER);

  return humanWins ? "human" : "computer";
}

/**
 * Plays a full game of TOTAL_ROUNDS rounds, tracks scores and announces the winner.
 */
function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  /**
   * Plays a single round, logs the result and updates the scores.
   * @param {string} humanChoice - Case-insensitive.
   * @param {string} computerChoice
   */
  function playRound(humanChoice, computerChoice) {
    const human = humanChoice.toLowerCase();
    const computer = computerChoice.toLowerCase();
    const winner = getRoundWinner(human, computer);

    if (winner === "tie") {
      console.log(`It's a tie! You both chose ${capitalize(human)}.`);
    } else if (winner === "human") {
      humanScore++;
      console.log(`You win! ${capitalize(human)} beats ${capitalize(computer)}.`);
    } else {
      computerScore++;
      console.log(`You lose! ${capitalize(computer)} beats ${capitalize(human)}.`);
    }
  }

  console.log(`Welcome to Rock Paper Scissors! First, let's play ${TOTAL_ROUNDS} rounds.`);

  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    console.log(`--- Round ${round} of ${TOTAL_ROUNDS} ---`);

    // Fresh choices are fetched every round.
    const humanSelection = getHumanChoice();
    if (humanSelection === null) {
      console.log("Game cancelled. Refresh the page to play again.");
      return;
    }
    const computerSelection = getComputerChoice();

    playRound(humanSelection, computerSelection);
    console.log(`Score: You ${humanScore} - ${computerScore} Computer`);
  }

  console.log("=== Final Result ===");
  console.log(`Final score: You ${humanScore} - ${computerScore} Computer`);

  if (humanScore > computerScore) {
    console.log("Congratulations, you won the game!");
  } else if (humanScore < computerScore) {
    console.log("The computer won the game. Better luck next time!");
  } else {
    console.log("The game ended in a tie!");
  }
}

// Start the game from a button so the page renders before the first prompt appears.
const startButton = document.getElementById("start-btn");
if (startButton) {
  startButton.addEventListener("click", playGame);
}
