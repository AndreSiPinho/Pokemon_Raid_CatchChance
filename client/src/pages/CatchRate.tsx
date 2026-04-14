import { useState } from "react";
import "./CatchRate.css";

// MOCK DATA
const pokemonList = [
  { dex: 150, name: "Mewtwo", image: "public/Pokemon/Poke150.png" },
  { dex: 144, name: "Articuno", image: "public/Pokemon/Poke144.png" },
  { dex: 145, name: "Zapdos", image: "public/Pokemon/Poke145.png" },
];

const balls = [
  { name: "DuskBall", rate: 1, image: "public/Pokeballs/duskball.png" },
  { name: "NetBall", rate: 1.5, image: "public/Pokeballs/netball.png" },
  { name: "UltraBall", rate: 2, image: "public/Pokeballs/ultraball.png" },
];

function Catch() {
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<number | null>(null);
  const [selectedBall, setSelectedBall] = useState<string | null>(null);

  // FILTER
  const filteredList = pokemonList.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // CLEAR
  const clearSelection = () => {
    setSelectedPokemon(null);
    setSelectedBall(null);
  };

  return (
    <div className="catch-container">
      <h2>Catch Rate 🎯</h2>

      {/* TOP BAR */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Escreve o nome (ex: Mewtwo)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={clearSelection}>Limpar Seleção</button>
      </div>

      {/* TABLES */}
      <div className="tables">
        {/* POKEMON TABLE */}
        <div className="table-box">
          <h3>Choose Pokemon</h3>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Sprite</th>
                <th>Name</th>
              </tr>
            </thead>

            <tbody>
              {filteredList.map((p) => (
                <tr
                  key={p.dex}
                  onClick={() => setSelectedPokemon(p.dex)}
                  className={selectedPokemon === p.dex ? "selected" : ""}
                >
                  <td>{p.dex}</td>

                  <td>
                    <img src={p.image} alt={p.name} width="40" />
                  </td>

                  <td>{p.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BALL TABLE */}
        <div className="table-box">
          <h3>Top 5 Pokébolas</h3>

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
                  className={selectedBall === b.name ? "selected" : ""}
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
  );
}

export default Catch;