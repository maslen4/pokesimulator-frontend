# PokeSimulator Frontend

This is a simple React frontend that queries Pokémon data using
**SPARQL** from a local **Apache Jena Fuseki** server.\
There is **no backend** --- the frontend directly queries the SPARQL
endpoint.

------------------------------------------------------------------------

## 🚀 Requirements

### 1. **Node.js** (v18+)

Download: https://nodejs.org/

### 2. **Apache Jena Fuseki**

1.  Download Fuseki:\
    https://jena.apache.org/download/

2.  Start the server:

``` sh
./fuseki-server
```

3.  Open the UI:\
    http://localhost:3030/

4.  Create a dataset named **Pokemon** (capital P).

5.  Upload the `.ttl` file via:

    -   Dataset → **Add Data** → upload your `.ttl`.

------------------------------------------------------------------------

## ▶️ Running the Frontend

Inside the project folder:

``` sh
npm install
npm run dev
```

The app will run at:

    http://localhost:5173/

------------------------------------------------------------------------

## 🔗 SPARQL Endpoint Used by the Frontend

The frontend expects Fuseki to expose this endpoint:

    http://localhost:3030/Pokemon/sparql

If your dataset name differs, update the URL in the React component.

