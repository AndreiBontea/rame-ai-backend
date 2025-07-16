import OpenAI from "openai"; // dacă ești în Vercel edge sau Next.js API

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // setează cheia în .env
});

export default async function handler(req, res) {
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

    const prompt = `
Pe baza următoarelor trăsături faciale:
- Gen: ${gen}
- Stil preferat: ${stil}
- Forma feței: ${forma}
- Lățime față: ${latime.toFixed(2)}
- Înălțime față: ${inaltime.toFixed(2)}
- Raport față: ${raportFata.toFixed(2)}
- Distanță între ochi: ${ochi.toFixed(2)}
- Lățime bărbie: ${barbie.toFixed(2)}
- Lățime nas: ${nas.toFixed(2)}
- Înălțime frunte: ${frunte.toFixed(2)}
- Lățime sprâncene: ${sprancene.toFixed(2)}

Imaginează-ți că ești un specialist în optică. Ținând cont de toate aceste trăsături, oferă o singură recomandare profesionistă și coerentă pentru un model concret de rame de ochelari (formă, grosime, culoare, material, tip punte, eventual branduri dacă sunt relevante). Nu descrie fiecare trăsătură individual, ci integrează totul într-o recomandare finală personalizată. Răspunsul trebuie să sune ca și cum ar fi spus de un optician profesionist clientului său.
    `;

    // 🔥 Apelează modelul GPT (poți folosi și alt API dacă ai)
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9
    });

    const rezultat = completion.choices[0].message.content;

    return res.status(200).json({ recomandare: rezultat.trim() });
  } catch (error) {
    console.error("Eroare la generare recomandare:", error);
    return res.status(500).json({ error: "Eroare internă la generare." });
  }
}
