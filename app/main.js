import { initGauge, renderTable,renderTrend } from './gauge_fertilities.js';
import { loadFertilityData } from './data.js';

async function start() {
    const data = await loadFertilityData();

    initGauge(data);
    renderTable(data);
    renderTrend(data);
}

start();