export function initGauge(data) {

    fetch('img/gauge_fertilities.svg')
        .then(res => res.text())
        .then(svg => {
            document.getElementById('svg-gauge-fertilites').innerHTML = svg;

            setupGauge(data);
        })
        .catch(() => {
            document.getElementById('svg-gauge-fertilites').innerHTML ='<p>Wskaźnik nie został załadowany</p>';
        });
};

export function setupGauge(data){

    let fertilityRate = data[0].value;
    const replacementLevel = 2.1;
    const max = 3.5;
    
    const fertilitesRoot = document.querySelector('#fertilites')
    const svgRoot = fertilitesRoot.querySelector('#svg-gauge-fertilites');
    const needle = svgRoot.querySelector('.needle');
    const valueText = svgRoot.querySelector('#valueText');
    const statusText = svgRoot.querySelector('#statusText');
    const summaryText = fertilitesRoot.querySelector('.summary');

    updateGauge(fertilityRate);

    function updateGauge(rate) {
        const angle = (rate / max) * 180 - 90;
      
        needle.style.transform = `rotate(${angle}deg)`;
        valueText.textContent = rate.toFixed(2);
      
        if (rate < 1.5) {
          statusText.textContent = "💀";
          summaryText.textContent = "Podsumowanie: liczba ludności będzie spadać";
        } else if (rate < replacementLevel) {
          statusText.textContent = "⚠️";
          summaryText .textContent = "Podsumowanie: społeczeństwo się starzeje";
        } else {
          statusText.textContent = "🌱";
          summaryText.textContent = "Podsumowanie: populacja stabilna lub rosnąca";
        }
    }
};

export function renderTable(data) {
  const container = document.getElementById('fertility-table');

  const rows = data
    .map(d => `<tr><td>${d.year}</td><td>${d.value.toFixed(2)}</td></tr>`)
    .join('');

  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Rok</th>
          <th>Dzietność</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

export function renderTrend(data) {
    const trendEl = document.getElementById('fertility-trendText');

    const sorted = [...data].sort((a, b) => a.year - b.year);

    const first = sorted[0].value;
    const last = sorted[sorted.length - 1].value;

    const diff = last - first;

    let text = '';
    trendEl.className = '';
    if (diff > 0.05) {
        text = '📈 Trend wzrostowy';
        trendEl.classList.add('trend-up');
    } else if (diff < -0.05) {
        text = '📉 Trend spadkowy';
        trendEl.classList.add('trend-down');
    } else {
        text = '➡️ Trend stabilny';
        trendEl.classList.add('trend-flat');
    }

    trendEl.textContent = text;
}