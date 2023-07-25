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
        
        checkDiag(activePlayer);

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

function checkCol(activePlayer){
  for(let col = 1; col < 4; col++){
    let totalColSigns = Array.from(document.querySelectorAll(`tr > td:nth-child(${col})`)).reduce((total, cell) => {
      return total += (cell.textContent == activePlayer.sign); 
    },0)
    
    if(totalColSigns == 3){
      return true;
    }
  }

  return false;
};

function checkDiag(activePlayer){
  //Going from top left to bottom right
  let totalDiagSignsLeft = 0;

  for(let row = 1, col = 1; row < 4; row++, col++){
    totalDiagSignsLeft += (document.querySelector(`tr:nth-child(${row}) > td:nth-child(${col})`).textContent == activePlayer.sign);
  }

  //Going from top right to bottom left
  let totalDiagSignsRight = 0;
  
  for(let row = 1, col = 3; row < 4; row++, col--){
    totalDiagSignsRight += (document.querySelector(`tr:nth-child(${row}) > td:nth-child(${col})`).textContent == activePlayer.sign);
  }

  if(totalDiagSignsLeft == 3 || totalDiagSignsRight == 3){
    return true;
  }else{
    return false;
  }
};
