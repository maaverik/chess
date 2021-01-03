import Chess from "../lib/chess";
import $ from "jquery";
import { makeBestMove } from "../Logic/next-move";
import { chessBoardObj } from "./Chessboard";

// utilizing a modified version of chess.js from https://github.com/lhartikk/simple-chess-ai/blob/master/lib/js/chess.js
// the original one's move functions were upto 5 times slower
const game = new Chess();

const updateStatus = () => {
  let status = "";

  let moveColor = "White";
  if (game.turn() === "b") {
    moveColor = "Black";
  }

  // checkmate?
  if (game.in_checkmate()) {
    status = "Game over, " + moveColor + " is in checkmate.";
  }

  // draw?
  else if (game.in_draw()) {
    status = "Game over, drawn position";
  }

  // game still on
  else {
    status = moveColor + " to move";

    // check?
    if (game.in_check()) {
      status += ", " + moveColor + " is in check";
    }
  }

  $("#status").html(status);
  $("#fen").html(game.fen());
  $("#pgn").html(game.pgn());
};

export const onDragStart = (source, piece, position, orientation) => {
  // do not pick up pieces if the game is over
  if (game.game_over()) return false;

  if (
    game.in_checkmate() === true ||
    game.in_draw() === true ||
    piece.search(/^b/) !== -1
  ) {
    return false;
  }
};

export const onDrop = (source, target) => {
  // see if the move is legal
  const move = game.move({
    from: source,
    to: target,
    promotion: "q", // always promote to a queen for simplicity
  });

  // illegal move
  if (move === null) return "snapback";
  const board = $("#board1");
  window.setTimeout(makeBestMove, 250, game, board);
  updateStatus();
};

// update the board position after the piece snap
// for castling, en passant, pawn promotion
export const onSnapEnd = () => {
  chessBoardObj.position(game.fen());
};
