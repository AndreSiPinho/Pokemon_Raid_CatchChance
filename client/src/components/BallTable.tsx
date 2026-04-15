import "./BallTable.css";

type Ball = {
  id: number;
  name: string;
  image: string;
  multiplier: number;
  formattedRate?: string;
};

type Props = {
  balls: Ball[];
  selectedBall: string | null;
  selectedPokemon: string | null;
  onSelect: (name: string | null) => void;
};

function BallTable({ balls, selectedBall, selectedPokemon, onSelect }: Props) {
  return (
    <div className="table-box">
      <h3>Pokebolas</h3>

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
            {balls.map((ball) => (
              <tr
                key={ball.id}
                onClick={() => onSelect(ball.name)}
                className={selectedBall === ball.name ? "selected" : ""}
              >
                <td>
                  <img src={`/${ball.image}`} alt={ball.name} width="40" />
                </td>

                <td>{ball.name}</td>
                <td>
                  {selectedPokemon ? ball.formattedRate ?? "--" : "--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BallTable;
