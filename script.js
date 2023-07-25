const gameBoard = (() => {
  grid = document.querySelectorAll("td");
  return grid;
})();

const Player = (name, sign) => {
  return {name, sign};
}
const bob = Player("Bob","X");
const tom = Player("Tom","O");
const gameFlow = (playerOne, playerTwo) => {
  //Player one starts the game
  let activePlayer = playerOne;
  let inactivePlayer = playerTwo;

  gameBoard.forEach(cell => {
    cell.addEventListener("click", () => {
      if(cell.textContent == ''){
        cell.textContent = activePlayer.sign;
        let temp = activePlayer;
        activePlayer = inactivePlayer;
        inactivePlayer = temp;
      }
    });
  });
}

