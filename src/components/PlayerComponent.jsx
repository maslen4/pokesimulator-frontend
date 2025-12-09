import React from 'react';
import PokemonImage from './PokemonImage.jsx';

export default function PlayerComponent( {data, health, attack, disabled, moves, index} ) {

    const image = data?.artworkURL?.value;
    console.log(data)

    const validMoves = moves.filter(move => move.basePower);

    const attackButtonList = () =>{
        return (
            validMoves.map((move, index) => (
                <div key={index} style={{marginBottom: "5px"}}>
                   <button 
                    key={index}
                    disabled={disabled}
                    onClick={() => attack(move.basePower.value)}>
                        {move.moveLabel.value} (Power: {move.basePower.value})
                    </button> 
                </div>
                
            ))
        );
    }

    return (
            <div
                style={{
                    marginTop:"5px",
                    flex:1
                }}>

                <p>Player {index} </p>
                {data?.artworkURL?.value && (
                    <PokemonImage image={image} />
                )}
                <p>Health: {health}</p>

                {attackButtonList()}
            </div>
        );
    }