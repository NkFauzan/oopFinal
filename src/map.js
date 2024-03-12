document.addEventListener('DOMContentLoaded', function() {
    const switzerlandLatlng = [46.8182, 8.2275]; // Switzerland coordinates

    const map = L.map('map').setView(switzerlandLatlng, 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker(switzerlandLatlng).addTo(map)
        .bindPopup("<b>Welcome to Switzerland!</b>").openPopup();
});
