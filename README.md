# tic-tac-toe
Tic-Tac-Toe app that utilizes modules and factory functions. 
The computer behavior is determined from a minimax algorithim.

The app uses a "gameflow" module that instantiates event listeners for each grid cell, and switches between the players when a grid cell is clicked. This core functionality is combined with local supporting functions that has stylistic effects, 
such as showing highlighted moves when hovering over the grid, and also supporting functions for the computer turn, and the minimax algorithim.

The app also has a settings module that neatly contains all the DOM logic for, buttons that open and close the settings panel, change names/signs and resets the game. 

The app has another checkWinner function with local checkRow, checkCol and checkDiag
functions. 

By heavily nesting functions and using modules, the global namespace avoids being polluted.

