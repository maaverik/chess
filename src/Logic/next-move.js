import { minimaxInit } from "./minimax";
import { chessBoard } from "../ChessBoard";
import $ from "jquery";

export const makeBestMove = (game) => {
  const bestMove = getBestMove(game);
  game.move(bestMove);
  chessBoard.position(game.fen());
  //   renderMoveHistory(game.history());
  if (game.game_over()) {
    alert("Game over");
  }
};

let positionCount;
const getBestMove = (game) => {
  if (game.game_over()) {
    alert("Game over");
  }

  positionCount = 0;
  const depth = 2; // parseInt($("#search-depth").find(":selected").text());

  const d = new Date().getTime();
  const bestMove = minimaxInit(game, depth, true);
  const d2 = new Date().getTime();
  const moveTime = d2 - d;
  const positionsPerS = (positionCount * 1000) / moveTime;

  //   $("#position-count").text(positionCount);
  //   $("#time").text(moveTime / 1000 + "s");
  //   $("#positions-per-s").text(positionsPerS);
  return bestMove;
};

// const renderMoveHistory = (moves) => {
//   const historyElement = $("#move-history").empty();
//   historyElement.empty();
//   for (const i = 0; i < moves.length; i = i + 2) {
//     historyElement.append(
//       "<span>" +
//         moves[i] +
//         " " +
//         (moves[i + 1] ? moves[i + 1] : " ") +
//         "</span><br>"
//     );
//   }
//   historyElement.scrollTop(historyElement[0].scrollHeight);
// };
