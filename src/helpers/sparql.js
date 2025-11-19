import { QueryEngine } from "@comunica/query-sparql";

const engine = new QueryEngine();

export async function runQuery(sparql) {
  const result = await engine.queryBindings(sparql, {
    sources: [
      {
        type: "file",
        value: "/pokemon.ttl"    // served from public/
      }
    ]
  });

  const bindings = await result.toArray();

  return bindings.map(b => {
    const obj = {};
    for (const [key, value] of b.entries()) {
      obj[key] = value.value;
    }
    return obj;
  });
}
