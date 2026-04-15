import "./Home.css";

const features = [
  {
    eyebrow: "Catch Rate",
    title: "Escolhe o Pokemon e compara Pokebolas.",
    description:
      "Vemos o bonus de cada bola com base nas regras do projeto, incluindo casos especiais como Fast, Net, Repeat e Heavy Ball.",
  },
  {
    eyebrow: "Pesquisa Rapida",
    title: "Encontra o raid boss sem perder tempo.",
    description:
      "A pesquisa ajuda a filtrar a lista e a limpeza de selecao deixa-te recomecar o calculo com um clique.",
  },
  {
    eyebrow: "Tudo Num So Sitio",
    title: "Menos tentativa e erro, mais contexto.",
    description:
      "A app junta dados do Pokemon, tabela de Pokebolas e resultado do backend num fluxo simples de usar.",
  },
];

function Home() {
  return (
    <section className="home-page">
      <div className="home-grid">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <span className="feature-eyebrow">{feature.eyebrow}</span>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>

      <div className="home-note">
        <span className="feature-eyebrow">Como Funciona?</span>
        <h2>Simples, rápido e preciso</h2>
        <p>
          Escolhe o Pokémon, seleciona a Pokébola e vê imediatamente a probabilidade de captura. A ferramenta aplica automaticamente os modificadores e regras para te dar o melhor resultado possível.
        </p>
      </div>
    </section>
  );
}

export default Home;
