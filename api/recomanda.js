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

    // Logica specializată de recomandare
    let recomandare = `Pentru o față ${forma}, genul ${gen} și stilul ${stil}, `;
    
    // Analiză pe baza raportului și componentelor
    if (raportFata > 1.2) {
      recomandare += `fața este foarte lată comparativ cu înălțimea, așa că se recomandă rame subțiri, cu margini drepte, pentru a echilibra proporțiile. `;
    } else if (raportFata < 0.85) {
      recomandare += `fața este mai lungă decât lată, deci se recomandă rame mai înalte vertical, eventual cu punte joasă, pentru a reduce impresia de alungire. `;
    } else {
      recomandare += `proporțiile sunt echilibrate, ceea ce permite o varietate de stiluri, însă se recomandă evitarea ramelor foarte groase. `;
    }

    // Analiză nas
    if (nas > 30) {
      recomandare += `Pentru un nas mai lat, se recomandă rame cu punte reglabilă sau transparentă. `;
    } else {
      recomandare += `Un nas îngust permite rame cu punte îngustă, fără compromis de confort. `;
    }

    // Analiză distanță ochi
    if (ochi < 40) {
      recomandare += `Distanța între ochi fiind mică, se recomandă rame cu punte mai subțire pentru a crea iluzia de spațiere. `;
    } else {
      recomandare += `Distanța mai mare între ochi permite rame cu punte decorativă sau pronunțată. `;
    }

    // Analiză barbie
    if (barbie < 80) {
      recomandare += `O mandibulă îngustă este completată frumos de rame rotunjite. `;
    } else {
      recomandare += `O mandibulă mai proeminentă se echilibrează cu rame pătrate sau dreptunghiulare. `;
    }

    // Analiză frunte
    if (frunte > 40) {
      recomandare += `O frunte înaltă merge bine cu rame groase în partea superioară. `;
    } else {
      recomandare += `O frunte joasă este avantajată de rame subțiri sau cat-eye. `;
    }

    // Stil preferat
    if (stil === "Elegant") {
      recomandare += `Stilul elegant poate fi exprimat prin rame metalice subțiri sau acetat lucios, în culori neutre. `;
    } else if (stil === "Modern") {
      recomandare += `Pentru un stil modern, rame geometrice sau transparente sunt o alegere inspirată. `;
    } else if (stil === "Retro") {
      recomandare += `Stilul retro se potrivește cu rame groase, cu forme clasice rotunde sau pătrate. `;
    }

    return res.status(200).json({ recomandare: recomandare.trim() });
  } catch (error) {
    console.error("Eroare la generare recomandare:", error);
    return res.status(500).json({ error: "Eroare internă la generare." });
  }
}

