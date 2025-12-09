import React, { useState, useEffect, use } from "react";
import PokemonSearch from "./components/PokemonSearch.jsx";
import './App.css';
import { fetchFullPokemonData } from "./queries/queries.js";
import PokemonDataVisualizer from "./components/PokemonDataVisualizer.jsx";
import GameComponent from "./components/GameComponent.jsx";

export default function App() {

  const [player1Pokemon, setPlayer1Pokemon] = useState();
  const [player2Pokemon, setPlayer2Pokemon] = useState(); 
  const [player1data, setPlayer1data] = useState();
  const [player2data, setPlayer2data] = useState();
  const [selection, setSelection] = useState(true);

  useEffect(() => {
    if (player1Pokemon){
      fetchFullPokemonData(
            player1Pokemon
          ).then(
            data => {
              setPlayer1data(data)
              console.log(data)
            }
          );
    }
  }, [player1Pokemon]);

  useEffect(() => {
    if (player2Pokemon){
      fetchFullPokemonData(
            player2Pokemon
          ).then(
            data => {
              setPlayer2data(data)
              console.log(data)
            }
          );
    }
  }, [player2Pokemon]);

  const handleStart = () => {
    setSelection(!selection);
  }

  const handleGameOver = () => { 
    setSelection(true);
  }

  

  return (
  <div>
    {(selection? <div>
      
      <div
      style={{
        display: "flex",
        height: "25vh",       // full viewport height
        width: "100%",
      }}
    >
      {/* Player 1 */}
      <div
        style={{
          flex: 1,             // takes half the screen
          //borderRight: "1px solid #ccc",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <h2>Player 1</h2>
        <PokemonSearch handleSelection={setPlayer1Pokemon} />
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
        <PokemonSearch handleSelection={setPlayer2Pokemon} />
      </div>
      
     </div>
     <div 
     style={{
        display: "flex",
        height: "65vh",       // full viewport height
        width: "100%",
      }}>
        <div
          style={{
            flex: 1,             // takes half the screen
            //borderRight: "1px solid #ccc",
            padding: "20px",
            boxSizing: "border-box",
          }}>
          {player1data?<PokemonDataVisualizer data={player1data} uri={player1Pokemon}/> : null}
        </div>
        <div
          style={{
            flex: 1,
            padding: "20px",
            boxSizing: "border-box",
          }}>
          {player2data?<PokemonDataVisualizer data={player2data} uri={player2Pokemon}/> : null}
        </div>
      </div>
      <button disabled={!player1data || !player1data} onClick={() => {handleStart()}}> {` Start `} </button>
    </div>
     : 
     <div>
      <button onClick={() => {console.log(selection);setSelection(!selection)}}> {` Back `} </button>
      <GameComponent pokemon1={player1data} pokemon2={player2data} player1uri={player1Pokemon} player2uri={player2Pokemon} gameOver={handleGameOver}/>
     </div>
     
    )}
    </div>
    
    
  );
}
