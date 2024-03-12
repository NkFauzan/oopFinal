// script.js

document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const countryName = document.getElementById('country').value;

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();

        if (data && data.length > 0) {
            const country = data[0];
            displayCountryInfo(country);
        } else {
            displayErrorMessage('Country not found.');
        }
    } catch (error) {
        displayErrorMessage('Error fetching country data.');
    }
});

function displayCountryInfo(country) {
    const countryInfoDiv = document.getElementById('country-info');
    countryInfoDiv.innerHTML = `
        <center><h2>${country.name.common}</h2></center>
        <center><img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="flag-image"></center>      
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Population:</strong> ${country.population}</p>
  
    `;
}

function displayErrorMessage(message) {
    const countryInfoDiv = document.getElementById('country-info');
    countryInfoDiv.innerHTML = `<p>${message}</p>`;
}
