import { OpenAI } from "openai";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://rame-ai-frontend.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const openai = new OpenAI({
    apiKey: "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" // temporar
  });

  try {
    const { gen, stil, formaFata, masuratori } = req.body;

    const prompt = `
Analizează următoarele trăsături faciale și oferă o singură recomandare clară, unitară și profesionistă privind tipul ideal de ramă de ochelari:

- Gen: ${gen}
- Stil preferat: ${stil}
- Forma feței: ${formaFata}
- Lățime față: ${masuratori.latimeFata}
- Înălțime față: ${masuratori.inaltimeFata}
- Raport față: ${masuratori.raport}
- Distanță ochi: ${masuratori.distOchi}
- Lățime bărbie: ${masuratori.latimeBarbie}
- Lățime nas: ${masuratori.latimeNas}
- Înălțime frunte: ${masuratori.inaltimeFrunte}
- Lățime sprâncene: ${masuratori.latimeSprancene}

Nu da răspunsuri separate pentru fiecare trăsătură. Nu repeta inputul. Răspunsul trebuie să sune ca și cum ar fi oferit de un consultant profesionist în optică, luând în calcul toate detaliile de mai sus ca un tot unitar.
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4"
    });

    res.status(200).json({ recomandare: completion.choices[0].message.content });
  } catch (error) {
    console.error("Eroare la generare:", error);
    res.status(500).json({ error: "Eroare la generarea recomandării." });
  }
}
