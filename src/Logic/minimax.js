import { evaluateBoard } from "./board-evaluation";

// minimax algorithm with alpha-beta pruning for getting best move

export const minimaxInit = (game, depth, isMaximisingPlayer) => {
  let bestScore = Number.NEGATIVE_INFINITY,
    finalMove;
  const possibleMoves = game.moves();

  for (const move of possibleMoves) {
    game.move(move);
    const score = minimax(
      game,
      depth - 1,
      !isMaximisingPlayer,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY
    );
    game.undo(); // backtracking
    if (score >= bestScore) {
      bestScore = score;
      finalMove = move;
    }
  }
  return finalMove;
};

const minimax = (game, depth, isMaximisingPlayer, alpha, beta) => {
  if (depth === 0) {
    return -evaluateBoard(game.board()); // we've set black to favour negative score
  }

  let bestScore;
  if (isMaximisingPlayer) {
    bestScore = Number.NEGATIVE_INFINITY;
    const possibleMoves = game.moves();

    for (const move of possibleMoves) {
      game.move(move);
      bestScore = Math.max(
        bestScore,
        minimax(game, depth - 1, false, alpha, beta)
      );
      game.undo(); // backtracking

      alpha = Math.max(alpha, bestScore);
      if (beta <= alpha) {
        // pruning
        return bestScore;
      }
    }
  } else {
    bestScore = Number.POSITIVE_INFINITY;
    const possibleMoves = game.moves();

    for (const move of possibleMoves) {
      game.move(move);
      bestScore = Math.min(
        bestScore,
        minimax(game, depth - 1, true, alpha, beta)
      );
      game.undo(); // backtracking

      beta = Math.min(beta, bestScore);
      if (beta <= alpha) {
        // pruning
        return bestScore;
      }
    }
  }

  return bestScore;
};
