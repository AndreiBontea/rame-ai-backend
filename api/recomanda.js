export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const {
      gen,
      stil,
      forma,
      latimeFata,
      inaltimeFata,
      distOchi,
      latimeBarbie,
      raport,
      interpupilara,
      latimeNas,
      inaltimeFrunte,
      latimeSprancene
    } = req.body;

    if (!gen || !stil || !forma) {
      return res.status(400).json({ error: "Lipsesc datele necesare" });
    }

    // Conversie la float
    const latime = parseFloat(latimeFata);
    const inaltime = parseFloat(inaltimeFata);
    const r = parseFloat(raport);
    const dOchi = parseFloat(distOchi);
    const barb = parseFloat(latimeBarbie);
    const inter = parseFloat(interpupilara);
    const nas = parseFloat(latimeNas);
    const frunte = parseFloat(inaltimeFrunte);
    const sprancene = parseFloat(latimeSprancene);

    // Construim o recomandare detaliată
    let recomandare = `Pentru o față de tip ${forma.toLowerCase()}, cu lățimea de ${latime}px și înălțimea de ${inaltime}px (raport ${r.toFixed(2)}), `;

    if (r > 1.3) {
      recomandare += `se recomandă rame pătrate sau dreptunghiulare pentru a echilibra lățimea feței. `;
    } else if (r < 0.9) {
      recomandare += `ramele rotunde sau ovale ajută la echilibrarea feței alungite. `;
    } else {
      recomandare += `forme versatile precum rame "wayfarer" sau ușor unghiulare sunt potrivite. `;
    }

    if (dOchi < 70) {
      recomandare += `Distanța mică între ochi sugerează rame cu punte nazală îngustă sau transparentă. `;
    } else if (dOchi > 90) {
      recomandare += `Pentru ochi mai depărtați, sunt indicate rame cu punte nazală lată. `;
    }

    if (barb < sprancene * 0.75) {
      recomandare += `Bărbia îngustă față de frunte necesită rame mai accentuate în partea superioară. `;
    }

    if (nas < 30) {
      recomandare += `Un nas îngust indică rame cu suport nazal moale sau ajustabil. `;
    }

    if (frunte > 120) {
      recomandare += `Fruntea înaltă poate fi echilibrată cu rame mai late sau cu brațe evidențiate. `;
    }

    // Stilul și genul
    recomandare += `În funcție de stilul ${stil.toLowerCase()} și genul ${gen.toLowerCase()}, se recomandă `;

    if (stil === "Elegant") {
      recomandare += `rame subțiri din titan sau metal, cu un design minimalist și culoare neutră sau aurie.`;
    } else if (stil === "Sport") {
      recomandare += `rame robuste din plastic flexibil sau policarbonat, cu forme aerodinamice.`;
    } else {
      recomandare += `rame casual, versatile, potrivite pentru utilizare zilnică, în culori discrete.`;
    }

    res.status(200).json({ raspuns: recomandare });
  } catch (error) {
    console.error("Eroare la generare recomandare:", error);
    res.status(500).json({ error: "Eroare internă la generare." });
  }
}
