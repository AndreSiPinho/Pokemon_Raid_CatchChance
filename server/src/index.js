const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const pokemonData = require("./data/pokemons.json");
const pokeballData = require("./data/pokeball.json");

const app = express();

const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";
const DIST_PATH = path.resolve(__dirname, "../../client/dist");

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
);

const allPokemon = pokemonData.pokemon;
const allPokeballs = pokeballData.pokeballs;

function normalizeName(value = "") {
  return value.trim().toLowerCase();
}

function formatRate(rate) {
  return `${(rate * 100).toFixed(2)}%`;
}

function findPokemonByName(name) {
  return allPokemon.find((pokemon) => normalizeName(pokemon.name) === normalizeName(name));
}

function getAvailablePokeballs() {
  return allPokeballs.filter((ball) => normalizeName(ball.name) !== "dusk ball");
}

function sortPokeballsByValue(items, valueSelector) {
  return [...items].sort((left, right) => {
    const valueDifference = valueSelector(right) - valueSelector(left);

    if (valueDifference !== 0) {
      return valueDifference;
    }

    return left.name.localeCompare(right.name);
  });
}

function getBaseRate(pokemon) {
  return (pokemon.catch?.defaultRate ?? 0) / 255.0;
}

function findRate(pokeball, pokemon) {
  const captureRate = pokemon.catch?.defaultRate ?? 0;
  const base = getBaseRate(pokemon);
  const ballBonus = pokeball.catch?.multiplier ?? 1;
  const ballName = normalizeName(pokeball.name);
  const speed = pokemon.stats?.speed ?? 0;
  const weight = pokemon.physical?.weightKg ?? 0;
  const types = pokemon.types ?? [];

  if (ballName === "fast ball") {
    const minSpeed = pokeball.catch?.conditions?.minSpeed;
    return minSpeed != null && speed >= minSpeed
      ? (captureRate * ballBonus) / 255.0
      : base;
  }

  if (ballName === "net ball") {
    const hasMatchingType = types.includes("Water") || types.includes("Bug");
    return hasMatchingType ? (captureRate * ballBonus) / 255.0 : base;
  }

  if (ballName === "repeat ball") {
    return (captureRate * ballBonus) / 255.0;
  }

  if (ballName === "heavy ball") {
    if (weight < 100) {
      return captureRate - 20 < 0 ? 0.0001 : (captureRate - 20) / 255.0;
    }

    if (weight < 200) {
      return captureRate / 255.0;
    }

    if (weight < 300) {
      return (captureRate + 20) / 255.0;
    }

    if (weight < 409.5) {
      return (captureRate + 30) / 255.0;
    }

    return (captureRate + 40) / 255.0;
  }

  return (captureRate * ballBonus) / 255.0;
}

function buildCatchRateResponse(pokemon) {
  const rates = sortPokeballsByValue(getAvailablePokeballs(), (pokeball) =>
    findRate(pokeball, pokemon)
  ).map((pokeball) => {
    const rate = findRate(pokeball, pokemon);

    return {
      id: pokeball.id,
      name: pokeball.name,
      image: pokeball.image,
      multiplier: pokeball.catch?.multiplier ?? 1,
      rate,
      formattedRate: formatRate(rate),
    };
  });

  return {
    pokemon: {
      dex: pokemon.dex,
      name: pokemon.name,
      defaultRate: pokemon.catch?.defaultRate ?? 0,
    },
    rates,
  };
}

app.get("/", (_req, res) => {
  res.send("API a funcionar!");
});

app.get("/pokemon", (_req, res) => {
  res.json(allPokemon);
});

app.get("/pokeballs", (_req, res) => {
  res.json(
    sortPokeballsByValue(
      getAvailablePokeballs(),
      (pokeball) => pokeball.catch?.multiplier ?? 1
    ).map((pokeball) => ({
      id: pokeball.id,
      name: pokeball.name,
      image: pokeball.image,
      multiplier: pokeball.catch?.multiplier ?? 1,
    }))
  );
});

app.get("/catch-rate", (req, res) => {
  const pokemonName = typeof req.query.pokemon === "string" ? req.query.pokemon : "";

  if (!pokemonName) {
    return res.status(400).json({ error: "Pokemon is required." });
  }

  const pokemon = findPokemonByName(pokemonName);

  if (!pokemon) {
    return res.status(404).json({ error: "Pokemon not found." });
  }

  return res.json(buildCatchRateResponse(pokemon));
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(DIST_PATH));

  app.get(/^(?!\/pokemon|\/pokeballs|\/catch-rate).*/, (_req, res) => {
    res.sendFile(path.join(DIST_PATH, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
