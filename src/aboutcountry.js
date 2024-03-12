// aboutcountry.js
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the country name from local storage
    const detailIndex = localStorage.getItem('detailIndex');
    const userPlanData = JSON.parse(localStorage.getItem('userPlan')) || [];
    const country = userPlanData[detailIndex].country;

    // Fetch data about the country from the REST Countries API
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            // Extract relevant information from the API response
            const countryData = data[0]; // Assuming the API returns data for a single country
            const detailsDiv = document.getElementById('country-details');

            // Display the country details on the page
            detailsDiv.innerHTML = `
                <center><h2>Welcome to ${country}</h2></center><br>
                <center><img src="${countryData.flags.png}" alt="Flag of ${country}" /></center>
                <p>Common Name: ${countryData.name.common}</p>
                <p>Official Name: ${countryData.name.official}</p>
                <p>Capital: ${countryData.capital}</p>
                <p>Region: ${countryData.region}</p>
                <p>Languages: ${Object.values(countryData.languages).join(', ')}</p>
                <p>Population: ${countryData.population}</p>
                <p>Location: ${countryData.latlng.join(', ')}</p>
                <p>Continent: ${countryData.continents}</p>
                <div id="map"></div>
            `;

            // Create a Google Map
            const mapDiv = document.getElementById('map');
            const map = new google.maps.Map(mapDiv, {
                center: { lat: countryData.latlng[0], lng: countryData.latlng[1] },
                zoom: 4
            });
        })
        .catch(error => {
            console.error('Error fetching country details:', error);
        });
});
