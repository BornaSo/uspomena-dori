# Spomen stranica — upute

Ovo je gotova web stranica koju možete besplatno postaviti na internet putem
GitHub Pages i povezati s QR kodom na nadgrobnom spomeniku.

## 1. Uređivanje sadržaja

- **Ime, datumi, biografija, popis fotografija/videa** → sve se uređuje u datoteci `config.js`.
  Otvorite je u bilo kojem uređivaču teksta (čak i na GitHubu, klikom na olovčicu ✏️).
- **Fotografije** → stavite `.jpg` ili `.png` datoteke u folder `photos/`, a zatim
  dodajte naziv datoteke u popis `photos:` unutar `config.js`.
- **Naslovni stih** → tekst pri vrhu stranice mijenja se u `config.js`, pod `quote:`.
- **Portret** → zamijenite `photos/portrait.jpg` svojom slikom (može i drugi naziv, samo ga upišite u `config.js`).
- **Glazba** → stavite `.mp3` datoteku u folder `music/` i upišite putanju u `music:`
  (npr. `music/song.mp3`). Ako ne želite glazbu, ostavite `music: ""`.
- **Videozapisi** → najlakše je koristiti YouTube (privatan/neizlistan video je u redu),
  upišite samo ID videa. Upute su kao komentar u `config.js`.

Napomena: stranica je **statična** (nema bazu podataka), pa se sadržaj mijenja
uređivanjem ovih datoteka, a ne kroz gumbe na samoj stranici. To znači da
posjetitelji stranice ne mogu ništa brisati ni mijenjati — samo vi, preko GitHuba.

## 2. Postavljanje na GitHub Pages (besplatno hostanje)

1. Napravite besplatan GitHub račun na github.com (ako ga već nemate).
2. Kliknite **New repository**, dajte mu naziv (npr. `uspomena-maier`), postavite ga
   kao **Public**, i kreirajte ga.
3. U repozitoriju kliknite **Add file → Upload files** i prevucite sve datoteke
   i foldere iz ovog paketa (`index.html`, `style.css`, `script.js`, `config.js`,
   folder `photos/`, `videos/`, `music/`).
4. Kliknite **Commit changes**.
5. Idite na **Settings → Pages** (u lijevom izborniku).
6. Pod "Branch" odaberite `main` i folder `/ (root)`, pa **Save**.
7. Za minutu-dvije stranica će biti dostupna na adresi oblika:
   `https://vaše-korisničko-ime.github.io/uspomena-maier/`
   (GitHub će vam prikazati točnu adresu na istoj Settings → Pages stranici).

Svaki put kad nešto promijenite i pošaljete (commit) na GitHub, stranica se
automatski ažurira na toj istoj adresi.

## 3. QR kod za nadgrobni spomenik

Kad imate konačnu adresu stranice (iz koraka 2.7), generirajte QR kod:

- Otvorite besplatan generator, npr. **https://www.qr-code-generator.com** ili
  **https://qrcode-monkey.com**, unesite adresu stranice i preuzmite sliku QR koda.
- Za trajnu upotrebu na kamenu, birajte veći format (min. 300×300 px) i, ako je
  moguće, verziju s otpornom, matiranom pločicom ili graviranjem — QR kodovi na
  glatkom sjajnom kamenu na suncu ponekad se teže skeniraju.
- Slobodno se javite sa svojom pravom GitHub Pages adresom — mogu vam ovdje
  odmah generirati sliku QR koda za ispis.

## 4. Testiranje prije objave

Prije nego postavite kod na GitHub, možete otvoriti `index.html` dvoklikom
izravno u pregledniku na svom računalu da provjerite kako stranica izgleda
(glazba i tabovi rade i lokalno).
