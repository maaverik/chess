import React from "react";
import "./App.css";
import $ from "jquery";

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
    // const themePath =
    //   process.env.PUBLIC_URL + "/assets/img/chesspieces/wikipedia/{piece}.png";

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
      //   pieceTheme: themePath,
      sparePieces: false,
      trashSpeed: 25,
    };
  }

  componentDidMount() {
    if (window && !window.ChessBoard) return;
    if (window && !window.$) return;

    this.chessBoard = window.ChessBoard(this.boardId, this.defaultConfig);
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
