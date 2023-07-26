const gameBoard = (() => {
  grid = document.querySelectorAll("td");
  return grid;
})();

const Player = (name, sign) => {
  return {name, sign};
}
const playerOne = Player("Bob","X");
const playerTwo = Player("Tom","O");

const gameFlow = ((playerOne, playerTwo) => {
  console.log(this);
  //Player one starts the game
  let activePlayer = playerOne;
  let inactivePlayer = playerTwo;

  gameBoard.forEach(cell => {
    cell.addEventListener("click", () => {
      if(cell.textContent == ''){
        cell.textContent = activePlayer.sign;
        
        checkWinner(activePlayer);

        let temp = activePlayer;
        activePlayer = inactivePlayer;
        inactivePlayer = temp;

      }
    });
  });
})(playerOne,playerTwo);

function checkWinner(activePlayer){
  if(checkRow(activePlayer) || checkCol(activePlayer) || checkDiag(activePlayer)){
    console.log("YOU ARE A WINNER!");
  }
};

function checkRow(activePlayer){
  for(row of document.querySelectorAll("tr")){
    let totalRowSigns = Array.from(row.querySelectorAll("td")).reduce((total, cell) => {
      return total += (cell.textContent == activePlayer.sign); 
    },0)
    
    if(totalRowSigns == 3){
      // return true;
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

const settings = (() => {
  document.querySelector("img").addEventListener("click",() => {
    document.querySelector(".settings").style.display = "flex";
  })

  document.querySelector(".settings-btn > button").addEventListener("click",() => {
    applyStyle(playerOne,playerTwo);
  })

  document.querySelector(".settings-btn > button:last-child").addEventListener("click",() => {
    document.querySelector(".settings").style.display = "none";
    clearSettings();
  })
})();

function applyStyle(playerOne,playerTwo){
  console.log(playerOne);
  console.log(playerTwo);
  let oldSignOne = playerOne.sign;
  let oldSignTwo = playerTwo.sign;

  playerOne.name = document.querySelector("#playerOneName").value;
  playerOne.sign = document.querySelector("#playerOneSign").value;

  playerTwo.name = document.querySelector("#playerTwoName").value;
  playerTwo.sign = document.querySelector("#playerTwoSign").value;

  gameBoard.forEach(cell => {
    if(cell.textContent == oldSignOne){
      cell.textContent = playerOne.sign;
    }else if(cell.textContent == oldSignTwo){
      cell.textContent = playerTwo.sign;
    }
  })
}

function clearSettings(){
  document.querySelectorAll(".settings input").forEach(inp => inp.value = "");
}

function disablePlayerTwo(){
  document.querySelector("#playerTwoName").disabled = true;
  document.querySelector("#playerTwoSign").disabled = true;
}

function enablePlayerTwo(){
  document.querySelector("#playerTwoName").disabled = false;
  document.querySelector("#playerTwoSign").disabled = false;
}
