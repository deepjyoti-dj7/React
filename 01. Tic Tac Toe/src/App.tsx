import "./App.css";
import { useState, useRef } from "react";
import Block from "./components/Block";

const App: React.FC = () => {
  const [state, setState] = useState<(string | null)[]>(Array(9).fill(null));
  const [currentTurn, setCurrentTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [playerX, setPlayerX] = useState<string>("");
  const [playerO, setPlayerO] = useState<string>("");
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false); // Dark mode state

  // Ref for player O input field
  const playerORef = useRef<HTMLInputElement>(null);

  const checkWinner = (state: (string | null)[]): string | null => {
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
      if (state[a] === state[b] && state[a] === state[c] && state[a] !== null) {
        return state[a];
      }
    }
    return null;
  };

  const handleBlockClick = (index: number) => {
    if (!gameStarted || state[index] !== null || winner) return;

    const stateCopy = [...state];
    stateCopy[index] = currentTurn;
    setState(stateCopy);

    const win = checkWinner(stateCopy);
    if (win) {
      setWinner(win);
    } else {
      setCurrentTurn(currentTurn === "X" ? "O" : "X");
    }
  };

  const startGame = () => {
    if (!playerX || !playerO) {
      alert("Please enter both player names!");
      return;
    }
    setGameStarted(true);
  };

  // Function to handle Enter key behavior
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: "X" | "O"
  ) => {
    if (e.key === "Enter") {
      if (field === "X" && playerORef.current) {
        playerORef.current.focus(); // Move to second input
      } else if (field === "O") {
        startGame(); // Start game if already in second input
      }
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <button
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>
      <div className="board">
        {!gameStarted ? (
          <div className="board-names">
            <h2>Enter Player Names:</h2>
            <input
              type="text"
              placeholder="Player X Name"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "X")}
            />
            <input
              type="text"
              placeholder="Player O Name"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "O")}
              ref={playerORef} // Assign ref to the second input
            />
            <button onClick={startGame}>Start Game</button>
          </div>
        ) : (
          <>
            <h1>
              {winner
                ? `${winner === "X" ? playerX : playerO} Wins! 🎉`
                : `Current Turn: ${currentTurn === "X" ? playerX : playerO}`}
            </h1>
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
              <div className="winner-message">
                <h2>{winner === "X" ? playerX : playerO} Wins! 🎉</h2>
                <button onClick={() => window.location.reload()}>
                  Restart Game
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
