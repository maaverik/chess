import $ from "jquery";
import { game } from "./chessBoardUtils";
import { chessBoardObj } from "./Chessboard";

const board = $("#myBoard");
const undo_stack = [];

function undo() {
  var move = game.undo();
  undo_stack.push(move);

  // Maintain a maximum stack size
  if (undo_stack.length > 20) {
    undo_stack.shift();
  }
  chessBoardObj.position(game.fen());
}

export const undoInit = () => {
  if (game.history().length >= 2) {
    // Undo twice: Opponent's latest move, followed by player's latest move
    undo();
    window.setTimeout(function () {
      undo();
    }, 250);
  } else {
    alert("Nothing to undo.");
  }
};

export const resetGame = () => {
  game.reset();
  chessBoardObj.position(game.fen());
};
