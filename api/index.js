const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recomanda", (req, res) => {
  const { forma, gen, stil } = req.body;

  if (!forma || !gen || !stil) {
    return res.status(400).json({ eroare: "Date lipsă" });
  }

  let recomandari = ["rame universale"];
  if (forma === "Alungită") {
    recomandari = ["rame rotunde", "rame cu lentile mari"];
  }

  return res.json({
    recomandare: `Pentru fața ${forma}, genul ${gen}, stil ${stil}, recomandăm: ${recomandari.join(", ")}`,
  });
});

// Export pt Vercel
module.exports = (req, res) => app(req, res);

