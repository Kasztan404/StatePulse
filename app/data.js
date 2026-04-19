export async function loadFertilityData() {
  const res = await fetch('data/fertility.json');
  const data = await res.json();

  const sorted = data.fertility.sort((a, b) => b.year - a.year);

  const latest3 = sorted.slice(0, 3);

  return latest3;
}