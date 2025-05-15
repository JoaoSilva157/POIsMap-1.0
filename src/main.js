// --- POI Types ---
const poiTypes = [
  { key: 'tourism', value: 'attraction', label: 'Atração Turística', iconFile: 'Atração Turística.png' },
  { key: 'amenity', value: 'bank', label: 'Banco', iconFile: 'Banco.png' },
  { key: 'amenity', value: 'library', label: 'Biblioteca', iconFile: 'Biblioteca.png' },
  { key: 'amenity', value: 'cafe', label: 'Café', iconFile: 'Café.png' },
  { key: 'amenity', value: 'cinema', label: 'Cinema', iconFile: 'Cinema.png' },
  { key: 'amenity', value: 'clinic', label: 'Clínica', iconFile: 'Clínica.png' },
  { key: 'amenity', value: 'dentist', label: 'Dentista', iconFile: 'Dentista.png' },
  { key: 'amenity', value: 'school', label: 'Escola', iconFile: 'Escola.png' },
  { key: 'railway', value: 'station', label: 'Estação de Comboio', iconFile: 'Estação de Comboio.png' },
  { key: 'railway', value: 'subway_entrance', label: 'Metro', iconFile: 'Metro.png' },
  { key: 'amenity', value: 'pharmacy', label: 'Farmácia', iconFile: 'Fármacia.png' },
  { key: 'leisure', value: 'fitness_centre', label: 'Ginásio', iconFile: 'Ginásio.png' },
  { key: 'amenity', value: 'hospital', label: 'Hospital', iconFile: 'Hospital.png' },
  { key: 'amenity', value: 'kindergarten', label: 'Jardim de Infância', iconFile: 'Jardim de Infância.png' },
  { key: 'amenity', value: 'place_of_worship', label: 'Local de Culto', iconFile: 'Local de Culto.png' },
  { key: 'tourism', value: 'viewpoint', label: 'Miradouro', iconFile: 'Miradouro.png' },
  { key: 'tourism', value: 'museum', label: 'Museu', iconFile: 'Museu.png' },
  { key: 'highway', value: 'bus_stop', label: 'Paragem de Autocarro', iconFile: 'Paragem de Autocarro.png' },
  { key: 'amenity', value: 'parking', label: 'Estacionamento', iconFile: 'Parque de Estacionamento.png' },
  { key: 'leisure', value: 'playground', label: 'Parque Infantil', iconFile: 'Parque Infantil.png' },
  { key: 'leisure', value: 'park', label: 'Parque', iconFile: 'Parque.png' },
  { key: 'amenity', value: 'police', label: 'Polícia', iconFile: 'Polícia.png' },
  { key: 'amenity', value: 'fire_station', label: 'Bombeiros', iconFile: 'Bombeiros.png' },
  { key: 'amenity', value: 'restaurant', label: 'Restaurante', iconFile: 'Restaurante.png' },
  { key: 'shop', value: 'supermarket', label: 'Supermercado', iconFile: 'Supermercado.png' },
  { key: 'amenity', value: 'theatre', label: 'Teatro', iconFile: 'Teatro.png' },
  { key: 'amenity', value: 'ferry_terminal', label: 'Terminal Fluvial', iconFile: 'Terminal Fluvial.png' },
  { key: 'amenity', value: 'university', label: 'Universidade', iconFile: 'Universidades.png' },
  { key: 'amenity', value: 'veterinary', label: 'Veterinário', iconFile: 'Veterinário.png' },
];

// --- UI Elements ---
const header = document.createElement('div');
header.className = 'header';
header.innerHTML = `
  <input id="addressInput" type="text" placeholder="Digite o endereço..." style="width: 300px; padding: 8px; border-radius: 5px; border: 1px solid #EC6525;">
  <button id="searchBtn" style="background:#EC6525;color:#fff;border:none;padding:8px 16px;border-radius:5px;cursor:pointer;">Pesquisar</button>
  <label style="margin-left:20px;">Raio: <span id="radiusValue">1000</span>m</label>
  <input id="radiusSlider" type="range" min="1000" max="10000" step="500" value="1000" style="vertical-align:middle;">
  <select id="poiFilter" style="margin-left:20px;min-width:200px;max-width:400px;height:32px;vertical-align:middle;background:#EC6525;color:#f9f5f3;border-radius:5px;">
    <option value="" selected>Todos os tipos de POI</option>
    ${poiTypes.map((p, i) => `<option value="${i}">${p.label}</option>`).join('')}
  </select>
  <span style="font-size:14px; margin-left:8px;">(Filtrar tipo de POI)</span>
`;
document.body.insertBefore(header, document.body.firstChild);

const sidebar = document.createElement('div');
sidebar.id = 'poiSidebar';
sidebar.style = `
  position: absolute; top: 70px; left: 10px; z-index: 1001; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(236,101,37,0.10); 
  padding: 12px 16px; min-width: 220px; max-height: 70vh; overflow-y: auto; border: 2px solid #EC6525; color: #494343;
  font-size: 15px; display: none;
`;
sidebar.innerHTML = `<b>Nearby POIs</b><ul id="poiList" style="padding-left:18px;"></ul>`;
document.body.appendChild(sidebar);

// --- Map Initialization ---
const map = L.map('map').setView([38.7223, -9.1393], 12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CartoDB',
  subdomains: 'abcd',
  maxZoom: 19
}).addTo(map);

let fsboMarker = null;
let poiMarkers = [];
let currentLat = 38.7223;
let currentLon = -9.1393;
let currentRadius = 1000;
let lastAddress = '';

// --- Helper: SVG Icon Generator (Outlined) ---
function makeSvgIcon(svgPath) {
  return L.divIcon({
    className: '',
    html: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EC6525" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${svgPath}"/></svg>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
}

// --- Helper: Custom Icon Loader ---
function makeCustomIcon(filename) {
  return L.icon({
    iconUrl: `icons/${filename}`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28]
  });
}

// --- Geocode Address ---
function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Lisboa, Portugal')}`;
  return fetch(url)
    .then(res => res.json())
    .then(results => results.length ? results[0] : null);
}

// --- Fetch POIs (with filter) ---
function fetchPOIs(lat, lon, radius, filterIndex) {
  poiMarkers.forEach(m => map.removeLayer(m));
  poiMarkers = [];

  // Filter POI types
  let filteredTypes = poiTypes;
  if (filterIndex !== "") {
    filteredTypes = [poiTypes[parseInt(filterIndex)]];
  }

  let query = `[out:json][timeout:25];(`;
  filteredTypes.forEach(poi => {
    query += `node["${poi.key}"="${poi.value}"](around:${radius},${lat},${lon});`;
    query += `way["${poi.key}"="${poi.value}"](around:${radius},${lat},${lon});`;
    query += `relation["${poi.key}"="${poi.value}"](around:${radius},${lat},${lon});`;
  });
  query += `);out center;`;

  fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    body: query
  })
    .then(res => res.json())
    .then(data => {
      const poiList = document.getElementById('poiList');
      poiList.innerHTML = '';
      let count = 0;
      data.elements.forEach(element => {
        const elLat = element.lat || element.center?.lat;
        const elLon = element.lon || element.center?.lon;
        if (elLat && elLon) {
          const poi = filteredTypes.find(p =>
            element.tags && element.tags[p.key] === p.value
          );
          let icon;
          if (poi && poi.iconFile) {
            icon = makeCustomIcon(poi.iconFile);
          } else if (poi) {
            icon = makeSvgIcon(poi.icon);
          }
          const label = poi ? poi.label : 'POI';
          const name = element.tags && element.tags.name ? element.tags.name : '(Sem nome)';
          const marker = L.marker([elLat, elLon], { icon })
            .addTo(map)
            .bindPopup(`<b>${label}</b><br>${name}`);
          poiMarkers.push(marker);

          // Add to sidebar list
          const li = document.createElement('li');
          li.textContent = `${label}: ${name}`;
          li.style.cursor = 'pointer';
          li.onclick = () => {
            map.setView([elLat, elLon], 17);
            marker.openPopup();
          };
          poiList.appendChild(li);
          count++;
        }
      });
      // Show/hide sidebar
      document.getElementById('poiSidebar').style.display = count ? 'block' : 'none';
    });
}

// --- Search Handler (with filter) ---
function searchAndShow(address, radius, filterIndex) {
  geocodeAddress(address).then(result => {
    if (!result) {
      alert('Endereço não encontrado!');
      return;
    }
    currentLat = parseFloat(result.lat);
    currentLon = parseFloat(result.lon);
    map.setView([currentLat, currentLon], 15);

    if (fsboMarker) map.removeLayer(fsboMarker);
    fsboMarker = L.marker([currentLat, currentLon], {
      icon: makeSvgIcon('M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z')
    }).addTo(map).bindPopup('<b>Imóvel FSBO</b><br>' + address).openPopup();

    fetchPOIs(currentLat, currentLon, radius, filterIndex);
  });
}

// --- UI Events ---
document.getElementById('searchBtn').onclick = () => {
  const address = document.getElementById('addressInput').value;
  const filterIndex = document.getElementById('poiFilter').value;
  if (address) {
    lastAddress = address;
    searchAndShow(address, currentRadius, filterIndex);
  }
};
document.getElementById('radiusSlider').oninput = (e) => {
  currentRadius = e.target.value;
  document.getElementById('radiusValue').innerText = currentRadius;
  const filterIndex = document.getElementById('poiFilter').value;
  if (lastAddress) searchAndShow(lastAddress, currentRadius, filterIndex);
};
document.getElementById('poiFilter').onchange = () => {
  const filterIndex = document.getElementById('poiFilter').value;
  if (lastAddress) searchAndShow(lastAddress, currentRadius, filterIndex);
};