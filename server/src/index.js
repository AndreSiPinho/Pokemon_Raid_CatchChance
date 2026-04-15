const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

// TESTE
app.get("/", (req, res) => {
  res.send("API a funcionar!");
});

// 🔥 POKEMON ROUTE
app.get("/pokemon", (req, res) => {
  const data = require("./data/pokemons.json");
  res.json(data.pokemon); // 🔥 MUITO IMPORTANTE
});
// SERVER
app.listen(3001, () => {
  console.log("Server running on port 3001");
});