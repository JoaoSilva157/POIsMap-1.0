// --- POI Types ---
const poiTypes = [
  { key: 'tourism', value: 'attraction', label: 'Atração Turística', iconFile: 'Atração_Turística.png', category: 'Lazer', premium: false },
  { key: 'amenity', value: 'bank', label: 'Banco', iconFile: 'Banco.png', category: 'Serviços', premium: false },
  { key: 'amenity', value: 'library', label: 'Biblioteca', iconFile: 'Biblioteca.png', category: 'Educação', premium: false },
  { key: 'amenity', value: 'cafe', label: 'Café', iconFile: 'Café.png', category: 'Gastronomia', premium: false },
  { key: 'amenity', value: 'cinema', label: 'Cinema', iconFile: 'Cinema.png', category: 'Lazer', premium: false },
  { key: 'amenity', value: 'clinic', label: 'Clínica', iconFile: 'Clínica.png', category: 'Saúde', premium: false },
  { key: 'amenity', value: 'dentist', label: 'Dentista', iconFile: 'Dentista.png', category: 'Saúde', premium: false },
  { key: 'amenity', value: 'school', label: 'Escola', iconFile: 'Escola.png', category: 'Educação', premium: true },
  { key: 'railway', value: 'station', label: 'Estação de Comboio', iconFile: 'Estação_de_Comboio.png', category: 'Transporte', premium: true },
  { key: 'railway', value: 'subway_entrance', label: 'Metro', iconFile: 'Metro.png', category: 'Transporte', premium: true },
  { key: 'amenity', value: 'pharmacy', label: 'Farmácia', iconFile: 'Farmácia.png', category: 'Saúde', premium: false },
  { key: 'leisure', value: 'fitness_centre', label: 'Ginásio', iconFile: 'Ginásio.png', category: 'Lazer', premium: false },
  { key: 'amenity', value: 'hospital', label: 'Hospital', iconFile: 'Hospital.png', category: 'Saúde', premium: true },
  { key: 'amenity', value: 'kindergarten', label: 'Jardim de Infância', iconFile: 'Jardim_de_Infância.png', category: 'Educação', premium: true },
  { key: 'amenity', value: 'place_of_worship', label: 'Local de Culto', iconFile: 'Local_de_Culto.png', category: 'Serviços', premium: false },
  { key: 'tourism', value: 'viewpoint', label: 'Miradouro', iconFile: 'Miradouro.png', category: 'Lazer', premium: false },
  { key: 'tourism', value: 'museum', label: 'Museu', iconFile: 'Museu.png', category: 'Lazer', premium: false },
  { key: 'highway', value: 'bus_stop', label: 'Paragem de Autocarro', iconFile: 'Paragem_de_Autocarro.png', category: 'Transporte', premium: true },
  { key: 'amenity', value: 'parking', label: 'Estacionamento', iconFile: 'Estacionamento.png', category: 'Transporte', premium: false },
  { key: 'leisure', value: 'playground', label: 'Parque Infantil', iconFile: 'Parque_Infantil.png', category: 'Lazer', premium: false },
  { key: 'leisure', value: 'park', label: 'Parque', iconFile: 'Parque.png', category: 'Lazer', premium: true },
  { key: 'amenity', value: 'police', label: 'Polícia', iconFile: 'Polícia.png', category: 'Segurança', premium: true },
  { key: 'amenity', value: 'fire_station', label: 'Bombeiros', iconFile: 'Bombeiros.png', category: 'Segurança', premium: true },
  { key: 'amenity', value: 'restaurant', label: 'Restaurante', iconFile: 'Restaurante.png', category: 'Gastronomia', premium: false },
  { key: 'shop', value: 'supermarket', label: 'Supermercado', iconFile: 'Supermercado.png', category: 'Compras', premium: true },
  { key: 'amenity', value: 'theatre', label: 'Teatro', iconFile: 'Teatro.png', category: 'Lazer', premium: false },
  { key: 'amenity', value: 'ferry_terminal', label: 'Terminal Fluvial', iconFile: 'Terminal_Fluvial.png', category: 'Transporte', premium: false },
  { key: 'amenity', value: 'university', label: 'Universidade', iconFile: 'Universidade.png', category: 'Educação', premium: true },
  { key: 'amenity', value: 'veterinary', label: 'Veterinário', iconFile: 'Veterinário.png', category: 'Saúde', premium: false },
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
    addressNotFound: "Endereço não encontrado!",
    qualityIndicators: "Indicadores de Qualidade",
    educationScore: "Educação",
    transportScore: "Transporte",
    healthScore: "Saúde",
    leisureScore: "Lazer",
    securityScore: "Segurança",
    shoppingScore: "Compras",
    gastronomyScore: "Gastronomia",
    servicesScore: "Serviços",
    overallScore: "Pontuação Geral",
    excellent: "Excelente",
    good: "Bom",
    average: "Médio",
    poor: "Fraco"
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
    addressNotFound: "Address not found!",
    qualityIndicators: "Quality Indicators",
    educationScore: "Education",
    transportScore: "Transport",
    healthScore: "Health",
    leisureScore: "Leisure",
    securityScore: "Security",
    shoppingScore: "Shopping",
    gastronomyScore: "Gastronomy",
    servicesScore: "Services",
    overallScore: "Overall Score",
    excellent: "Excellent",
    good: "Good",
    average: "Average",
    poor: "Poor"
  }
};
let currentLang = "pt";

// --- DOM Elements ---
const sidebar = document.getElementById('poiSidebar');
const openSidebarBtn = document.getElementById('openSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const poiList = document.getElementById('poiList');
const qualityScores = document.getElementById('qualityScores');
const addressInput = document.getElementById('addressInput');
const searchBtn = document.getElementById('searchBtn');
const radiusSlider = document.getElementById('radiusSlider');
const radiusValue = document.getElementById('radiusValue');
const poiFilter = document.getElementById('poiFilter');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const langSwitcher = document.getElementById('langSwitcher');
const loadingDiv = document.getElementById('loadingIndicator');
const errorDiv = document.getElementById('errorIndicator');

// --- Quality Indicators Functions ---
function calculateQualityScores(pois) {
  // Define categories to track
  const categories = {
    'Educação': { count: 0, premium: 0, weight: 1.5 },
    'Transporte': { count: 0, premium: 0, weight: 1.5 },
    'Saúde': { count: 0, premium: 0, weight: 1.3 },
    'Lazer': { count: 0, premium: 0, weight: 1.0 },
    'Segurança': { count: 0, premium: 0, weight: 1.2 },
    'Compras': { count: 0, premium: 0, weight: 1.1 },
    'Gastronomia': { count: 0, premium: 0, weight: 0.9 },
    'Serviços': { count: 0, premium: 0, weight: 0.8 }
  };
  
  // Count POIs by category
  pois.forEach(poi => {
    // Find POI type
    for (const t of poiTypes) {
      if (poi.tags && poi.tags[t.key] === t.value) {
        if (categories[t.category]) {
          categories[t.category].count++;
          if (t.premium) {
            categories[t.category].premium++;
          }
        }
        break;
      }
    }
  });
  
  // Calculate scores (0-100)
  const scores = {};
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  Object.entries(categories).forEach(([category, data]) => {
    // Base score calculation
    let baseScore = Math.min(100, Math.max(0, data.count * 10));
    
    // Premium bonus (up to 30% boost)
    const premiumBonus = data.premium > 0 ? Math.min(30, data.premium * 10) : 0;
    
    // Final score with premium bonus
    const finalScore = Math.min(100, baseScore + (baseScore * premiumBonus / 100));
    
    scores[category] = finalScore;
    
    // Add to weighted average for overall score
    totalWeightedScore += finalScore * data.weight;
    totalWeight += data.weight;
  });
  
  // Calculate overall score
  scores['Overall'] = Math.round(totalWeightedScore / totalWeight);
  
  return scores;
}

function getScoreRating(score) {
  if (score >= 80) return translations[currentLang].excellent;
  if (score >= 60) return translations[currentLang].good;
  if (score >= 40) return translations[currentLang].average;
  return translations[currentLang].poor;
}

function renderQualityIndicators(scores) {
  qualityScores.innerHTML = '';
  
  // Create score bars for each category
  const categories = {
    'Educação': translations[currentLang].educationScore,
    'Transporte': translations[currentLang].transportScore,
    'Saúde': translations[currentLang].healthScore,
    'Lazer': translations[currentLang].leisureScore,
    'Segurança': translations[currentLang].securityScore,
    'Compras': translations[currentLang].shoppingScore,
    'Gastronomia': translations[currentLang].gastronomyScore,
    'Serviços': translations[currentLang].servicesScore,
    'Overall': translations[currentLang].overallScore
  };
  
  // Sort categories by score (descending), but keep Overall at the end
  const sortedCategories = Object.entries(scores)
    .filter(([category]) => category !== 'Overall')
    .sort((a, b) => b[1] - a[1])
    .concat([['Overall', scores['Overall']]]);
  
  sortedCategories.forEach(([category, score]) => {
    const scoreDiv = document.createElement('div');
    scoreDiv.className = 'quality-score';
    
    const labelDiv = document.createElement('div');
    labelDiv.className = 'quality-score-label';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = categories[category] || category;
    
    const valueSpan = document.createElement('span');
    valueSpan.textContent = `${Math.round(score)}% - ${getScoreRating(score)}`;
    
    labelDiv.appendChild(nameSpan);
    labelDiv.appendChild(valueSpan);
    
    const barDiv = document.createElement('div');
    barDiv.className = 'quality-score-bar';
    
    const fillDiv = document.createElement('div');
    fillDiv.className = 'quality-score-fill';
    fillDiv.style.width = `${score}%`;
    
    barDiv.appendChild(fillDiv);
    
    scoreDiv.appendChild(labelDiv);
    scoreDiv.appendChild(barDiv);
    
    qualityScores.appendChild(scoreDiv);
  });
}

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
    
    // Clear quality indicators
    qualityScores.innerHTML = '';
    return;
  }

  // Calculate quality scores
  const scores = calculateQualityScores(pois);
  renderQualityIndicators(scores);

  // Group POIs by category for better organization
  const poisByCategory = {};
  
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
    
    // Add distance information to popup
    const distance = calculateDistance(lat, lon, poiLat, poiLon);
    popupContent += `<br>Distância: ${distance.toFixed(0)}m`;
    
    marker.bindPopup(popupContent);
    poiMarkers.push(marker);
    
    // Group by category
    if (!poisByCategory[poiType.category]) {
      poisByCategory[poiType.category] = [];
    }
    
    poisByCategory[poiType.category].push({
      poi,
      poiType,
      distance,
      name: poi.tags && poi.tags.name ? poi.tags.name : ''
    });
  });
  
  // Sort categories by their quality score
  const sortedCategories = Object.keys(poisByCategory).sort((a, b) => {
    return (scores[b] || 0) - (scores[a] || 0);
  });
  
  // Render POIs by category
  sortedCategories.forEach(category => {
    // Sort POIs within category by premium status and distance
    const sortedPOIs = poisByCategory[category].sort((a, b) => {
      // Premium POIs first
      if (a.poiType.premium && !b.poiType.premium) return -1;
      if (!a.poiType.premium && b.poiType.premium) return 1;
      // Then by distance
      return a.distance - b.distance;
    });
    
    // Add category header
    const categoryHeader = document.createElement('li');
    categoryHeader.style.fontWeight = 'bold';
    categoryHeader.style.borderBottom = '2px solid #EC6525';
    categoryHeader.style.marginTop = '15px';
    categoryHeader.textContent = category;
    poiList.appendChild(categoryHeader);
    
    // Add POIs in this category
    sortedPOIs.forEach(item => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = poiIconBase64[item.poiType.label] || FALLBACK_SVG_ICON_URL;
      img.width = 24;
      img.height = 24;
      li.appendChild(img);
      
      const textSpan = document.createElement('span');
      if (item.poiType.premium) {
        textSpan.className = 'premium-poi';
      }
      
      textSpan.textContent = item.poiType.label;
      if (item.name) {
        textSpan.textContent += `: ${item.name}`;
      }
      textSpan.textContent += ` (${item.distance.toFixed(0)}m)`;
      
      li.appendChild(textSpan);
      poiList.appendChild(li);
    });
  });
}

// Helper function to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Earth radius in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in meters
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
  
  // Update quality indicators title
  const qualityTitle = document.querySelector('.quality-indicators h3');
  if (qualityTitle) {
    qualityTitle.textContent = translations[currentLang].qualityIndicators;
  }
  
  // Update quality scores if they exist
  if (qualityScores.children.length > 0 && lastAddress) {
    // If we have scores and an address, recalculate to update labels
    handleSearch();
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

  // Add title and address
  doc.setFontSize(16);
  doc.setTextColor(236, 101, 37); // #EC6525
  doc.text("Análise de Localização", 105, y, { align: 'center' });
  y += 10;
  
  doc.setFontSize(12);
  doc.setTextColor(73, 67, 67); // #494343
  doc.text(`Endereço: ${lastAddress}`, 105, y, { align: 'center' });
  y += 15;

  // Add quality indicators section
  doc.setFontSize(14);
  doc.setTextColor(236, 101, 37); // #EC6525
  doc.text(translations[currentLang].qualityIndicators, 10, y);
  y += 10;

  // Get quality scores from the DOM
  const scoreElements = document.querySelectorAll('.quality-score');
  if (scoreElements.length > 0) {
    doc.setFontSize(10);
    doc.setTextColor(73, 67, 67); // #494343
    
    scoreElements.forEach(scoreElement => {
      const labelElement = scoreElement.querySelector('.quality-score-label');
      if (labelElement) {
        const nameSpan = labelElement.querySelector('span:first-child');
        const valueSpan = labelElement.querySelector('span:last-child');
        
        if (nameSpan && valueSpan) {
          const name = nameSpan.textContent;
          const value = valueSpan.textContent;
          
          // Draw score name and value
          doc.text(`${name}: ${value}`, 15, y);
          
          // Draw score bar
          const score = parseInt(value.split('%')[0]);
          doc.setDrawColor(240, 230, 224); // #f0e6e0
          doc.setFillColor(240, 230, 224); // #f0e6e0
          doc.rect(100, y - 3, 80, 4, 'F');
          
          doc.setDrawColor(236, 101, 37); // #EC6525
          doc.setFillColor(236, 101, 37); // #EC6525
          doc.rect(100, y - 3, score * 0.8, 4, 'F');
          
          y += 8;
        }
      }
    });
  }
  
  y += 10;

  // Add POIs section
  doc.setFontSize(14);
  doc.setTextColor(236, 101, 37); // #EC6525
  doc.text(translations[currentLang].sidebarTitle, 10, y);
  y += 10;

  // Iterate through the list of POIs in the sidebar
  let currentCategory = '';
  
  for (const li of poiList.children) {
    // Check if this is a category header
    if (!li.querySelector('img')) {
      // Add some space before new category
      y += 5;
      
      // Add category header
      doc.setFontSize(12);
      doc.setTextColor(236, 101, 37); // #EC6525
      doc.text(li.textContent, 10, y);
      currentCategory = li.textContent;
      y += 8;
      
      // Reset font for POIs
      doc.setFontSize(10);
      doc.setTextColor(73, 67, 67); // #494343
      continue;
    }
    
    const img = li.querySelector('img'); // Get the POI image
    // Get the POI text description
    const textSpan = li.querySelector('span');
    const text = textSpan ? textSpan.textContent : li.textContent;
    const isPremium = textSpan && textSpan.classList.contains('premium-poi');

    // Check if we need to add a page break
    if (y > 270) {
      doc.addPage();
      y = 20;
      
      // Add category header on new page if we're in the middle of a category
      if (currentCategory) {
        doc.setFontSize(12);
        doc.setTextColor(236, 101, 37); // #EC6525
        doc.text(`${currentCategory} (cont.)`, 10, y);
        y += 8;
        
        // Reset font for POIs
        doc.setFontSize(10);
        doc.setTextColor(73, 67, 67); // #494343
      }
    }

    if (img) {
      try {
        // Add the image and text to the PDF
        doc.addImage(img.src, 'PNG', 15, y - 5, 6, 6);
        
        // Set text color based on premium status
        if (isPremium) {
          doc.setTextColor(236, 101, 37); // #EC6525
          doc.setFont(undefined, 'bold');
        } else {
          doc.setTextColor(73, 67, 67); // #494343
          doc.setFont(undefined, 'normal');
        }
        
        doc.text(text, 25, y);
        y += 7; // Adjust vertical position for the next item
      } catch (error) {
        // Handle errors when adding the image
        console.warn(`Failed to add image for POI: ${text}`, error);
        doc.text(text, 15, y);
        y += 7;
      }
    } else {
      // Add only the text if no image is available
      doc.text(text, 15, y);
      y += 7;
    }
  }

  // Add footer with date and time
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(`Gerado em ${dateStr} às ${timeStr}`, 105, 285, { align: 'center' });

  // Save the generated PDF with the filename based on the address
  const pdfName = lastAddress ? 
    `Análise de Localização - ${lastAddress.substring(0, 30)}.pdf` : 
    "Análise de Localização.pdf";
  
  doc.save(pdfName);
}

// Initialize UI with current language
document.addEventListener('DOMContentLoaded', () => {
  updateLanguageUI();
});