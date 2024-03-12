fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const unitedKingdom = data.find(country => country.name.common === 'United Kingdom');

        if (unitedKingdom) {
            // Display common name and official name
            document.getElementById('common-name').textContent = unitedKingdom.name.common;
            document.getElementById('official-name').textContent = unitedKingdom.name.official;

            // Display capital city
            document.getElementById('capital').textContent = unitedKingdom.capital ? unitedKingdom.capital[0] : 'Not available';

            // Display currencies
            if (unitedKingdom.currencies) {
                const currencyCode = Object.keys(unitedKingdom.currencies)[0];
                const currencyName = unitedKingdom.currencies[currencyCode].name;
                const currencySymbol = unitedKingdom.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = unitedKingdom.region ? unitedKingdom.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = unitedKingdom.languages ? Object.values(unitedKingdom.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = unitedKingdom.population ? unitedKingdom.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = unitedKingdom.flags.png;
            document.getElementById('flag').alt = `Flag of ${unitedKingdom.name.common}`;

            // Display location
            document.getElementById('location').textContent = unitedKingdom.latlng ? `Latitude: ${unitedKingdom.latlng[0]}, Longitude: ${unitedKingdom.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = unitedKingdom.continents ? unitedKingdom.continents[0] : 'Not available';

            // Display Google Map
            if (unitedKingdom.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: unitedKingdom.latlng[0], lng: unitedKingdom.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('United Kingdom data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
