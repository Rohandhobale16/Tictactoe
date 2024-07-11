import React from 'react';
import Game from './components/Game';


const App = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">Tic Tac Toe</h1>
      <Game />
    </div>
  );
};

export default App;


