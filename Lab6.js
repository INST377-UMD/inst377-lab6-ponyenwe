function createMap() {
  var map = L.map('map').setView([37.0902, -95.7129], 4);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
  }).addTo(map);
  generateMarkers(map);
}

function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function generateMarkers(map) {
  const markerInfoDiv = document.getElementById('marker-info');

  for (let i = 0; i < 3; i++) {
      const lat = getRandomInRange(30, 35, 3);
      const lng = getRandomInRange(-90, -100, 3);
      const marker = L.marker([lat, lng]).addTo(map);

      fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
          .then(response => response.json())
          .then(data => {
              const locality = data.locality || "Locality not found";
              marker.bindPopup(`Marker ${i + 1} - ${locality}`);
              markerInfoDiv.innerHTML += `<p>Marker ${i + 1}: (${lat}, ${lng}) - Locality: ${locality}</p>`;
          });
  }
}

window.onload = createMap;