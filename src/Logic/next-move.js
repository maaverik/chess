import { minimaxInit } from "./minimax";
import { chessBoardObj } from "../App";
import $ from "jquery";

export const makeBestMove = (game) => {
  const bestMove = getBestMove(game);
  game.ugly_move(bestMove);
  chessBoardObj.position(game.fen());
  if (game.game_over()) {
    alert("Game over");
  }
};

const getBestMove = (game) => {
  if (game.game_over()) {
    alert("Game over");
  }

  const depth = 3;

  const d1 = new Date().getTime();
  const bestMove = minimaxInit(game, depth, true);
  const d2 = new Date().getTime();
  const moveTime = d2 - d1;
  console.log(`This move took ${moveTime / 1000}s`);

  return bestMove;
};
