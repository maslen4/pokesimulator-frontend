import React, { use, useEffect, useState } from 'react';
import PlayerComponent from './PlayerComponent';
import { fetchFullMovesData } from '../queries/queries.js';

export default function GameComponent({pokemon1, pokemon2, player1uri, player2uri, gameOver}) {
    const player1 = pokemon1
    const player2 = pokemon2
    const [player1Health, setPlayer1Health] = useState(200)
    const [player2Health, setPlayer2Health] = useState(200)
    const [currentMove, setCurrentMove] = useState(true) // true for player1, false for player2
    const [isGameOver, setIsGameOver] = useState(false);

    const [player1moves, setPlayer1moves] = useState([]);
    const [player2moves, setPlayer2moves] = useState([]);



    useEffect(() => {
        if (player1uri){
          fetchFullMovesData(
                player1uri
              ).then(
                data => {
                  setPlayer1moves(data);
                  console.log(data)

                }
              );
    }}, [player1uri]);

    useEffect(() => {
        if (player2uri){
          fetchFullMovesData(
                player2uri
              ).then(
                data => {
                  setPlayer2moves(data);
                  console.log(data)

                }
              );
    }}, [player2uri]);

    useEffect(() => {
        checkForWin();
    }, [currentMove]);


// Player 2 attacking player 1
    const attackPlayer1 = (damage) => {
        const healthAfterAttack = (player1Health - damage) >= 0 ? (player1Health - damage) : 0;
        setPlayer1Health(healthAfterAttack)
        setCurrentMove(!currentMove);
    }

// Player 1 attacking player 2
    const attackPlayer2 = (damage) => {
        const healthAfterAttack = (player2Health - damage) >= 0 ? (player2Health - damage) : 0;
        setPlayer2Health(healthAfterAttack)
        setCurrentMove(!currentMove);
    }

    const checkForWin = () => {
        if (player1Health <= 0){
            handleWin("Player 2");
            setIsGameOver(true);
        }else if (player2Health <= 0){
            handleWin("Player 1");
            setIsGameOver(true);
        }
    }

    const handleWin = (winner) => {
        alert(`${winner} wins!`);
    }

    return (
        <>
        <div
            style={{
                display: "flex",
                height: "25vh",
                width: "100%",
            }}
        >
            <PlayerComponent data={player1} health={player1Health} attack={attackPlayer2} disabled={currentMove} moves={player1moves} index={1}/>
            <PlayerComponent data={player2} health={player2Health} attack={attackPlayer1} disabled={!currentMove} moves={player2moves} index={2}/>
        </div>
        <div>
        {isGameOver ? <button onClick={() => gameOver()}>Restart Game</button> : null}
        </div>
        </>
        
        
    );
}