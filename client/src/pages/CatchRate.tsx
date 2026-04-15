import { useState, useEffect } from "react";
import "./CatchRate.css";

const balls = [
  { name: "DuskBall", rate: 1, image: "/Pokeballs/duskball.png" },
  { name: "NetBall", rate: 1.5, image: "/Pokeballs/netball.png" },
  { name: "UltraBall", rate: 2, image: "/Pokeballs/ultraball.png" },
];

function Catch() {
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [selectedBall, setSelectedBall] = useState<string | null>(null);
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH BACKEND
  useEffect(() => {
    fetch("http://localhost:3001/pokemon")
      .then((res) => res.json())
      .then((data) => {
        // adapta automaticamente estrutura
        if (Array.isArray(data)) {
          setPokemonList(data);
        } else if (data.pokemon) {
          setPokemonList(data.pokemon);
        } else {
          setPokemonList([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar Pokémon:", err);
        setLoading(false);
      });
  }, []);

  // 🔍 FILTRO
  const filteredList = pokemonList.filter((p: any) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🧹 CLEAR
  const clearSelection = () => {
    setSelectedPokemon(null);
    setSelectedBall(null);
  };

  return (
    <div className="catch-container">
      <h2>Catch Rate 🎯</h2>

      <p>
        Pokémon: <b>{selectedPokemon || "Nenhum"}</b> | Pokébola:{" "}
        <b>{selectedBall || "Nenhuma"}</b>
      </p>

      {/* TOP BAR */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Pesquisar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={clearSelection}>Limpar</button>
      </div>

      {/* LOADING */}
      {loading ? (
        <p>A carregar Pokémon...</p>
      ) : (
        <div className="tables">
          {/* 🟢 POKEMON TABLE */}
          <div className="table-box">
            <h3>Choose Pokemon</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sprite</th>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredList.map((p: any) => (
                    <tr
                      key={p.dex}
                      onClick={() => setSelectedPokemon(p.name)}
                      className={
                        selectedPokemon === p.name ? "selected" : ""
                      }
                    >
                      <td>{p.dex}</td>

                      <td>
                        <img
                          src={`/${p.image}`}
                          alt={p.name}
                          width="40"
                          onError={(e) =>
                            (e.currentTarget.src = "/Pokemon/default.png")
                          }
                        />
                      </td>

                      <td>{p.name}</td>

                      <td>{p.types?.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 🔵 BALL TABLE */}
          <div className="table-box">
            <h3>Pokébolas</h3>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Sprite</th>
                    <th>Name</th>
                    <th>Rate</th>
                  </tr>
                </thead>

                <tbody>
                  {balls.map((b) => (
                    <tr
                      key={b.name}
                      onClick={() => setSelectedBall(b.name)}
                      className={
                        selectedBall === b.name ? "selected" : ""
                      }
                    >
                      <td>
                        <img src={b.image} alt={b.name} width="40" />
                      </td>

                      <td>{b.name}</td>
                      <td>{b.rate}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Catch;