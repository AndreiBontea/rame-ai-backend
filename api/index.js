const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recomanda", (req, res) => {
  try {
    const { forma, gen, stil } = req.body;

    if (!forma || !gen || !stil) {
      return res.status(400).json({ eroare: "Date lipsă din cerere." });
    }

    let recomandari = [];

    if (forma === "Rotundă") {
      recomandari.push("rame dreptunghiulare", "rame pătrate");
    } else if (forma === "Pătrată") {
      recomandari.push("rame rotunde", "rame ovale");
    } else if (forma === "Ovala") {
      recomandari.push("rame dreptunghiulare subțiri", "rame aviator");
    } else if (forma === "Inimă") {
      recomandari.push("rame ovale", "rame fără contur");
    } else if (forma === "Alungită") {
      recomandari.push("rame rotunde", "rame cu lentile mari");
    } else {
      recomandari.push("rame universale");
    }

    // Adaugă personalizare pe gen și stil
    const text = `Pentru fața ${forma.toLowerCase()}, genul ${gen.toLowerCase()} și stilul preferat ${stil.toLowerCase()}, îți recomandăm: ${recomandari.join(", ")}.`;

    res.json({ recomandare: text });
  } catch (error) {
    res.status(500).json({ eroare: "Eroare internă la generare recomandare." });
  }
});

// Export pt Vercel
module.exports = app;
