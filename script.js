function getComputerChoice() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getHumanChoice() {
  const choice = prompt("Enter rock, paper, or scissors:");

  return choice.toLowerCase();
}

function getRoundResult(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "tie";
  }

  if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    return "human";
  }

  return "computer";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function playRound(humanChoice, computerChoice) {
  const result = getRoundResult(humanChoice, computerChoice);

  if (result === "tie") {
    console.log(`It's a tie! You both chose ${humanChoice}.`);
    return "tie";
  }

  if (result === "human") {
    console.log(`You win! ${capitalize(humanChoice)} beats ${computerChoice}.`);
    return "human";
  }

  console.log(`You lose! ${capitalize(computerChoice)} beats ${humanChoice}.`);
  return "computer";
}

function playGame() {
  let humanScore = 0;
  let computerScore = 0;

  console.log("Welcome to Rock Paper Scissors!");
  console.log("Best of 5 rounds. Let's begin.\n");

  for (let round = 1; round <= 5; round++) {
    const humanChoice = getHumanChoice();
    const computerChoice = getComputerChoice();

    console.log(`Round ${round}`);
    console.log(`You chose: ${humanChoice}`);
    console.log(`Computer chose: ${computerChoice}`);

    const winner = playRound(humanChoice, computerChoice);

    if (winner === "human") {
      humanScore++;
    } else if (winner === "computer") {
      computerScore++;
    }

    console.log(`Score — You: ${humanScore} | Computer: ${computerScore}\n`);
  }

  console.log("Game over!");

  if (humanScore > computerScore) {
    console.log(`You win the game ${humanScore} to ${computerScore}!`);
  } else if (computerScore > humanScore) {
    console.log(`You lose the game ${humanScore} to ${computerScore}.`);
  } else {
    console.log(`The game ends in a tie, ${humanScore} to ${computerScore}.`);
  }
}

playGame();
