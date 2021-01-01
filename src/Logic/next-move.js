import { evaluateBoard } from "./board-evaluation";
import $ from "jquery";

const makeBestMove = () => {
  const bestMove = getBestMove(game);
  game.ugly_move(bestMove);
  board.position(game.fen());
  renderMoveHistory(game.history());
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
  const depth = parseInt($("#search-depth").find(":selected").text());

  const d = new Date().getTime();
  const bestMove = minimaxRoot(depth, game, true);
  const d2 = new Date().getTime();
  const moveTime = d2 - d;
  const positionsPerS = (positionCount * 1000) / moveTime;

  //   $("#position-count").text(positionCount);
  //   $("#time").text(moveTime / 1000 + "s");
  //   $("#positions-per-s").text(positionsPerS);
  return bestMove;
};
