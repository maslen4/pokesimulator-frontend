export default function PokemonDataVisualizer( image ) {
    return (
            <div
                style={{
                    marginTop:"5%",
                    height: "300px",
                }}>
                <img src={image.image} alt="Pokemon artwork" />
                
            </div>
        );
    }