import { useState } from "react";

export default function PokemonSearch({ pokemonList, onSelect }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = pokemonList.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (pokemon) => {
    setQuery(pokemon.name);   // put the name in the input
    setShowDropdown(false);
    onSelect(pokemon);        // notify parent
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={query}
        placeholder="Type a Pokémon name..."
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
        }}
        style={{
          width: "100%",
          padding: "0.5rem",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      {showDropdown && query.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            maxHeight: "200px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filtered.length === 0 && (
            <div style={{ padding: "0.5rem", color: "#777" }}>
              No matches
            </div>
          )}

          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelect(p)}
              style={{
                padding: "0.5rem",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
                color: "#000",          // <-- make text visible
                background: "white"     // <-- force white background
              }}
            >
              {p.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
