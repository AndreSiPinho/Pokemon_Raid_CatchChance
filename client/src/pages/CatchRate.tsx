import { useEffect, useMemo, useState } from "react";
import "./CatchRate.css";

import PokemonTable from "../components/PokemonTable";
import BallTable from "../components/BallTable";

const API_URL = import.meta.env.VITE_API_URL?.trim() || "";

type Pokemon = {
  dex: number;
  name: string;
  image: string;
  types?: string[];
};

type Ball = {
  id: number;
  name: string;
  image: string;
  multiplier: number;
  formattedRate?: string;
};

type CatchRateResponse = {
  rates: Ball[];
};

function Catch() {
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [selectedBall, setSelectedBall] = useState<string | null>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [baseBalls, setBaseBalls] = useState<Ball[]>([]);
  const [balls, setBalls] = useState<Ball[]>([]);

  const handleClearSelection = () => {
    setSearch("");
    setSelectedPokemon(null);
    setSelectedBall(null);
  };

  useEffect(() => {
    fetch(`${API_URL}/pokemon`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data);
      });

    fetch(`${API_URL}/pokeballs`)
      .then((res) => res.json())
      .then((data) => {
        setBaseBalls(data);
        setBalls(data);
      });
  }, []);

  useEffect(() => {
    if (!selectedPokemon) {
      setBalls(baseBalls);
      return;
    }

    fetch(`${API_URL}/catch-rate?pokemon=${encodeURIComponent(selectedPokemon)}`)
      .then((res) => res.json())
      .then((data: CatchRateResponse) => {
        setBalls(data.rates);
      });
  }, [baseBalls, selectedPokemon]);

  const filteredList = useMemo(
    () =>
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
      ),
    [pokemonList, search]
  );

  return (
    <div className="catch-container">
      <h2>Catch Rate</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Pesquisar Pokemon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="button"
          onClick={handleClearSelection}
          disabled={!search && !selectedPokemon && !selectedBall}
        >
          Clean Selection
        </button>
      </div>

      <div className="tables">
        <PokemonTable
          pokemonList={filteredList}
          selectedPokemon={selectedPokemon}
          onSelect={setSelectedPokemon}
        />

        <BallTable
          balls={balls}
          selectedBall={selectedBall}
          selectedPokemon={selectedPokemon}
          onSelect={setSelectedBall}
        />
      </div>
    </div>
  );
}

export default Catch;
