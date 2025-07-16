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

    // Recomandare integrată finală
    let tipRama = "";

    if (raportFata < 0.85) {
      tipRama = "rame înalte, dreptunghiulare, cu margini ușor rotunjite și punte joasă";
    } else if (raportFata > 1.2) {
      tipRama = "rame înguste, cu margini drepte sau unghiulare, pentru echilibrarea lățimii";
    } else {
      tipRama = "rame ovale sau rectangulare, potrivite pentru proporții echilibrate";
    }

    if (nas < 30) {
      tipRama += ", cu punte îngustă";
    } else {
      tipRama += ", cu punte joasă sau transparentă";
    }

    if (ochi < 40) {
      tipRama += ", care creează impresia de ochi mai distanțați";
    }

    if (barbie < 80) {
      tipRama += ", cu colțuri rotunjite pentru a înmuia linia bărbiei";
    }

    if (frunte < 40) {
      tipRama += ", subțiri sau cat-eye pentru a ridica vizual fruntea";
    } else {
      tipRama += ", groase în partea superioară pentru echilibrarea frunții";
    }

    if (stil === "Elegant") {
      tipRama += ", realizate din metal sau acetat lucios, în culori neutre";
    } else if (stil === "Modern") {
      tipRama += ", cu design geometric sau transparent";
    } else if (stil === "Retro") {
      tipRama += ", groase, cu forme clasice retro";
    }

    const recomandare = `Pe baza trăsăturilor faciale și a stilului ales, recomandăm ${tipRama}.`;

    return res.status(200).json({ recomandare: recomandare.trim() });
  } catch (error) {
    console.error("Eroare la generare recomandare:", error);
    return res.status(500).json({ error: "Eroare internă la generare." });
  }
}

