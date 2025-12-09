import React, { useState, useEffect } from "react";

export default function PokemonSearch({ handleSelection }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Debounce typing to avoid spamming the SPARQL endpoint
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) fetchPokemon(query);
      else setResults([]);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  async function fetchPokemon(searchString) {
    const sparql = `
      PREFIX poke: <https://pokemonkg.org/ontology#>
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

      SELECT ?pokemon ?label WHERE {
        ?pokemon a poke:Species ;
                 rdfs:label ?label .
        FILTER(STRSTARTS(LCASE(?label), "${searchString.toLowerCase()}"))
        FILTER(LANG(?label) = "en")
      }
      ORDER BY ?label
      LIMIT 50
    `;

    try {
      const url = `http://localhost:3030/Pokemon/sparql?query=${encodeURIComponent(
        sparql
      )}&format=json`;

      const res = await fetch(url);
      const data = await res.json();

      const pokemonResults = data.results.bindings.map((b) => ({
        pokemon: b.pokemon.value,
        label: b.label.value,
      }));

      setResults(pokemonResults);
    } catch (err) {
      console.error("Error fetching SPARQL data:", err);
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Pokémon"
        style={{ width: "50%", padding: "8px", fontSize: "16px" }}
      />

      {results.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            borderRadius: "6px",
            marginTop: "5px",
            marginLeft: "25%",
            backgroundColor: "white",
            color: "black",
            maxHeight: "200px",
            overflowY: "auto",
            width: "50%",
          }}
        >
          {results.map((p) => (
            <div
              key={p.pokemon}
              style={{
                padding: "8px",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
              }}
              onClick={() => {
                handleSelection(p.pokemon);
              }}
            >
              {p.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
