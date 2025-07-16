export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const { gen, stil, forma } = req.body;

    if (!gen || !stil || !forma) {
      return res.status(400).json({ error: "Lipsesc datele necesare" });
    }

    // Exemplu simplu de logică
    const recomandare = `Pentru o față ${forma}, genul ${gen} și stilul ${stil}, recomandăm rame subțiri, ușor ovale.`;

    res.status(200).json({ recomandare });
  } catch (error) {
    console.error("Eroare la generare recomandare:", error);
    res.status(500).json({ error: "Eroare internă la generare." });
  }
}
