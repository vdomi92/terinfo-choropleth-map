const loadSettlements = async (map, layerControl, overlayMaps) => {
  return fetch('/src/data/settlements.geojson')
    .then((response) => response.json())
    .then((geojsonData) => {
      const features = geojsonData.features;

      // Point features
      const countySeatFeatures = features.filter((feature) => {
        const status = feature.properties.jogallas.toLowerCase();
        return status.startsWith('megyeszékhely');
      });

      // Aggregate capital district points
      const budapestDistricts = features.filter((feature) => {
        const status = feature.properties.jogallas.toLowerCase();
        return status.startsWith('fővárosi kerület');
      });

      let bpAreaHa = 0;
      let bpPopulation = 0;
      let bpFlats = 0;
      const bpCoords = [];

      budapestDistricts.forEach((feature) => {
        const p = feature.properties;

        bpAreaHa += p.terulet_ha_2018;
        bpPopulation += p.nepesseg_2018;
        bpFlats += p.lakasok_2018;

        const geom = feature.geometry;
        if (geom && geom.type === 'MultiPoint') {
          geom.coordinates.forEach(([lon, lat]) => {
            bpCoords.push([lat, lon]);
          });
        }
      });

      const bpAreaKm2 = bpAreaHa * 0.01;
      const bpDensity = bpPopulation / bpAreaKm2;

      let bpCenter = [];
      const sum = bpCoords.reduce(
        (acc, [lat, lon]) => {
          acc.lat += lat;
          acc.lon += lon;
          return acc;
        },
        { lat: 0, lon: 0 }
      );
      bpCenter = [sum.lat / bpCoords.length, sum.lon / bpCoords.length];

      // Seats layer
      const countySeatsLayer = L.geoJSON(countySeatFeatures, {
        pointToLayer: (feature, latlng) => {
          const density = feature.properties.nepsuruseg_2018;

          return L.circleMarker(latlng, {
            radius: 7,
            color: '#001b3a',
            weight: 2,
            fillColor: getSeatColor(density),
            fillOpacity: 1,
          });
        },

        onEachFeature: (feature, layer) => {
          const name = feature.properties.nev;
          const areaKm = feature.properties.terulet_ha_2018 * 0.01;
          const population = feature.properties.nepesseg_2018;
          const density = feature.properties.nepsuruseg_2018;
          const flats = feature.properties.lakasok_2018;

          const popupHtml = `
              <div style="font-family: sans-serif; font-size: 13px;">
                <h3 style="margin: 0 0 6px 0;">${name}</h3>
                <table style="border-collapse: collapse;">
                  <tr><td><b>Terület:</b></td><td>${areaKm.toFixed(2)} km²</td></tr>
                  <tr><td><b>Népesség:</b></td><td>${population} fő</td></tr>
                  <tr><td><b>Lakások:</b></td><td>${flats} db</td></tr>
                  <tr><td><b>Népsűrűség:</b></td><td>${density} fő/km²</td></tr>
                  
                </table>
              </div>
            `;

          layer.bindPopup(popupHtml);
        },
      });

      // Capital marker
      const budapestMarker = L.circleMarker(bpCenter, {
        radius: 8,
        color: '#001b3a',
        weight: 2,
        fillColor: getSeatColor(bpDensity),
        fillOpacity: 1,
      }).bindPopup(`
          <div style="font-family: sans-serif; font-size: 13px;">
            <h3 style="margin: 0 0 6px 0;">Budapest</h3>
            <table style="border-collapse: collapse;">
              <tr><td><b>Terület:</b></td><td>${bpAreaKm2} km²</td></tr>
              <tr><td><b>Népesség:</b></td><td>${bpPopulation} fő</td></tr>
              <tr><td><b>Lakások:</b></td><td>${bpFlats} db</td></tr>
              <tr><td><b>Népsűrűség:</b></td><td>${bpDensity.toFixed(2)} fő/km²</td></tr>
            </table>
          </div>
        `);

      // Merging two layers
      const countySeatsWithBp = L.layerGroup([countySeatsLayer, budapestMarker]);

      countySeatsWithBp.addTo(map);
      overlayMaps['Megyeszékhelyek'] = countySeatsWithBp;
      layerControl.addOverlay(countySeatsWithBp, 'Megyeszékhelyek');

      // Legend setup
      const cityLegend = L.control({ position: 'bottomright' });

      cityLegend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 80, 150, 250, 400, 600, 800];

        div.innerHTML += '<h4>Városok<br>népsűrűsége<br>(fő/km²)</h4>';

        for (let i = 0; i < grades.length; i++) {
          const from = grades[i];
          const to = grades[i + 1];

          div.innerHTML += '<i style="background:' + getSeatColor(from + 1) + '"></i> ' + from + (to ? '–' + to + '<br>' : '+');
        }

        map.on('overlayadd', function (e) {
          if (e.name === 'Megyeszékhelyek') {
            cityLegend.addTo(map);
          }
        });

        map.on('overlayremove', function (e) {
          if (e.name === 'Megyeszékhelyek') {
            cityLegend.remove();
          }
        });

        return div;
      };

      cityLegend.addTo(map);
    })
    .catch((err) => console.error('Error loading settlements.geojson:', err));
};

const getSeatColor = (d) => {
  return d > 800 ? '#08306b' : d > 600 ? '#08519c' : d > 400 ? '#2171b5' : d > 250 ? '#4292c6' : d > 150 ? '#6baed6' : d > 80 ? '#9ecae1' : '#c6dbef';
};

export { loadSettlements };
