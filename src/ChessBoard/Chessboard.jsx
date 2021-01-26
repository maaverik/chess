import React, { useEffect } from "react";
import $ from "jquery";
import { onDragStart, onDrop, onSnapEnd } from "./chessBoardUtils";

// This is a bit of a hack to declare jquery on the window object. It also makes it possible to call window.chessBoard further below
window.$ = window.jQuery = $;
let chessBoardObj; // making global since this object needs to be used elsewhere

export const App = () => {
  const boardRef = React.createRef();
  const boardId = "board1";
  const themePath =
    "https://chessboardjs.com/img/chesspieces/alpha/{piece}.png";

  const config = {
    pieceTheme: themePath,
    draggable: true,
    position: "start",
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd,
  };

  useEffect(() => {
    if (window && !window.ChessBoard) return;
    if (window && !window.$) return;

    chessBoardObj = window.ChessBoard(boardId, config);
    return () => chessBoardObj.destroy();
  });

  return (
    <div className="App">
      <div id={boardId} style={{ width: "400px" }} ref={boardRef}></div>
    </div>
  );
};

export { chessBoardObj };
export default App;
