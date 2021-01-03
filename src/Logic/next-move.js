import { minimaxInit } from "./minimax";
import { chessBoardObj } from "../ChessBoard";
import $ from "jquery";

export const makeBestMove = (game) => {
  const bestMove = getBestMove(game);
  game.move(bestMove);
  chessBoardObj.position(game.fen());
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
  const depth = 3; // parseInt($("#search-depth").find(":selected").text());

  const d1 = new Date().getTime();
  const bestMove = minimaxInit(game, depth, true);
  const d2 = new Date().getTime();
  const moveTime = d2 - d1;
  const positionsPerS = (positionCount * 1000) / moveTime;
  console.log(`This move took ${moveTime / 1000}s`);

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
