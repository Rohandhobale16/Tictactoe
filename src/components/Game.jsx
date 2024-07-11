import React, { useState, useEffect } from 'react';
import Board from './Board';
import Confetti from 'react-confetti';

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player1, setPlayer1] = useState("Player 1");
  const [player2, setPlayer2] = useState("Player 2");
  const [isNewGame, setIsNewGame] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (winner) {
      const audio = new Audio('/win-sound.wav');
      audio.play();
    }
  }, [winner]);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) return;
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
    const win = calculateWinner(newSquares);
    if (win) {
      setWinner(win === 'X' ? player1 : player2);
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
  };

  const startNewGame = () => {
    resetGame();
    setIsNewGame(true);
  };

  const handleStartGame = () => {
    setIsNewGame(false);
  };

  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? player1 : player2}`;

  return (
    <div className="flex flex-col items-center mt-10 bg-blue-100 p-5 rounded-lg shadow-md w-80">
      {winner && <Confetti />}
      {isNewGame ? (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-blue-900">Enter Player Names:</h2>
          <input
            type="text"
            value={player1}
            onChange={(e) => setPlayer1(e.target.value)}
            className="p-2 rounded border border-gray-300 w-full"
            placeholder="Player 1 Name"
          />
          <input
            type="text"
            value={player2}
            onChange={(e) => setPlayer2(e.target.value)}
            className="p-2 rounded border border-gray-300 w-full"
            placeholder="Player 2 Name"
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 w-full"
            onClick={handleStartGame}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="mb-5 text-2xl font-semibold text-blue-900">{status}</div>
          <Board squares={squares} onClick={handleClick} />
          <div className="mt-5 space-y-2">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 w-full"
              onClick={resetGame}
            >
              Reset Game
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 w-full"
              onClick={startNewGame}
            >
              New Game
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
