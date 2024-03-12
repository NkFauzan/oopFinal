fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const sweden = data.find(country => country.name.common === 'Sweden');

        if (sweden) {
            // Display common name and official name
            document.getElementById('common-name').textContent = sweden.name.common;
            document.getElementById('official-name').textContent = sweden.name.official;

            // Display capital city
            document.getElementById('capital').textContent = sweden.capital ? sweden.capital[0] : 'Not available';

            // Display currencies
            if (sweden.currencies) {
                const currencyCode = Object.keys(sweden.currencies)[0];
                const currencyName = sweden.currencies[currencyCode].name;
                const currencySymbol = sweden.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = sweden.region ? sweden.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = sweden.languages ? Object.values(sweden.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = sweden.population ? sweden.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = sweden.flags.png;
            document.getElementById('flag').alt = `Flag of ${sweden.name.common}`;

            // Display location
            document.getElementById('location').textContent = sweden.latlng ? `Latitude: ${sweden.latlng[0]}, Longitude: ${sweden.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = sweden.continents ? sweden.continents[0] : 'Not available';

            // Display Google Map
            if (sweden.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: sweden.latlng[0], lng: sweden.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Sweden data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
