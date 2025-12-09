import React from 'react';
import PokemonImage from './PokemonImage.jsx';

export default function PokemonDataVisualizer({ data }) {

    const image = data?.artworkURL?.value;
    const moves = data?.moves?.value ? data.moves.value.split(",  ") : [];
    const types = data?.types?.value ? data.types.value.split(",  ") : [];
    const abilities = data?.abilities?.value ? data.abilities.value.split(",  ") : [];
    const hiddenAbilities = data?.hiddenAbilities?.value ? data.hiddenAbilities.value.split(",  ") : [];

    const movesList = () =>{
        return (
            moves.map((move, index) => (
                <p key={index}>{move}</p>
            ))
        );
    }

    const movesListSimple = () =>{
        return (
            <p>{moves.join(", ")}</p>
        );
    }

    return (
            <div
                style={{
                    paddingTop:"70px"
                }}>
                {data?.artworkURL?.value && (
                    <PokemonImage image={image} />
                )}
                {movesListSimple()}
            </div>
        );
    }
    
