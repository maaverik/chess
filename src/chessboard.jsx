import React from "react";
import "./App.css";
import $ from "jquery";
import Chess from "chess.js";

// This is a bit of a hack to declare jquery on the window object. It also makes it possible to call window.chessBoard further below
window.$ = window.jQuery = $;

export default class App extends React.Component {
  // Please disregard the massive overuse of the any type here
  boardRef;
  chessBoard;
  boardId;
  defaultConfig;

  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.boardId = "board1";
    const themePath =
      "https://chessboardjs.com/img/chesspieces/alpha/{piece}.png";

    var board = null;
    var game = new Chess();
    var $status = $("#status");
    var $fen = $("#fen");
    var $pgn = $("#pgn");

    function onDragStart(source, piece, position, orientation) {
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

    function onDrop(source, target) {
      // see if the move is legal
      var move = game.move({
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
    function onSnapEnd() {
      board.position(game.fen());
    }

    function updateStatus() {
      var status = "";

      var moveColor = "White";
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

      $status.html(status);
      $fen.html(game.fen());
      $pgn.html(game.pgn());
    }

    this.config = {
      pieceTheme: themePath,
      draggable: true,
      position: "start",
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
    };

    this.defaultConfig = {
      appearSpeed: 25,
      draggable: true,
      dropOffBoard: "snapback",
      moveSpeed: 25,
      orientation: "white",
      position: "start",
      showErrors: "console",
      showNotation: true,
      snapSpeed: 25,
      snapbackSpeed: 50,
      pieceTheme: themePath,
      sparePieces: false,
      trashSpeed: 25,
    };
  }

  componentDidMount() {
    if (window && !window.ChessBoard) return;
    if (window && !window.$) return;

    this.chessBoard = window.ChessBoard(this.boardId, this.config);
    // this.chessBoard = window.ChessBoard(this.boardId, this.defaultConfig);
  }

  componentWillUnmount() {
    this.chessBoard.destroy();
  }

  render() {
    return (
      <div className="App">
        <div
          id={this.boardId}
          style={{ width: "400px" }}
          ref={this.boardRef}
        ></div>
      </div>
    );
  }
}
