import "./App.css";
import { useState } from "react";
import Block from "./components/Block";

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null); // ✅ Track the winner

  const checkWinner = (state: any[]) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (state[a] === state[b] && state[a] === state[c] && state[a] != null) {
        return state[a];
      }
    }
    return null;
  };

  const handleBlockClick = (index: number) => {
    if (state[index] != null || winner) return;

    const stateCopy = [...state];
    stateCopy[index] = currentTurn;
    setState(stateCopy);

    const win = checkWinner(stateCopy);
    if (win) {
      setWinner(win);
      setTimeout(() => alert(`${win} WON !!!`), 100);
    } else {
      setCurrentTurn(currentTurn === "X" ? "O" : "X");
    }
  };

  return (
    <div className="board">
      <h2>{winner ? `${winner} Wins!` : `Current Turn: ${currentTurn}`}</h2>{" "}
      {/* ✅ Display winner message */}
      <div className="row">
        <Block onClick={() => handleBlockClick(0)} value={state[0]} />
        <Block onClick={() => handleBlockClick(1)} value={state[1]} />
        <Block onClick={() => handleBlockClick(2)} value={state[2]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(3)} value={state[3]} />
        <Block onClick={() => handleBlockClick(4)} value={state[4]} />
        <Block onClick={() => handleBlockClick(5)} value={state[5]} />
      </div>
      <div className="row">
        <Block onClick={() => handleBlockClick(6)} value={state[6]} />
        <Block onClick={() => handleBlockClick(7)} value={state[7]} />
        <Block onClick={() => handleBlockClick(8)} value={state[8]} />
      </div>
      {winner && (
        <button onClick={() => window.location.reload()}>Restart</button>
      )}{" "}
      {/* ✅ Restart button appears after win */}
    </div>
  );
}

export default App;
