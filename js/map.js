const initMap = () => {
  // 1) Térkép létrehozása, középpont kb. Magyarország közepe
  const map = L.map('map').setView([47.1, 19.5], 7);

  // 2) OpenStreetMap alapréteg
  const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap',
  });

  // 3) CartoDB Positron (világos, letisztult)
  const carto = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap &copy; CartoDB',
  });

  // Alapértelmezett réteg: OSM
  osm.addTo(map);

  // 4) Rétegváltó kontroll (layer control)
  const baseMaps = {
    OpenStreetMap: osm,
    'CartoDB Positron': carto,
  };

  const overlayMaps = {}; // ide kerülnek a megyék, települések, stb.

  const layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

  // visszaadjuk, hogy a többi modul használhassa
  return {
    map,
    baseMaps,
    overlayMaps,
    layerControl,
  };
};

export { initMap };
