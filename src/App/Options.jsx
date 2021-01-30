import { undoInit, resetGame } from "./optionUtils";

const Button = (props) => (
  <button className="btn" onClick={props.onClick}>
    {props.children}
  </button>
);

// const Difficulty = () => {   // TODO
//   return <Button>Difficulty</Button>;
// };

// const Score = () => {    // TODO
//   return <Button>Score</Button>;
// };

const Undo = () => {
  return <Button onClick={undoInit}>Undo last move</Button>;
};

const Reset = () => {
  return <Button onClick={resetGame}>Reset game</Button>;
};

const Options = () => {
  return (
    <div className="options-list">
      <Undo />
      <Reset />
    </div>
  );
};

export default Options;
