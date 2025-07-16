import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const {
    gen,
    stil,
    distOchi,
    latimeFata,
    inaltimeFata,
    latimeBarbie,
    raport,
    interpupilara,
    latimeNas,
    inaltimeFrunte,
    latimeSprancene,
  } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Ești un consultant profesionist în alegerea ramelor de ochelari, expert în interpretarea trăsăturilor faciale și proporțiilor. Răspunsurile tale trebuie să fie clare, personalizate și profesioniste, adaptate fiecărui client.",
        },
        {
          role: "user",
          content: `Clientul are următorul profil:
- Gen: ${gen}
- Stil preferat: ${stil}
- Formă față: ${raport}
- Lățime față: ${latimeFata}
- Înălțime față: ${inaltimeFata}
- Lățime bărbie: ${latimeBarbie}
- Lățime sprâncene: ${latimeSprancene}
- Lățime nas: ${latimeNas}
- Înălțime frunte: ${inaltimeFrunte}
- Distanță între ochi: ${distOchi}
- Distanță interpupilară: ${interpupilara}
Vreau o recomandare clară și motivată pentru tipul de ramă potrivit.`,
        },
      ],
    });

    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ recommendation: reply });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ message: "Eroare la generarea recomandării." });
  }
}
