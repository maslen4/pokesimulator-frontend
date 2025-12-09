export async function fetchFullPokemonData(pokemonURI) {
    const sparql = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX pkmno: <https://pokemonkg.org/ontology#>
        PREFIX pkmni: <https://pokemonkg.org/instance/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>

        SELECT 
            ?pokemonName ?artworkURL
            
        (GROUP_CONCAT (DISTINCT ?moveLabel; SEPARATOR = ",  ") AS ?moves)
        (GROUP_CONCAT (DISTINCT ?typeLabel; SEPARATOR = ",  ") AS ?types)
        (GROUP_CONCAT (DISTINCT ?ability; SEPARATOR = ",  ") AS ?abilities)
        (GROUP_CONCAT (DISTINCT ?hiddenAbility; SEPARATOR = ",  ") AS ?hiddenAbilities)

        WHERE {
        # Given a pokemon (here it is bulbasaur)
        BIND(<${pokemonURI}> AS ?pokemonURI)

        ?pokemonURI rdfs:label ?pokemonName ;
                    pkmno:hasType ?typeURI .
                    
        FILTER(lang(?pokemonName) = "en")

        #OPTIONAL {?pokedexEntry pkmno:describesPokémon ?pokemonURI ; pkmno:entryNumber ?nationalID . }
        
        OPTIONAL {
            ?pokemonURI foaf:depiction ?artworkURL .
            FILTER CONTAINS(STR(?artworkURL), "global") 
        }
        
        OPTIONAL { 
            ?pokemonURI pkmno:isAbleToApply ?isAbleToApply .
            ?isAbleToApply rdfs:label ?moveLabel .
            FILTER(lang(?moveLabel) = "en")
        }   
        OPTIONAL { 
            ?pokemonURI pkmno:mayHaveAbility ?mayHaveAbility .
            ?mayHaveAbility rdfs:label ?ability .
            FILTER(lang(?ability) = "en")
        }
        OPTIONAL { 
            ?pokemonURI pkmno:mayHaveHiddenAbil ?mayHaveHiddenAbility .
            ?mayHaveHiddenAbility rdfs:label ?hiddenAbility .
            FILTER(lang(?hiddenAbility) = "en")
        } 
        BIND(STRAFTER(STR(?typeURI), STR(pkmno:PokéType:)) AS ?typeLabel)
        }
        GROUP BY ?pokemonName ?artworkURL
    `;

    try {
      const url = `http://localhost:3030/Pokemon/sparql?query=${encodeURIComponent(
        sparql
      )}&format=json`;

      const res = await fetch(url);
      const data = await res.json();


      return data.results.bindings[0];
    } catch (err) {
      console.error("Error fetching SPARQL data:", err);
    }
    return null
  }

  export async function fetchFullMovesData(pokemonURI) {
    const sparql = `
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX pkmno: <https://pokemonkg.org/ontology#>
        PREFIX pkmni: <https://pokemonkg.org/instance/>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>

        SELECT ?moveLabel ?moveCategory ?moveTypeLabel ?accuracy ?basePower ?basePowerPoints ?maxPowerPoints
        ((?basePower * ?accuracy/100) + (((?maxPowerPoints - ?basePowerPoints) / ?maxPowerPoints) * 100) as ?moveContribution)

        WHERE {
          BIND(<${pokemonURI}> AS ?pokemonURI)
          
          ?learningEvent pkmno:featuresSpecies ?pokemonURI .
          
          OPTIONAL { 
            ?pokemonURI pkmno:isAbleToApply ?isAbleToApply .
            ?isAbleToApply rdfs:label ?moveLabel .
            FILTER(lang(?moveLabel) = "en")
          } 
          
          
          OPTIONAL { ?isAbleToApply pkmno:basePower ?basePower . }
          OPTIONAL { ?isAbleToApply pkmno:accuracy ?accuracy . }
          OPTIONAL { ?isAbleToApply pkmno:basePowerPoints ?basePowerPoints . }
          OPTIONAL { ?isAbleToApply pkmno:maxPowerPoints ?maxPowerPoints . }
          OPTIONAL { ?isAbleToApply pkmno:hasType ?moveType . }
          
          # 7. Determine Move Category (Physical, Special, or Status)
          ?isAbleToApply rdf:type ?categoryURI .
          
          # Filter to only include the specific Move Category classes
          FILTER(?categoryURI IN (pkmno:PhysicalMove, pkmno:SpecialMove, pkmno:StatusMove))
          
          # Extract the last part of the category URI (e.g., "PhysicalMove")
          BIND(STRAFTER(STR(?categoryURI), STR(pkmno:)) AS ?moveCategory)
          BIND(STRAFTER(STR(?moveType), STR(pkmno:PokéType:)) AS ?moveTypeLabel)
          
          # FILTER(BOUND(?basePower) && BOUND(?accuracy) && BOUND(?basePowerPoints) && BOUND(?maxPowerPoints))
        }
        ORDER BY ?moveLabel
    `;

    try {
      const url = `http://localhost:3030/Pokemon/sparql?query=${encodeURIComponent(
        sparql
      )}&format=json`;

      const res = await fetch(url);
      const data = await res.json();


      return data.results.bindings;
    } catch (err) {
      console.error("Error fetching SPARQL data:", err);
    }
    return null
  }
