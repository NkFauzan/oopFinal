fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        const switzerland = data.find(country => country.name.common === 'Switzerland');

        if (switzerland) {
            // Display common name and official name
            document.getElementById('common-name').textContent = switzerland.name.common;
            document.getElementById('official-name').textContent = switzerland.name.official;

            // Display capital city
            document.getElementById('capital').textContent = switzerland.capital ? switzerland.capital[0] : 'Not available';
            
            // Display currencies
            if (switzerland.currencies) {
                const currencyCode = Object.keys(switzerland.currencies)[0];
                const currencyName = switzerland.currencies[currencyCode].name;
                const currencySymbol = switzerland.currencies[currencyCode].symbol;
                document.getElementById('currencies').textContent = `${currencyName} (${currencySymbol})`;
            } else {
                document.getElementById('currencies').textContent = 'Not available';
            }

            // Display region
            document.getElementById('region').textContent = switzerland.region ? switzerland.region : 'Not available';

            // Display languages
            document.getElementById('languages').textContent = switzerland.languages ? Object.values(switzerland.languages).join(', ') : 'Not available';

            // Display population
            document.getElementById('population').textContent = switzerland.population ? switzerland.population.toLocaleString() : 'Not available';

            // Display flag
            document.getElementById('flag').src = switzerland.flags.png;
            document.getElementById('flag').alt = `Flag of ${switzerland.name.common}`;

            // Display location
            document.getElementById('location').textContent = switzerland.latlng ? `Latitude: ${switzerland.latlng[0]}, Longitude: ${switzerland.latlng[1]}` : 'Not available';

            // Display continent
            document.getElementById('continent').textContent = switzerland.continents ? switzerland.continents[0] : 'Not available';

            document.getElementById('timezones').textContent = switzerland.timezones ? switzerland.timezones.join(', ') : 'Not available';
            
            
            // Display Google Map
            if (switzerland.latlng) {
                const map = new google.maps.Map(document.getElementById('map'), {
                    center: { lat: switzerland.latlng[0], lng: switzerland.latlng[1] },
                    zoom: 8
                });
            } else {
                document.getElementById('map').textContent = 'Map not available';
            }
        } else {
            console.error('Switzerland data not found in the API response.');
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



// switzerland.js

// Function to initialize the Google Map
function initMap() {
    // Define the map options
    const mapOptions = {
        center: { lat: 46.8182, lng: 8.2275 }, // Switzerland coordinates
        zoom: 8 // Initial zoom level
    };

    // Create a new map instance
    const map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

// Function to handle the button click event
function showMap() {
    console.log('Button clicked!');    
    initMap();
}

// Add event listener to the button
const showMapButton = document.getElementById("show-map-button");
showMapButton.addEventListener("click", showMap);
