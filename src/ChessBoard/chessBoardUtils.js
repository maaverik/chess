import Chess from "chess.js";
import $ from "jquery";

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
}

export const onDragStart = (source, piece, position, orientation) => {
// do not pick up pieces if the game is over
    if (game.game_over()) return false;

    // only pick up pieces for the side to move
    if (
        (game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (game.turn() === "b" && piece.search(/^w/) !== -1)
    ) {
        return false;
    }
}

export const onDrop = (source, target) => {
    // see if the move is legal
    const move = game.move({
        from: source,
        to: target,
        promotion: "q", // NOTE: always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return "snapback";

    updateStatus();
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
export const onSnapEnd = () => {
    const board = $("#board1");
    board.position(game.fen());
}