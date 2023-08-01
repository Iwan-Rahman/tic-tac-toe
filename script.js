const gameBoard = (() => {
  grid = document.querySelectorAll("td");

  let clear = () => {
    grid.forEach(cell => {
      cell.textContent = "";
    })

    document.querySelector(".gameover > div").textContent = "";
  }
  return {grid,clear};
})();

const Player = (name, sign, isComputer = false) => {
  return {name, sign, isComputer};
}
var playerOne = Player("Player 1","X");
var playerTwo = Player("Player 2","O");

const gameFlow = ((playerOne, playerTwo) => {
  //Player one starts the game
  let activePlayer = playerOne;
  let inactivePlayer = playerTwo;
  let hoverEffect = false;

  const highlight = (() => {
    gameBoard.grid.forEach(cell => {
      cell.addEventListener("mouseenter", () => {
        if (cell.textContent == "") {
          cell.textContent = activePlayer.sign;
          cell.style.color = "rgb(245, 245, 245,0.7)"
          hoverEffect = true;
        }
      })

      cell.addEventListener("mouseleave", () => {
        if (hoverEffect == true) {
          cell.textContent = "";
          hoverEffect = false;
        }
      })
    })

  })();

  gameBoard.grid.forEach(cell => {
    cell.addEventListener("click", () => {
      if (hoverEffect) {
        cell.style.color = "rgb(245, 245, 245,1)"
        hoverEffect = false;

        
        if(checkWinner(activePlayer) == undefined){
          let temp = activePlayer;
          activePlayer = inactivePlayer;
          inactivePlayer = temp;
  
          if(activePlayer.isComputer == true){
            bestComputerMove()
            let temp = activePlayer;
            activePlayer = inactivePlayer;
            inactivePlayer = temp;
            checkGameOver(inactivePlayer);
          }
        }else{
          checkGameOver(activePlayer);
        }

        
      }
    });
  });
  
  
  //Choose random available spot (Pick a random move.)
/*function computerMove(){
  let move = Math.floor(Math.random()*gameBoard.grid.length);

  if(gameBoard.grid[move].textContent == ""){
    gameBoard.grid[move].textContent = activePlayer.sign;
    checkWinner(activePlayer);
    let temp = activePlayer;
    activePlayer = inactivePlayer;
    inactivePlayer = temp;
  }else{
    computerMove();
  }
}*/

function bestComputerMove(){
  let bestScore = -Infinity;
  let bestMove;
  let maximizingPlayer = activePlayer;
  let minimizingPlayer = inactivePlayer;

  for(let cell of gameBoard.grid){
    if(cell.textContent == ""){
      cell.textContent = maximizingPlayer.sign;
      let score = minimax(gameBoard.grid,0,false);
      cell.textContent = "";
      if(score > bestScore){
        bestScore = score;
        bestMove = cell;
      }
    }
  }

  bestMove.textContent = activePlayer.sign;

  function minimax(board,depth,isMaximizing){
    let score;
    if(isMaximizing){
      //True -> Game is won
      //False -> Game is lost
      //Undefined -> Game is incomplete
      let result = checkWinner(minimizingPlayer);
      if(result != undefined) result ? score = -1 : score = 0;
    }else{
      let result = checkWinner(maximizingPlayer);
      if(result != undefined) reset ? score = 1 : score = 0;
    }
    
    //check for terminal state
    if(score != undefined){
      return score;
    }
    
    if(isMaximizing){
      let bestScore = -Infinity;
      for(let cell of gameBoard.grid){
        if(cell.textContent == ""){
          cell.textContent = activePlayer.sign;
          let score = minimax(board,depth + 1, false);
          cell.textContent = "";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    }else{
      let bestScore = Infinity;
      for(let cell of gameBoard.grid){
        if(cell.textContent == ""){
          cell.textContent = inactivePlayer.sign;
          let score = minimax(board,depth + 1, true);
          cell.textContent = "";
          bestScore = Math.min(score,bestScore);
        }
      }
      return bestScore;
    }
  }
  
}


  //Creats a gameflow object with the reset function 
  //to help reset the grid, and active/inactive players.
  const reset = () => {
    activePlayer = this.playerOne;
    inactivePlayer = this.playerTwo;
    hoverEffect = false;
  }

  return {reset}
})(playerOne,playerTwo);

function checkWinner(activePlayer){
  if(checkRow(activePlayer) || checkCol(activePlayer) || checkDiag(activePlayer)){
    return true;
  }else if(checkBoardFilled()){
    return false;
  }
  function checkRow(activePlayer){
    for(let row of document.querySelectorAll("tr")){
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
  
    return (totalDiagSignsLeft == 3 || totalDiagSignsRight == 3)
  };

  function checkBoardFilled(){
    let totalCellsFilled = (Array.from(gameBoard.grid)).reduce((total,cell) => {
      return total += (cell.textContent != "");
    },0)
    return (totalCellsFilled == 9); 
  }

};

function checkGameOver(player){
  if(checkWinner(player) == true){
    document.querySelector(".gameover > div").textContent = `${player.name} Wins!`;
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".main").style.filter = "Blur(5px)";
  }else if(checkWinner(player) == false){
    document.querySelector(".gameover > div").textContent = "TIE!";
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".main").style.filter = "Blur(5px)";
  }
}

const settings = (() => {
  document.querySelector("img").addEventListener("click",() => {
    document.querySelector(".settings-wrapper").style.display = "flex";
    document.querySelector(".main").style.filter = "Blur(5px)";
  })

  document.querySelector(".settings-btn > button").addEventListener("click",() => {
    applyStyle();
  })

  document.querySelector(".settings-btn > button:last-child").addEventListener("click",() => {
    if(playerTwo.isComputer == false){
      playerTwoInput.enable();
      document.querySelector("input[name='opponent']").checked = true;
    }else{
      playerTwoInput.disable();
      document.querySelector("input[name='opponent']:last-of-type").checked = true;
    }
    document.querySelector(".settings-wrapper").style.display = "none";
    document.querySelector(".main").style.filter = "none";
  })

  function applyStyle(){
    let oldSignOne = playerOne.sign;
    let oldSignTwo = playerTwo.sign;
    playerOne.name = document.querySelector("#playerOneName").value;
    playerOne.sign = document.querySelector("#playerOneSign").value;

    if(document.querySelector("input[name='opponent'").checked == true){
      playerTwo.name = document.querySelector("#playerTwoName").value;
      playerTwo.sign = document.querySelector("#playerTwoSign").value;
      playerTwo.isComputer = false;
    }else{
      playerTwo.name = "Computer";
      playerTwo.sign = "O";
      playerTwo.isComputer = true;
    }

    if(playerOne.name == playerTwo.name || playerOne.sign == playerTwo.sign || 
      playerOne.sign == "" || playerTwo.sign == ""){
      alert("ERROR: You are a cheater!");
      playerOne.name = "Player 1";
      playerOne.sign = "X";
      if(playerTwo.isComputer == true){
        playerTwo.name = "Computer";
        playerTwo.sign = "O";
        playerTwo.isComputer = true;
      }else{
        playerTwo.name = "Player 2";
        playerTwo.sign = "O";
      }
    }

    gameBoard.grid.forEach(cell => {
      if(cell.textContent == oldSignOne){
        cell.textContent = playerOne.sign;
      }else if(cell.textContent == oldSignTwo){
        cell.textContent = playerTwo.sign;
      }
    })
  }
  
  const playerTwoInput = (() => {

    const disable = () => {
      document.querySelector("#playerTwoName").disabled = true;
      document.querySelector("#playerTwoSign").disabled = true;
    }
  
    const enable = () => {
      document.querySelector("#playerTwoName").disabled = false;
      document.querySelector("#playerTwoSign").disabled = false;
    }
  
    document.querySelector("input[name='opponent']").addEventListener("click",enable);
    document.querySelector("input[name='opponent']:last-of-type").addEventListener("click",disable);

    return {enable,disable}
  })();

  
})();

document.querySelector(".gameover > div:last-child").addEventListener("click",reset);
document.querySelector(".header img:last-child").addEventListener("click",reset);

function reset(){
  gameBoard.clear();
  document.querySelector(".gameover").style.display = "none";
  document.querySelector(".main").style.filter = "none";
  gameFlow.reset();
}

