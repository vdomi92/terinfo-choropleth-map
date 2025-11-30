# Térinformatika 2026 - Magyarország megyéinek népsűrűsége

**📍 Interaktív choropleth térkép Leaflet-ben – Magyarország megyéi és megyeszékhelyei**

Ez a projekt egy interaktív webes térképi alkalmazás, amely Leaflet.js segítségével jeleníti meg Magyarország megyéit és megyeszékhelyeit.
A cél a népsűrűség vizuális összehasonlítása és az egyes térbeli egységek részletes adatainak megjelenítése.

**🗂 Felhasznált adatok**

Az alkalmazás a következő forrásokból származó adatokra épül:

Magyarország megyéi – poligonok (QGIS-ből exportált counties.geojson)
Települési szintű adatok – megyeszékhelyek és fővárosi kerületek (settlements.geojson)
Népesség, népsűrűség, terület – KSH adatok alapján összefésülve
A GeoJSON állományok kézzel előkészítettek, QGIS segítségével tisztítottak és kiegészítettek.

**🧭 Fő funkciók**

Kétféle téradat elem. Poligonok és pontok.
Külön kapcsolható rétegek és hozzájuk tartozó dinamikus jelmagyarázat.
Mindkét réteg népsűrűség alapű saját színskálával rendelkezik.

**🔶 Megyék (poligonok)**

Popup info:

<ul>
<li>Megye neve</li>
<li>Megyeszékhely</li>
<li>Terület (km²)</li>
<li>Népesség</li>
<li>Népsűrűség</li>
</ul>

**🔷 Megyeszékhelyek (pontok)**

Budapest kerületi adatok aggregálva külön Budapest markerbe

Popup info:

<ul>
<li>Terület (km²)</li>
<li>Népesség</li>
<li>Lakások száma</li>
<li>Népsűrűség</li>
</ul>

**🗺 Alaptérképek**

Kétféle választható alaptérkép.

<ul>
<li>OpenStreetMap</li>
<li>CartoDB Positron</li>
</ul>

**🛠 Technológiák**

<ul>
<li>Leaflet.js</li>
<li>QGIS az adatelőkészítéshez, GeoJSON generáláshoz</li>
<li>HTML + CSS + JavaScript</li>
</ul>
