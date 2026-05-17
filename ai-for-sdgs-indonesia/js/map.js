// map.js — Leaflet interactive map for AI projects across Indonesia
(function () {
  // Pillar labels mapping
  const PILLAR_LABELS = {
    'social-aid': 'Bantuan Sosial',
    'economy': 'Ekonomi Inklusif',
    'climate': 'Climate Monitoring',
    'education': 'Pendidikan',
    'agriculture': 'Smart Agriculture'
  };

  // Custom minimal marker icon
  function createMarkerIcon(pillar) {
    const colors = {
      'social-aid': '#1E3A8A',
      'economy': '#0F766E',
      'climate': '#166534',
      'education': '#7C3AED',
      'agriculture': '#B45309'
    };
    const color = colors[pillar] || '#1E3A8A';

    return L.divIcon({
      className: '',
      html: `<div style="
        width: 10px;
        height: 10px;
        background: ${color};
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 1px 4px rgba(0,0,0,0.25);
      "></div>`,
      iconSize: [10, 10],
      iconAnchor: [5, 5],
      popupAnchor: [0, -8]
    });
  }

  function initMap() {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    // Init map centered on Indonesia
    const map = L.map('map', {
      center: [-2.5, 118.0],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: true
    });

    // CartoDB Positron tile — minimal, editorial
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    // Enable scroll zoom on click
    map.on('click', function () {
      map.scrollWheelZoom.enable();
    });
    map.on('mouseout', function () {
      map.scrollWheelZoom.disable();
    });

    // Load projects data
    fetch('../data/projects.json')
      .then(function (res) { return res.json(); })
      .catch(function () { return []; })
      .then(function (projects) {
        if (!projects.length) return;
        renderMarkers(map, projects);
      });
  }

  function renderMarkers(map, projects) {
    projects.forEach(function (project) {
      const marker = L.marker([project.lat, project.lng], {
        icon: createMarkerIcon(project.pillar)
      });

      const sdgBadges = project.sdg.map(n => `<span style="
        display:inline-block;
        font-size:0.6875rem;
        font-weight:500;
        padding:2px 6px;
        border:1px solid var(--color-border, #E5E5E5);
        border-radius:2px;
        color:var(--color-text-muted, #6B6B6B);
        margin-right:4px;
      ">SDG ${n}</span>`).join('');

      const popupContent = `
        <div class="map-popup">
          <div class="map-popup__pillar">${PILLAR_LABELS[project.pillar] || project.pillar}</div>
          <div class="map-popup__name">${project.name}</div>
          <div class="map-popup__province">${project.province} · ${project.organization}</div>
          <div class="map-popup__desc">${project.description}</div>
          <div style="margin-top:10px;">${sdgBadges}</div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 280,
        closeButton: true,
        className: 'minimal-popup'
      });

      marker.addTo(map);
    });
  }

  // Also handle same-page map (dashboard uses relative path)
  function initMapDashboard() {
    const mapEl = document.getElementById('map');
    if (!mapEl || typeof L === 'undefined') return;

    const map = L.map('map', {
      center: [-2.5, 118.0],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    map.on('click', function () { map.scrollWheelZoom.enable(); });
    map.on('mouseout', function () { map.scrollWheelZoom.disable(); });

    fetch('data/projects.json')
      .then(function (res) { return res.json(); })
      .catch(function () { return []; })
      .then(function (projects) {
        if (projects.length) renderMarkers(map, projects);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Detect which path we're on
    const path = window.location.pathname;
    if (path.includes('dashboard')) {
      initMapDashboard();
    } else {
      initMap();
    }
  });
})();
