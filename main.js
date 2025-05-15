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
const translations = {
  pt: {
    search: "Pesquisar",
    radius: "Raio",
    allTypes: "Todos os tipos de POI",
    filter: "(Filtrar tipo de POI)",
    loading: "A carregar...",
    error: "Falha ao carregar POIs. Por favor tente novamente.",
    export: "Exportar PDF",
    sidebarTitle: "POIs Próximos",
    showPois: "Mostrar POIs",
    addressPlaceholder: "Digite o endereço...",
    noPois: "Nenhum POI encontrado.",
    addressNotFound: "Endereço não encontrado!"
  },
  en: {
    search: "Search",
    radius: "Radius",
    allTypes: "All POI types",
    filter: "(Filter POI type)",
    loading: "Loading...",
    error: "Failed to load POIs. Please try again.",
    export: "Export PDF",
    sidebarTitle: "Nearby POIs",
    showPois: "Show POIs",
    addressPlaceholder: "Enter address...",
    noPois: "No POIs found.",
    addressNotFound: "Address not found!"
  }
};
let currentLang = "pt";

// --- DOM Elements ---
const sidebar = document.getElementById('poiSidebar');
const openSidebarBtn = document.getElementById('openSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const poiList = document.getElementById('poiList');
const addressInput = document.getElementById('addressInput');
const searchBtn = document.getElementById('searchBtn');
const radiusSlider = document.getElementById('radiusSlider');
const radiusValue = document.getElementById('radiusValue');
const poiFilter = document.getElementById('poiFilter');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const langSwitcher = document.getElementById('langSwitcher');
const loadingDiv = document.getElementById('loadingIndicator');
const errorDiv = document.getElementById('errorIndicator');

// --- Sidebar Logic ---
closeSidebarBtn.onclick = () => {
  sidebar.classList.remove('open');
  openSidebarBtn.style.display = 'block';
};
openSidebarBtn.onclick = () => {
  sidebar.classList.add('open');
  openSidebarBtn.style.display = 'none';
};

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

// --- Helper: Custom Icon Loader ---
function makeCustomIcon(label) {
  let iconUrl = (typeof poiIconBase64 !== "undefined" && poiIconBase64[label]) ? poiIconBase64[label] : null;
  // Fallback: use a default SVG icon in your theme color
  if (!iconUrl) {
    iconUrl = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="%23EC6525" stroke="white" stroke-width="3"/></svg>';
  }
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
}

function makeFsboIcon() {
  return L.icon({
    iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="%23EC6525" stroke="white" stroke-width="3"/><text x="16" y="22" font-size="16" text-anchor="middle" fill="white" font-family="Arial" font-weight="bold">🏠</text></svg>',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
}

// --- Geocode Address ---
async function geocodeAddress(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address + ', Lisboa, Portugal')}`;
  const resp = await fetch(url, { headers: { 'Accept-Language': currentLang } });
  const data = await resp.json();
  if (data.length === 0) throw new Error(translations[currentLang].addressNotFound);
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

// --- Fetch POIs (with filter) ---
async function fetchPOIs(lat, lon, radius, filterIndex) {
  let filters = [];
  if (filterIndex !== "" && filterIndex !== null) {
    const t = poiTypes[filterIndex];
    filters.push(`node["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
    filters.push(`way["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
    filters.push(`relation["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
  } else {
    for (const t of poiTypes) {
      filters.push(`node["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
    }
  }
  const query = `[out:json][timeout:25];(${filters.join('')});out center;`;
  const url = "https://overpass-api.de/api/interpreter";
  const resp = await fetch(url, { method: "POST", body: query });
  const data = await resp.json();
  return data.elements;
}

// --- Render POIs on Map and Sidebar ---
function renderPOIs(pois) {
  // Remove old markers
  poiMarkers.forEach(m => map.removeLayer(m));
  poiMarkers = [];
  poiList.innerHTML = "";

  if (!pois.length) {
    poiList.innerHTML = `<li>${translations[currentLang].noPois}</li>`;
    return;
  }

  pois.forEach(poi => {
    // Find type
    const type = poiTypes.find(t => (poi.tags && (poi.tags[t.key] === t.value)));
    const label = type ? type.label : "POI";
    const icon = type ? makeCustomIcon(label) : undefined;
    const name = poi.tags && (poi.tags.name || label);

    // Marker
    const marker = L.marker([poi.lat || poi.center.lat, poi.lon || poi.center.lon], { icon });
    marker.bindPopup(`<b>${name}</b><br>${label}`);
    marker.addTo(map);
    poiMarkers.push(marker);

    // Sidebar
    const li = document.createElement('li');
    li.innerHTML = `<img src="${icon.options.iconUrl}" style="width:24px;height:24px;vertical-align:middle;margin-right:8px;">${name}`;
    li.style.cursor = "pointer";
    li.onclick = () => {
      map.setView([poi.lat || poi.center.lat, poi.lon || poi.center.lon], 16);
      marker.openPopup();
    };
    poiList.appendChild(li);
  });
}

// --- Search Handler (with filter) ---
async function searchAndShow(address, radius, filterIndex) {
  loadingDiv.style.display = "block";
  errorDiv.style.display = "none";
  try {
    const { lat, lon } = await geocodeAddress(address);
    currentLat = lat;
    currentLon = lon;
    currentRadius = radius;
    map.setView([lat, lon], 15);

    // FSBO marker (main address)
    if (fsboMarker) map.removeLayer(fsboMarker);
    fsboMarker = L.marker([lat, lon], { icon: makeFsboIcon() }).addTo(map);

    // Fetch POIs
    const pois = await fetchPOIs(lat, lon, radius, filterIndex);
    renderPOIs(pois);

    sidebar.classList.add('open');
    openSidebarBtn.style.display = 'none';
  } catch (err) {
    errorDiv.textContent = err.message || translations[currentLang].error;
    errorDiv.style.display = "block";
  } finally {
    loadingDiv.style.display = "none";
  }
}

// --- UI Events ---
searchBtn.onclick = () => {
  searchAndShow(addressInput.value, parseInt(radiusSlider.value), poiFilter.value);
};
radiusSlider.oninput = (e) => {
  radiusValue.textContent = e.target.value;
};
poiFilter.onchange = () => {
  searchAndShow(addressInput.value, parseInt(radiusSlider.value), poiFilter.value);
};
langSwitcher.onchange = (e) => {
  currentLang = e.target.value;
  updateLanguageUI();
};
function updateLanguageUI() {
  searchBtn.textContent = translations[currentLang].search;
  document.getElementById('radiusLabel').childNodes[0].nodeValue = translations[currentLang].radius + ": ";
  document.getElementById('filterLabel').textContent = translations[currentLang].filter;
  exportPdfBtn.textContent = translations[currentLang].export;
  addressInput.placeholder = translations[currentLang].addressPlaceholder;
  sidebar.querySelector('b').textContent = translations[currentLang].sidebarTitle;
  openSidebarBtn.textContent = translations[currentLang].showPois;
}

// Fill POI filter dropdown
poiTypes.forEach((t, i) => {
  const opt = document.createElement('option');
  opt.value = i;
  opt.textContent = t.label;
  poiFilter.appendChild(opt);
});

// --- Export to PDF ---
exportPdfBtn.onclick = () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;
  doc.setFontSize(16);
  doc.text(translations[currentLang].sidebarTitle, 10, y);
  y += 10;
  Array.from(poiList.children).forEach(li => {
    const img = li.querySelector('img');
    const text = li.textContent;
    if (img) {
      doc.addImage(img.src, 'PNG', 10, y, 8, 8);
      doc.text(text, 20, y + 7);
      y += 12;
    }
  });
  doc.save("pois.pdf");
};