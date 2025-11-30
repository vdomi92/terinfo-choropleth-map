import { initMap } from './js/map.js';
import { loadCounties } from './js/counties.js';
import { loadSettlements } from './js/settlements.js';

document.addEventListener('DOMContentLoaded', async () => {
  const { map, layerControl, overlayMaps } = initMap();

  await loadCounties(map, layerControl, overlayMaps);
  await loadSettlements(map, layerControl, overlayMaps);
});
