fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const qatar = data.find(country => country.name.common === 'Qatar');

        if (qatar) {
            // Display common name and official name
            document.getElementById('common-name').textContent = qatar.name.common;
            document.getElementById('official-name').textContent = qatar.name.official;

            // Display capital city
            document.getElementById('capital').textContent = qatar.capital ? qatar.capital[0] : 'Not available';

            // Display currencies
            if (qatar.currencies) {
                const currencyCode = Object.keys(qatar.currencies)[0];
                const currencyName = qatar.currencies[currencyCode].name;
                const currencySymbol = qatar.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = qatar.region ? qatar.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = qatar.languages ? Object.values(qatar.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = qatar.population ? qatar.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = qatar.flags.png;
            document.getElementById('flag').alt = `Flag of ${qatar.name.common}`;

            // Display location
            document.getElementById('location').textContent = qatar.latlng ? `Latitude: ${qatar.latlng[0]}, Longitude: ${qatar.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = qatar.continents ? qatar.continents[0] : 'Not available';

            // Display Google Map
            if (qatar.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: qatar.latlng[0], lng: qatar.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Qatar data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
