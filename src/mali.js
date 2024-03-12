fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const mali = data.find(country => country.name.common === 'Mali');

        if (mali) {
            // Display common name and official name
            document.getElementById('common-name').textContent = mali.name.common;
            document.getElementById('official-name').textContent = mali.name.official;

            // Display capital city
            document.getElementById('capital').textContent = mali.capital ? mali.capital[0] : 'Not available';

            // Display currencies
            if (mali.currencies) {
                const currencyCode = Object.keys(mali.currencies)[0];
                const currencyName = mali.currencies[currencyCode].name;
                const currencySymbol = mali.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = mali.region ? mali.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = mali.languages ? Object.values(mali.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = mali.population ? mali.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = mali.flags.png;
            document.getElementById('flag').alt = `Flag of ${mali.name.common}`;

            // Display location
            document.getElementById('location').textContent = mali.latlng ? `Latitude: ${mali.latlng[0]}, Longitude: ${mali.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = mali.continents ? mali.continents[0] : 'Not available';

            // Display Google Map
            if (mali.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: mali.latlng[0], lng: mali.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Mali data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
