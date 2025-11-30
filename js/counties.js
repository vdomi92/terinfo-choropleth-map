const loadCounties = async (map, layerControl, overlayMaps) => {
  return fetch('data/counties.geojson')
    .then((response) => response.json())
    .then((geojsonData) => {
      const countiesLayer = L.geoJSON(geojsonData, {
        style: (feature) => {
          const density = feature.properties.nepsuruseg;
          return {
            color: '#555',
            weight: 1,
            fillColor: getDensityColor(density),
            fillOpacity: 0.6,
          };
        },

        onEachFeature: (feature, layer) => {
          const name = feature.properties.nev;
          const seat = feature.properties.szekhely;
          const area = feature.properties.terulet_km;
          const population = feature.properties.lakos_2018;
          const density = feature.properties.nepsuruseg;

          const nameText = seat ? `${name} megye` : name;
          const seatText = seat ? `<tr><td><b>Megyeszékhely:</b></td><td>${seat}</td></tr>` : '';

          layer.bindPopup(`
              <div style="font-family: sans-serif; font-size: 14px;">
                <h3 style="margin: 0 0 6px 0;">${nameText}</h3>
                <table style="border: collapse;">
                  ${seatText}
                  <tr><td><b>Terület:</b></td><td>${area} km²</td></tr>
                  <tr><td><b>Népesség:</b></td><td>${population} fő</td></tr>
                  <tr><td><b>Népsűrűség:</b></td><td>${density} fő/km²</td></tr>
                  <tr><td><b>Év:</b></td><td>2018</td></tr>
                </table>
              </div>
            `);
        },
      });

      countiesLayer.addTo(map);

      overlayMaps['Megyék'] = countiesLayer;
      layerControl.addOverlay(countiesLayer, 'Megyék');

      // Legend setup
      const countiesLegend = L.control({ position: 'bottomright' });

      countiesLegend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 50, 80, 120, 150, 180];
        div.innerHTML += '<h4>Népsűrűség<br>(fő/km²)</h4>';
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getDensityColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i + 1] ? '–' + grades[i + 1] + '<br>' : '+');
        }

        map.on('overlayadd', function (e) {
          if (e.name === 'Megyék') {
            countiesLegend.addTo(map);
          }
        });

        map.on('overlayremove', function (e) {
          if (e.name === 'Megyék') {
            countiesLegend.remove();
          }
        });

        return div;
      };

      countiesLegend.addTo(map);
    })
    .catch((err) => console.error('Error loading counties.geojson:', err));
};

const getDensityColor = (d) => {
  return d > 180 ? '#800026' : d > 150 ? '#BD0026' : d > 120 ? '#E31A1C' : d > 80 ? '#FC4E2A' : d > 50 ? '#FD8D3C' : '#FFEDA0';
};

export { loadCounties };
