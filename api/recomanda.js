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

    // Prompt coerent, holistic
const prompt = `
Pe baza următoarelor trăsături faciale:
- Gen: ${gen}
- Stil preferat: ${stil}
- Forma feței: ${forma}
- Lățime față: ${latime}
- Înălțime față: ${inaltime}
- Raport față: ${raportFata}
- Distanță între ochi: ${ochi}
- Lățime bărbie: ${barbie}
- Lățime nas: ${nas}
- Înălțime frunte: ${frunte}
- Lățime sprâncene: ${sprancene}

Imaginează-ți că ești un specialist în optică. Ținând cont de toate aceste trăsături, oferă o singură recomandare profesionistă și coerentă pentru un model concret de rame de ochelari (formă, grosime, culoare, material, tip punte, eventual branduri dacă sunt relevante). Nu descrie fiecare trăsătură individual, ci integrează totul într-o recomandare finală personalizată. Răspunsul trebuie să sune ca și cum ar fi spus de un optician profesionist clientului său.
`;

return res.status(200).json({ recomandare: prompt.trim() });

    // Forma feței
    if (forma === "Rotundă") {
      recomandare += `✔️ Fața rotundă beneficiază de rame dreptunghiulare sau pătrate, care alungesc vizual fața. Modelele cu colțuri bine definite, în culori închise (ex. negru sau bleumarin), ajută la contur. `;
    } else if (forma === "Alungită") {
      recomandare += `✔️ Pentru fața alungită, sunt potrivite ramele mai înalte, de exemplu cele ovale sau tip „wayfarer”, cu brațe late pentru a da volum lateral. Se recomandă rame din acetat sau combinat metal-acetat. `;
    } else if (forma === "Ovală") {
      recomandare += `✔️ Fața ovală permite o varietate mare de rame. Cele rectangulare, aviator sau cat-eye se potrivesc bine. Se poate merge pe culori deschise sau rame transparente pentru un look modern. `;
    }

    // Raport față
    if (raportFata < 0.85) {
      recomandare += `\n🔍 Raportul dintre lățime și înălțime indică o față mai lungă – evită ramele înguste și preferă modele mai înalte pe verticală, eventual cu punte joasă. `;
    } else if (raportFata > 1.2) {
      recomandare += `\n🔍 Fața este mai lată decât înaltă – evită ramele groase orizontal și preferă modele fine, subțiri, care nu accentuează lățimea. `;
    }

    // Distanța între ochi
    if (ochi < 0.13) {
      recomandare += `\n👁️ Distanța mică între ochi recomandă rame cu punte îngustă, metalică sau invizibilă pentru a crea impresia de ochi mai depărtați. `;
    } else if (ochi > 0.17) {
      recomandare += `\n👁️ Distanța mare între ochi permite rame cu punte decorativă sau contrastantă pentru echilibru vizual. `;
    }

    // Lățimea nasului
    if (nas < 0.035) {
      recomandare += `\n👃 Nas îngust – recomandăm rame cu punte fixă, joasă, pentru confort și susținere corectă. `;
    } else {
      recomandare += `\n👃 Nas lat – rame cu punte reglabilă, silicon sau inserții flexibile pentru a evita presiunea. `;
    }

    // Lățime bărbie
    if (barbie < 0.28) {
      recomandare += `\n👄 Bărbie îngustă – se potrivesc ramele rotunjite sau cat-eye, care adaugă echilibru estetic. `;
    } else {
      recomandare += `\n👄 Bărbie pronunțată – ramele pătrate, mai late în partea superioară ajută la echilibrarea trăsăturilor. `;
    }

    // Frunte
    if (frunte > 0.06) {
      recomandare += `\n🧠 Frunte înaltă – ramele groase în partea superioară sau model browline creează proporții mai echilibrate. `;
    } else {
      recomandare += `\n🧠 Frunte joasă – rame subțiri, cu punte ridicată sau lentile ușor cat-eye sunt ideale. `;
    }

    // Stil preferat
    if (stil === "Elegant") {
      recomandare += `\n✨ Pentru un stil elegant, se potrivesc ramele metalice subțiri, aurii, argintii sau în nuanțe champagne. Modelele clasice, fine, fără decor, oferă rafinament.`;
    } else if (stil === "Modern") {
      recomandare += `\n✨ Stilul modern merge excelent cu rame transparente, geometrii neobișnuite (hexagonale, ovale late), sau culori îndrăznețe ca turcoaz sau bordo mat.`;
    } else if (stil === "Retro") {
      recomandare += `\n✨ Pentru un look retro, recomandăm rame groase din acetat, în culori vintage (tortoise, havana, brun închis) și forme rotunde sau pătrate mari.`;
    }

    // Gen
    if (gen === "feminin") {
      recomandare += `\n🌸 Pentru genul feminin, se pot adăuga accente fine: rame în degrade, rose-gold sau cu texturi subtile.`;
    } else if (gen === "masculin") {
      recomandare += `\n🕶️ Pentru genul masculin, ramele cu linie dreaptă, solide, în culori neutre (negru, gri, navy) oferă un aspect sobru și profesionist.`;
    }

    return res.status(200).json({ recomandare: recomandare.trim() });
  } catch (error) {
    console.error("Eroare la generare recomandare:", error);
    return res.status(500).json({ error: "Eroare internă la generare." });
  }
}
