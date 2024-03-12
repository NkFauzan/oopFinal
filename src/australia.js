fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const australia = data.find(country => country.name.common === 'Australia');

        if (australia) {
            // Display common name and official name
            document.getElementById('common-name').textContent = australia.name.common;
            document.getElementById('official-name').textContent = australia.name.official;

            // Display capital city
            document.getElementById('capital').textContent = australia.capital ? australia.capital[0] : 'Not available';

            // Display currencies
            if (australia.currencies) {
                const currencyCode = Object.keys(australia.currencies)[0];
                const currencyName = australia.currencies[currencyCode].name;
                const currencySymbol = australia.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = australia.region ? australia.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = australia.languages ? Object.values(australia.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = australia.population ? australia.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = australia.flags.png;
            document.getElementById('flag').alt = `Flag of ${australia.name.common}`;

            // Display location
            document.getElementById('location').textContent = australia.latlng ? `Latitude: ${australia.latlng[0]}, Longitude: ${australia.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = australia.continents ? australia.continents[0] : 'Not available';

            // Display Google Map
            if (australia.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: australia.latlng[0], lng: australia.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Australia data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
