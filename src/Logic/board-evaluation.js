import { pieceScores, pst_w, pst_b } from "./scoring-metrics";

// naive eval function
export const evaluateBoard = (board) => {
  let totalEvaluation = 0;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
    }
  }
  return totalEvaluation;
};

const getPieceValue = (piece, x, y) => {
  if (piece === null) {
    return 0;
  }
  const getAbsoluteValue = (piece, isWhite, x, y) => {
    if (piece.type === "p") {
      return pieceScores["p"] + (isWhite ? pst_w["p"][y][x] : pst_b["p"][y][x]);
    } else if (piece.type === "r") {
      return pieceScores["r"] + (isWhite ? pst_w["r"][y][x] : pst_b["r"][y][x]);
    } else if (piece.type === "n") {
      return pieceScores["n"] + (isWhite ? pst_w["n"][y][x] : pst_b["n"][y][x]);
    } else if (piece.type === "b") {
      return pieceScores["b"] + (isWhite ? pst_w["b"][y][x] : pst_b["b"][y][x]);
    } else if (piece.type === "q") {
      return pieceScores["q"] + (isWhite ? pst_w["q"][y][x] : pst_b["q"][y][x]);
    } else if (piece.type === "k") {
      return pieceScores["k"] + (isWhite ? pst_w["k"][y][x] : pst_b["k"][y][x]);
    }
    throw Error("Unknown piece type: " + piece.type);
  };

  const absoluteValue = getAbsoluteValue(piece, piece.color === "w", x, y);
  return piece.color === "w" ? absoluteValue : -absoluteValue; // black pieces have negative score
};
