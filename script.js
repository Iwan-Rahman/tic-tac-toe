const gridCell = () => {
  //Cell value should be empty, "x" or "o"
  let value = "";
  return {value}
}

const gameBoard = (() => {
  grid = [gridCell(),gridCell(),gridCell(),gridCell(),gridCell(),gridCell(),gridCell(),gridCell(),gridCell()];
  return grid;
})();

const Player = (name, sign) => {
  return {name, sign};
}