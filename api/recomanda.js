export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const {
      gen, stil, forma,
      latimeFata, inaltimeFata, distOchi,
      latimeBarbie, raport, interpupilara,
      latimeNas, inaltimeFrunte, latimeSprancene
    } = req.body;

    if (
      !gen || !stil || !forma || !latimeFata || !inaltimeFata ||
      !distOchi || !latimeBarbie || !raport || !interpupilara ||
      !latimeNas || !inaltimeFrunte || !latimeSprancene
    ) {
      return res.status(400).json({ error: "Lipsesc date necesare pentru analiză completă." });
    }

    // Conversie în float
    const latime = parseFloat(latimeFata);
    const inaltime = parseFloat(inaltimeFata);
    const raportFata = parseFloat(raport);
    const nas = parseFloat(latimeNas);
    const ochi = parseFloat(interpupilara);
    const barbie = parseFloat(latimeBarbie);
    const frunte = parseFloat(inaltimeFrunte);
    const sprancene = parseFloat(latimeSprancene);

    // Prompt coerent bazat pe toate datele
    const recomandare = `Pe baza analizelor faciale detectate:
- Gen: ${gen}
- Stil preferat: ${stil}
- Forma feței: ${forma}
- Lățime față: ${latime.toFixed(2)}
- Înălțime față: ${inaltime.toFixed(2)}
- Raport față: ${raportFata.toFixed(2)}
- Distanță ochi: ${ochi.toFixed(2)}
- Lățime bărbie: ${barbie.toFixed(2)}
- Lățime nas: ${nas.toFixed(2)}
- Înălțime frunte: ${frunte.toFixed(2)}
- Lățime sprâncene: ${sprancene.toFixed(2)}

Recomandăm o ramă de ochelari care să țină cont de toate aceste trăsături, alegând modelul ideal în funcție de proporțiile generale ale feței, distanțele relevante și stilul exprimat. Astfel, pentru această combinație unică, se potrivesc cel mai bine ramele ... (aici GPT-ul va completa cu recomandarea coerentă, unitară și profesionistă).`;

    // Trimitem ca "recomandare" tot promptul (ca test)
    return res.status(200).json({ recomandare: recomandare.trim() });
  } catch (error) {
    console.error("Eroare la generare recomandare:", error);
    return res.status(500).json({ error: "Eroare internă la generare." });
  }
}

