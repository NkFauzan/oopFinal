fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const canada = data.find(country => country.name.common === 'Canada');

        if (canada) {
            // Display common name and official name
            document.getElementById('common-name').textContent = canada.name.common;
            document.getElementById('official-name').textContent = canada.name.official;

            // Display capital city
            document.getElementById('capital').textContent = canada.capital ? canada.capital[0] : 'Not available';

            // Display currencies
            if (canada.currencies) {
                const currencyCode = Object.keys(canada.currencies)[0];
                const currencyName = canada.currencies[currencyCode].name;
                const currencySymbol = canada.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = canada.region ? canada.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = canada.languages ? Object.values(canada.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = canada.population ? canada.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = canada.flags.png;
            document.getElementById('flag').alt = `Flag of ${canada.name.common}`;

            // Display location
            document.getElementById('location').textContent = canada.latlng ? `Latitude: ${canada.latlng[0]}, Longitude: ${canada.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = canada.continents ? canada.continents[0] : 'Not available';

            // Display Google Map
            if (canada.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: canada.latlng[0], lng: canada.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Canada data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
