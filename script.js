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

const Player = (name, sign) => {
  return {name, sign};
}
const playerOne = Player("Bob","X");
const playerTwo = Player("Tom","O");

const gameFlow = ((playerOne, playerTwo) => {
  //Player one starts the game
  let activePlayer = playerOne;
  let inactivePlayer = playerTwo;
  let hoverEffect = false;

  const highlight = (() => {
    gameBoard.grid.forEach(cell => {
      cell.addEventListener("mouseenter", () => {
        if(cell.textContent == ""){
          cell.textContent = activePlayer.sign;
          cell.style.color = "rgb(245, 245, 245,0.7)"
          hoverEffect = true;
        }
      })

      cell.addEventListener("mouseleave", () => {
        if(hoverEffect == true){
          cell.textContent = "";
          hoverEffect = false;
        }
      })
    })

  })();

  gameBoard.grid.forEach(cell => {
    cell.addEventListener("click", () => {
      if(hoverEffect){
        cell.style.color = "rgb(245, 245, 245,1)"
        hoverEffect = false;
        checkWinner(activePlayer);

        let temp = activePlayer;
        activePlayer = inactivePlayer;
        inactivePlayer = temp;

      }
    });
  });

  const reset = () => {
    activePlayer = playerOne;
    inactivePlayer = playerTwo;
    hoverEffect = false;
  }

  return {reset}
})(playerOne,playerTwo);

function checkWinner(activePlayer){
  if(checkRow(activePlayer) || checkCol(activePlayer) || checkDiag(activePlayer)){
    document.querySelector(".gameover > div").textContent = `${activePlayer.name} Wins!`;
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".main").style.filter = "Blur(5px)";
  }else if(checkBoardFilled()){
    document.querySelector(".gameover > div").textContent = "TIE!";
    document.querySelector(".gameover").style.display = "flex";
    document.querySelector(".main").style.filter = "Blur(5px)";
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
    applyStyle(playerOne,playerTwo);
  })

  document.querySelector(".settings-btn > button:last-child").addEventListener("click",() => {
    document.querySelector(".settings-wrapper").style.display = "none";
    document.querySelector(".main").style.filter = "none";
    clearSettings();
  })

  function applyStyle(playerOne,playerTwo){
    let oldSignOne = playerOne.sign;
    let oldSignTwo = playerTwo.sign;
  
    playerOne.name = document.querySelector("#playerOneName").value;
    playerOne.sign = document.querySelector("#playerOneSign").value;
  
    playerTwo.name = document.querySelector("#playerTwoName").value;
    playerTwo.sign = document.querySelector("#playerTwoSign").value;
  
    gameBoard.grid.forEach(cell => {
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
})();

const playerTwoInput = (() => {
  const disable = () => {
    document.querySelector("#playerTwoName").disabled = true;
    document.querySelector("#playerTwoSign").disabled = true;
  }

  const enable = () => {
    document.querySelector("#playerTwoName").disabled = false;
    document.querySelector("#playerTwoSign").disabled = false;
  }

  return {enable,disable}
})()

document.querySelector(".gameover > div:last-child").addEventListener("click",reset);
document.querySelector(".header > div").addEventListener("click",reset);

function reset(){
  gameBoard.clear();
  document.querySelector(".gameover").style.display = "none";
  document.querySelector(".main").style.filter = "none";
  gameFlow.reset();
}