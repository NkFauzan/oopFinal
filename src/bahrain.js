fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const bahrain = data.find(country => country.name.common === 'Bahrain');

        if (bahrain) {
            // Display common name and official name
            document.getElementById('common-name').textContent = bahrain.name.common;
            document.getElementById('official-name').textContent = bahrain.name.official;

            // Display capital city
            document.getElementById('capital').textContent = bahrain.capital ? bahrain.capital[0] : 'Not available';

            // Display currencies
            if (bahrain.currencies) {
                const currencyCode = Object.keys(bahrain.currencies)[0];
                const currencyName = bahrain.currencies[currencyCode].name;
                const currencySymbol = bahrain.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = bahrain.region ? bahrain.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = bahrain.languages ? Object.values(bahrain.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = bahrain.population ? bahrain.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = bahrain.flags.png;
            document.getElementById('flag').alt = `Flag of ${bahrain.name.common}`;

            // Display location
            document.getElementById('location').textContent = bahrain.latlng ? `Latitude: ${bahrain.latlng[0]}, Longitude: ${bahrain.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = bahrain.continents ? bahrain.continents[0] : 'Not available';

            // Display Google Map
            if (bahrain.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: bahrain.latlng[0], lng: bahrain.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Bahrain data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
