import React from "react";
import $ from "jquery";
import { onDragStart, onDrop, onSnapEnd } from "./chessBoardUtils";

// This is a bit of a hack to declare jquery on the window object. It also makes it possible to call window.chessBoard further below
window.$ = window.jQuery = $;
let chessBoardObj; // making global since this object needs to be used elsewhere

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.boardRef = React.createRef();
    this.boardId = "board1";
    const themePath =
      "https://chessboardjs.com/img/chesspieces/alpha/{piece}.png";

    this.board = null;

    this.config = {
      pieceTheme: themePath,
      draggable: true,
      position: "start",
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
    };
  }

  componentDidMount() {
    if (window && !window.ChessBoard) return;
    if (window && !window.$) return;

    chessBoardObj = window.ChessBoard(this.boardId, this.config);
    // this.chessBoard = window.ChessBoard(this.boardId, this.defaultConfig);
  }

  componentWillUnmount() {
    chessBoardObj.destroy();
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

export { chessBoardObj };
