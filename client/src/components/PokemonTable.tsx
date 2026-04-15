import "./PokemonTable.css";

type Props = {
  pokemonList: any[];
  selectedPokemon: string | null;
  onSelect: (name: string | null) => void;
};

function PokemonTable({ pokemonList, selectedPokemon, onSelect }: Props) {
  return (
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
            {pokemonList.map((p) => (
              <tr
                key={p.dex}
                onClick={() => onSelect(p.name)}
                className={selectedPokemon === p.name ? "selected" : ""}
              >
                <td>{p.dex}</td>

                <td>
                  <img
                    src={`/${p.image}`}
                    alt={p.name}
                    width="40"
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
  );
}

export default PokemonTable;
