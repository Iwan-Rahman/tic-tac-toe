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
        
        checkRow(activePlayer);

        let temp = activePlayer;
        activePlayer = inactivePlayer;
        inactivePlayer = temp;

      }
    });
  });
}

function checkWinner(activePlayer){};

function checkRow(activePlayer){
  for(row of document.querySelectorAll("tr")){
    let totalRowSigns = Array.from(row.querySelectorAll("td")).reduce((total, cell) => {
      return total += (cell.textContent == activePlayer.sign); 
    },0)
    
    if(totalRowSigns == 3){
      return true;
    }
  }

  return false;
};

function checkColoumn(activePlayer){};
// function checkDiagonal(){};

