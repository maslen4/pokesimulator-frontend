import React, { useState, useEffect } from "react";
import PokemonSearch from "./components/PokemonSearch.jsx";

export default function App() {

  const [player1Pokemon, setPlayer1Pokemon] = useState();
  const [player2Pokemon, setPlayer2Pokemon] = useState(); 

  
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",       // full viewport height
        width: "100%",
      }}
    >
      {/* Player 1 */}
      <div
        style={{
          flex: 1,             // takes half the screen
          borderRight: "1px solid #ccc",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2>Player 1</h2>
        <PokemonSearch onSelect={setPlayer1Pokemon} />
      </div>

      {/* Player 2 */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2>Player 2</h2>
        <PokemonSearch onSelect={setPlayer2Pokemon} />
      </div>
    </div>
  );
}
