export function initGauge() {

    fetch('img/gauge_fertilities.svg')
        .then(res => res.text())
        .then(svg => {
            document.getElementById('svg-gauge-fertilites').innerHTML = svg;

            setupGauge();
        })
        .catch(() => {
            document.getElementById('svg-gauge-fertilites').innerHTML ='<p>Wskaźnik nie został załadowany</p>';
        });
};

export function setupGauge(){

    let fertilityRate = 1.1;
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