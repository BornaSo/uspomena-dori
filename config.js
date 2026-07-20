// config.js
// ===================================================================
// OVDJE UREĐUJETE SADRŽAJ STRANICE. Ne treba dirati druge datoteke.
// Nakon svake promjene, spremite datoteku i pošaljite (push) na GitHub
// — stranica će se sama ažurirati u roku od minute.
// ===================================================================

window.MEMORIAL = {

  // Ime i prezime
  name: "Dorijan Sobodić",

  // Datumi rođenja i smrti (upišite točno kako želite da piše)
  born: "11. prosinac 1999.",
  died: "3. rujan 2024.",

  // Stih / citat pri vrhu stranice (umjesto naslovne fotografije)
  // Upišite ga točno kako želite da piše — može imati više rečenica.
  quote: "Živjet ću na jednoj od zvijezda. Smijat ću se na njoj. I tako, bit će kao da se sve zvijezde na nebu smiju, kada pogledaš noću u nebo. I samo ti ćeš imati zvijezde koje se smiju.",

  // Portret (okrugla slika) — stavite datoteku u folder "photos"
  portrait: "photos/portrait.jpg",

  // Pozadinska glazba — stavite mp3 datoteku u folder "music" (opcionalno, može ostati "")
  music: "music/song.mp3",

  // Fotografije — dodajte koliko god želite, svaku u navodnicima, odvojenu zarezom
  photos: [
    "photos/photo9.jpg",
    "photos/photo3.jpg",
    "photos/photo4.jpg",
    "photos/photo1.jpg",
    "photos/photo6.jpg",
    "photos/photo8.jpg",
    "photos/photo5.jpg",
    "photos/photo7.jpg",
    "photos/photo10.jpg",
    "photos/photo11.jpg",
    "photos/photo12.jpg",
    "photos/photo13.jpg",
    "photos/photo14.jpg",
    "photos/photo15.jpg",
    "photos/photo16.jpg",
    "photos/photo17.jpg",
    // "photos/photo3.jpg",
  ],

  // Videozapisi — dvije mogućnosti:
  //  1) YouTube video:  { type: "youtube", id: "ID_VIDEA", caption: "Opis (opcionalno)" }
  //     ID_VIDEA je dio iz linka nakon "v=", npr. za youtube.com/watch?v=dQw4w9WgXcQ to je dQw4w9WgXcQ
  //  2) Vlastita video datoteka: { type: "file", src: "videos/naziv.mp4", caption: "Opis (opcionalno)" }
  videos: [
    // { type: "youtube", id: "dQw4w9WgXcQ", caption: "Obiteljsko slavlje, 2019." },
    // { type: "file", src: "videos/video1.mp4", caption: "Rođendan, 2015." },
  ],

};
