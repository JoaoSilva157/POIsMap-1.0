// --- POI Types ---
const poiTypes = [
  { key: 'tourism', value: 'attraction', label: 'Atração Turística', iconFile: 'Atração_Turística.png' },
  { key: 'amenity', value: 'bank', label: 'Banco', iconFile: 'Banco.png' },
  { key: 'amenity', value: 'library', label: 'Biblioteca', iconFile: 'Biblioteca.png' },
  { key: 'amenity', value: 'cafe', label: 'Café', iconFile: 'Café.png' },
  { key: 'amenity', value: 'cinema', label: 'Cinema', iconFile: 'Cinema.png' },
  { key: 'amenity', value: 'clinic', label: 'Clínica', iconFile: 'Clínica.png' },
  { key: 'amenity', value: 'dentist', label: 'Dentista', iconFile: 'Dentista.png' },
  { key: 'amenity', value: 'school', label: 'Escola', iconFile: 'Escola.png' },
  { key: 'railway', value: 'station', label: 'Estação de Comboio', iconFile: 'Estação_de_Comboio.png' },
  { key: 'railway', value: 'subway_entrance', label: 'Metro', iconFile: 'Metro.png' },
  { key: 'amenity', value: 'pharmacy', label: 'Farmácia', iconFile: 'Farmácia.png' },
  { key: 'leisure', value: 'fitness_centre', label: 'Ginásio', iconFile: 'Ginásio.png' },
  { key: 'amenity', value: 'hospital', label: 'Hospital', iconFile: 'Hospital.png' },
  { key: 'amenity', value: 'kindergarten', label: 'Jardim de Infância', iconFile: 'Jardim_de_Infância.png' },
  { key: 'amenity', value: 'place_of_worship', label: 'Local de Culto', iconFile: 'Local_de_Culto.png' },
  { key: 'tourism', value: 'viewpoint', label: 'Miradouro', iconFile: 'Miradouro.png' },
  { key: 'tourism', value: 'museum', label: 'Museu', iconFile: 'Museu.png' },
  { key: 'highway', value: 'bus_stop', label: 'Paragem de Autocarro', iconFile: 'Paragem_de_Autocarro.png' },
  { key: 'amenity', value: 'parking', label: 'Estacionamento', iconFile: 'Estacionamento.png' },
  { key: 'leisure', value: 'playground', label: 'Parque Infantil', iconFile: 'Parque_Infantil.png' },
  { key: 'leisure', value: 'park', label: 'Parque', iconFile: 'Parque.png' },
  { key: 'amenity', value: 'police', label: 'Polícia', iconFile: 'Polícia.png' },
  { key: 'amenity', value: 'fire_station', label: 'Bombeiros', iconFile: 'Bombeiros.png' },
  { key: 'amenity', value: 'restaurant', label: 'Restaurante', iconFile: 'Restaurante.png' },
  { key: 'shop', value: 'supermarket', label: 'Supermercado', iconFile: 'Supermercado.png' },
  { key: 'amenity', value: 'theatre', label: 'Teatro', iconFile: 'Teatro.png' },
  { key: 'amenity', value: 'ferry_terminal', label: 'Terminal Fluvial', iconFile: 'Terminal_Fluvial.png' },
  { key: 'amenity', value: 'university', label: 'Universidade', iconFile: 'Universidade.png' },
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
const map = L.map('map').setView([38.7223, -9.1393], 13); // Default to Lisbon

navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    map.setView([latitude, longitude], 15);
    currentLat = latitude;
    currentLon = longitude;
  },
  () => {
    console.warn("Geolocation failed. Falling back to default location.");
  }
);
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

// --- Global Variables ---
const overpassTimeout = 60; // Configurable timeout for Overpass API in seconds
// poiIconBase64 is loaded from icons-base64.js

// --- Constants ---
const FALLBACK_SVG_ICON_URL = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="14" fill="%23EC6525" stroke="white" stroke-width="3"/></svg>';

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
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  const resp = await fetch(url, { headers: { 'Accept-Language': currentLang } });
  if (!resp.ok) {
    throw new Error(`${translations[currentLang].error} (HTTP ${resp.status})`);
  }
  const data = await resp.json();
  if (data.length === 0) throw new Error(translations[currentLang].addressNotFound);
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

// --- Fetch POIs (with filter) ---
async function fetchPOIs(lat, lon, radius, filterIndex) {
  let filters = [];
  if (filterIndex !== "" && filterIndex !== null && Number.isInteger(filterIndex) && filterIndex >= 0 && filterIndex < poiTypes.length) {
    const t = poiTypes[filterIndex];
    filters.push(`node["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
    /**
     * Warning: If the radius exceeds 5000 meters, the Overpass API may truncate results to 1000 POIs.
     * This is a limitation of the Overpass API. Developers should consider:
     * 1. Reducing the radius to avoid truncation.
     * 2. Implementing pagination to handle large datasets effectively.
     */
    if (radius > 5000) {
      console.warn("The radius is large, and results may be truncated to 1000 POIs. Consider reducing the radius or implementing pagination.");
    }
    filters.push(`way["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
    filters.push(`relation["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
  } else {
    for (const t of poiTypes) {
      filters.push(`node["${t.key}"="${t.value}"](around:${radius},${lat},${lon});`);
    }
  }
  const query = `[out:json][timeout:${overpassTimeout}];(${filters.join('')});out center; out qt;`;
  const url = "https://overpass-api.de/api/interpreter";
  const resp = await fetch(url, { method: "POST", body: query });
  const data = await resp.json();
  return data.elements;
}

// --- Render POIs on Map and Sidebar ---
function renderPOIs(pois, lat, lon) {
  // Clear existing markers
  poiMarkers.forEach(marker => map.removeLayer(marker));
  poiMarkers = [];
  poiList.innerHTML = '';

  // Add FSBO marker
  if (fsboMarker) map.removeLayer(fsboMarker);
  fsboMarker = L.marker([lat, lon], { icon: makeFsboIcon() })
    .addTo(map)
    .bindPopup(`<b>${lastAddress}</b>`);

  // Add POI markers
  if (pois.length === 0) {
    const li = document.createElement('li');
    li.textContent = translations[currentLang].noPois;
    poiList.appendChild(li);
    return;
  }

  pois.forEach(poi => {
    const poiLat = poi.lat || (poi.center ? poi.center.lat : null);
    const poiLon = poi.lon || (poi.center ? poi.center.lon : null);
    
    if (!poiLat || !poiLon) return;
    
    // Find POI type
    let poiType = null;
    for (const t of poiTypes) {
      if (poi.tags && poi.tags[t.key] === t.value) {
        poiType = t;
        break;
      }
    }
    
    if (!poiType) return;
    
    // Create marker
    const marker = L.marker([poiLat, poiLon], { icon: makeCustomIcon(poiType.label) })
      .addTo(map);
    
    // Prepare popup content
    let popupContent = `<b>${poiType.label}</b>`;
    if (poi.tags && poi.tags.name) {
      popupContent += `<br>${poi.tags.name}`;
    }
    
    marker.bindPopup(popupContent);
    poiMarkers.push(marker);
    
    // Add to sidebar list
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = poiIconBase64[poiType.label] || FALLBACK_SVG_ICON_URL;
    img.width = 24;
    img.height = 24;
    li.appendChild(img);
    
    const textSpan = document.createElement('span');
    textSpan.textContent = poiType.label;
    if (poi.tags && poi.tags.name) {
      textSpan.textContent += `: ${poi.tags.name}`;
    }
    li.appendChild(textSpan);
    
    poiList.appendChild(li);
  });
}

// --- Search Handler (with filter) ---
async function handleSearch() {
  const address = addressInput.value.trim();
  if (!address) return;
  
  // Show loading indicator
  loadingDiv.style.display = 'block';
  errorDiv.style.display = 'none';
  
  try {
    // Get coordinates from address
    const coords = await geocodeAddress(address);
    currentLat = coords.lat;
    currentLon = coords.lon;
    lastAddress = address;
    
    // Update map view
    map.setView([currentLat, currentLon], 15);
    
    // Get radius value
    currentRadius = parseInt(radiusSlider.value, 10);
    
    // Get filter value
    const filterValue = poiFilter.value;
    const filterIndex = filterValue ? parseInt(filterValue, 10) : null;
    
    // Fetch and render POIs
    const pois = await fetchPOIs(currentLat, currentLon, currentRadius, filterIndex);
    renderPOIs(pois, currentLat, currentLon);
    
    // Show sidebar
    sidebar.classList.add('open');
    openSidebarBtn.style.display = 'none';
  } catch (error) {
    console.error('Search error:', error);
    errorDiv.textContent = error.message || translations[currentLang].error;
    errorDiv.style.display = 'block';
  } finally {
    loadingDiv.style.display = 'none';
  }
}

// Attach search handler to button and Enter key
searchBtn.onclick = handleSearch;
addressInput.onkeyup = (e) => {
  if (e.key === 'Enter') handleSearch();
};

radiusSlider.oninput = (e) => {
  radiusValue.textContent = e.target.value;
};

poiFilter.onchange = () => {
  // If we already have a search location, perform a new search with the filter
  if (lastAddress) {
    handleSearch();
  } else {
    updateLanguageUI();
  }
};

langSwitcher.onchange = (e) => {
  const selectedLang = e.target && typeof e.target.value === 'string' ? e.target.value.trim() : '';
  if (selectedLang === '' || !translations.hasOwnProperty(selectedLang)) {
    currentLang = "en"; // Default to English if the selected language is empty or unsupported
  } else {
    currentLang = selectedLang;
  }
  updateLanguageUI();
};
function updateLanguageUI() {
  if (searchBtn) {
    searchBtn.textContent = translations[currentLang].search;
  }
  const radiusLabel = document.getElementById('radiusLabel');
  if (radiusLabel && radiusLabel.childNodes[0]) {
    radiusLabel.childNodes[0].nodeValue = translations[currentLang].radius + ": ";
  }
  const filterLabel = document.getElementById('filterLabel');
  if (filterLabel) {
    filterLabel.textContent = translations[currentLang].filter;
  }
  if (exportPdfBtn) {
    exportPdfBtn.textContent = translations[currentLang].export;
  }
  if (addressInput) {
    addressInput.placeholder = translations[currentLang].addressPlaceholder;
  }
  const sidebarTitleElement = sidebar ? sidebar.querySelector('b') : null;
  if (sidebarTitleElement) {
    sidebarTitleElement.textContent = translations[currentLang].sidebarTitle;
  }
  if (openSidebarBtn) {
    openSidebarBtn.textContent = translations[currentLang].showPois;
  }
  if (poiFilter) {
    // Clear existing options
    poiFilter.innerHTML = '';
    // Add default option
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = translations[currentLang].allTypes;
    poiFilter.appendChild(defaultOpt);
    // Add POI type options
    poiTypes.forEach((t, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = t.label;
      poiFilter.appendChild(opt);
    });
  }
}

// Attach an event handler to the export PDF button
exportPdfBtn.onclick = () => {
  // Check if the jsPDF library is loaded
  if (typeof window.jspdf === 'undefined') {
    console.error("jsPDF is not loaded. Please ensure the jsPDF library is included.");
    alert("Failed to export PDF. The jsPDF library is not loaded.");
    return;
  }

  // Create a new jsPDF document
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10; // Initial vertical position for text and images

  // Iterate through the list of POIs in the sidebar
  for (const li of poiList.children) {
    const img = li.querySelector('img'); // Get the POI image
    // Get the POI text description (using textContent of the span to avoid getting the image text)
    const textSpan = li.querySelector('span');
    const text = textSpan ? textSpan.textContent : li.textContent;

    if (img) {
      try {
        // Add the image and text to the PDF
        doc.addImage(img.src, 'PNG', 10, y, 8, 8);
        doc.text(text, 20, y + 7);
        y += 12; // Adjust vertical position for the next item
      } catch (error) {
        // Handle errors when adding the image
        console.warn(`Failed to add image for POI: ${text}`, error);
        doc.text(text, 10, y);
        y += 10;
      }
    } else {
      // Add only the text if no image is available
      doc.text(text, 10, y);
      y += 10;
    }
  }

  // Save the generated PDF with the filename "pois.pdf"
  doc.save("pois.pdf");
}

// Initialize UI with current language
document.addEventListener('DOMContentLoaded', () => {
  updateLanguageUI();
});