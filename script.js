const gameBoard = (() => {
  grid = document.querySelectorAll("td");
  return grid;
})();

const Player = (name, sign) => {
  return {name, sign};
}

const gameFlow = (playerOne, playerTwo) => {
  //Player one starts the game
  let activePlayer = playerOne;

  gameBoard.forEach(cell => {
    cell.addEventListener("click", () => {
      cell.textContent = activePlayer.sign;
      activePlayer = playerTwo;
    });
  });
}

