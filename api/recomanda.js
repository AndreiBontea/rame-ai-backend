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

    const prompt = `Ești un optician profesionist. Primești următoarele măsurători faciale și preferințe ale unei persoane:

- Gen: ${gen}
- Stil: ${stil}
- Formă față: ${forma}
- Lățime față: ${latimeFata}
- Înălțime față: ${inaltimeFata}
- Raport lățime/înălțime: ${raport}
- Distanță între ochi: ${distOchi}
- Distanță interpupilară: ${interpupilara}
- Lățime mandibulă: ${latimeBarbie}
- Lățime nas: ${latimeNas}
- Înălțime frunte: ${inaltimeFrunte}
- Lățime sprâncene: ${latimeSprancene}

Pe baza acestor date combinate, oferă o recomandare unică, profesionistă, integrată și completă despre ce tip de rame de ochelari se potrivesc cel mai bine acestei persoane. Ia în calcul toate informațiile împreună și oferă o sugestie finală clară: formă rame, grosime, material, culoare, detalii de design. Evită să dai recomandări separate pentru fiecare trăsătură. Gândește ca un specialist în optică și personalizează sugestia ca și cum ai consilia direct clientul.`;

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    })
    .then((response) => response.json())
    .then((data) => {
      const content = data.choices?.[0]?.message?.content || "Nu s-a primit un răspuns valid.";
      return res.status(200).json({ recomandare: content.trim() });
    })
    .catch((error) => {
      console.error("Eroare la generare recomandare GPT:", error);
      return res.status(500).json({ error: "Eroare la comunicarea cu GPT." });
    });

  } catch (error) {
    console.error("Eroare internă:", error);
    return res.status(500).json({ error: "Eroare internă la generare." });
  }
}

