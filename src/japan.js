fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const japan = data.find(country => country.name.common === 'Japan');

        if (japan) {
            // Display common name and official name
            document.getElementById('common-name').textContent = japan.name.common;
            document.getElementById('official-name').textContent = japan.name.official;

            // Display capital city
            document.getElementById('capital').textContent = japan.capital ? japan.capital[0] : 'Not available';

            // Display currencies
            if (japan.currencies) {
                const currencyCode = Object.keys(japan.currencies)[0];
                const currencyName = japan.currencies[currencyCode].name;
                const currencySymbol = japan.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = japan.region ? japan.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = japan.languages ? Object.values(japan.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = japan.population ? japan.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = japan.flags.png;
            document.getElementById('flag').alt = `Flag of ${japan.name.common}`;

            // Display location
            document.getElementById('location').textContent = japan.latlng ? `Latitude: ${japan.latlng[0]}, Longitude: ${japan.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = japan.continents ? japan.continents[0] : 'Not available';

            // Display Google Map
            if (japan.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: japan.latlng[0], lng: japan.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Japan data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
