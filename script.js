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
var playerOne = Player("Bob","X");
var playerTwo = Player("Tom","O");

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
            computerMove()
          }
        }
      }
    });
  });
  
  
  //Choose random available spot
function computerMove(){
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
    document.querySelector(".gameover > div").textContent = `${activePlayer.name} Wins!`;
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".main").style.filter = "Blur(5px)";
    return activePlayer == playerOne ? 1 : -1;
  }else if(checkBoardFilled()){
    document.querySelector(".gameover > div").textContent = "TIE!";
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".main").style.filter = "Blur(5px)";

    return 0;
  }
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
  
    return (totalDiagSignsLeft == 3 || totalDiagSignsRight == 3)
  };

  function checkBoardFilled(){
    let totalCellsFilled = (Array.from(gameBoard.grid)).reduce((total,cell) => {
      return total += (cell.textContent != "");
    },0)
    return (totalCellsFilled == 9); 
  }

};

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
      playerTwo = Player(document.querySelector("#playerTwoName").textContent, 
      document.querySelector("#playerTwoSign").textContent);
    }else{
      playerTwo.isComputer = true;
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




// function minmax(){
//   //If it is a terminal state
//   if(checkWinner() != undefined){
//     return checkWinner();
//   }

//   //Maximising Player
//   if(activePlayer == playerOne){
//     maxValue = -Infinity;
//     for(cell of gameBoard){
//       maxValue = Math.max(maxValue,minmax())
//     }
//     return maxValue;
//   }

//   if(activePlayer == computer){
//     minValue = Infinity;
//     for(cell of gameBoard){
//       minValue = Math.min(minValue, minmax())
//     }
//     return minValue;
//   }
// }

