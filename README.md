# Térinformatika 2026 - Magyarország megyéinek népsűrűsége

📍 Interaktív choropleth térkép Leaflet-ben – Magyarország megyéi és megyeszékhelyei

Ez a projekt egy interaktív webes térképi alkalmazás, amely Leaflet.js segítségével jeleníti meg Magyarország megyéit és megyeszékhelyeit.
A cél a népsűrűség vizuális összehasonlítása és az egyes térbeli egységek részletes adatainak megjelenítése.

A térkép támogatja:

Choropleth megjelenítés – a megyék színezése népsűrűség szerint

Megyeszékhelyek pontszerű jelölése – kékes átmenettel, népsűrűség alapján

Külön-külön kapcsolható rétegek (megyék, települések/megyeszékhelyek)

Rétegekhez kötött dinamikus jelmagyarázat

Részletes popup információk minden megyére és megyeszékhelyre

Több választható alaptérkép (OpenStreetMap, CartoDB Positron)

🗂 Felhasznált adatok

Az alkalmazás a következő forrásokból származó adatokra épül:

Magyarország megyéi – poligonok (QGIS-ből exportált counties.geojson)

Települési szintű adatok – megyeszékhelyek és fővárosi kerületek (settlements.geojson)

Népesség, népsűrűség, terület – KSH adatok alapján összefésülve

A GeoJSON állományok kézzel előkészítettek, QGIS segítségével tisztítottak és kiegészítettek.

🧭 Fő funkciók
🔶 Megyék (choropleth)

Poligonok népsűrűség-alapú színskálával

Popup:

Megye neve

Megyeszékhely

Terület (km²)

Népesség

Népsűrűség

Külön jelmagyarázat (legend), ami csak akkor jelenik meg, ha a réteg be van kapcsolva

🔷 Megyeszékhelyek (pontok)

Kék színskála népsűrűség szerint

Budapest kerületi adatok aggregálva külön markerbe

Popup:

Terület

Népesség

Lakások száma

Népsűrűség

Külön kapcsolható réteg + külön legenda

🗺 Alaptérképek

OpenStreetMap

CartoDB Positron (világos, letisztult)

🛠 Technológiák

Leaflet.js

GeoJSON

JavaScript modules (ES6 import/export)

QGIS az adatelőkészítéshez

HTML5 + CSS3
