import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries }  from "./fetchCountries";
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector("#search-box");
const countryListEl = document.querySelector(".country-list");
const countryEl = document.querySelector(".country-info");

inputEl.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    const searchQuery = e.target.value.trim().toLowerCase();
    if (searchQuery === "") {
        cleaneCountryEl();
        cleanCountryListEl();
        return;
    }
    fetchCountries(searchQuery).then(insertContent)
        .catch((error) => {
            cleaneCountryEl();
            cleanCountryListEl();
            Notiflix.Notify.warning("Oops, there is no country with that name");
        });
}

const createListCountry = ({flags, name}) => `<li class="country-item">
        <img src="${flags.svg}" alt="flag" width="70px" height="50px">
        <p class="country-name">${name.official}</p>
      </li>`;

const createOneCountry = ({name, capital, population, flags, languages}) => `
<ul class="country-list">
  <li class="country-info_item name"><img class="imag-item" src="${flags.svg}" alt="flag" width="70px" height="50px">${name.official}</li>
  <li class="country-info_item">Capital: ${capital}</li>
  <li class="country-info_item">Population: </span>${population}</li>
  <li class="country-info_item">Languages: </span>${Object.values(languages)}</li>
</ul>`;

const generateContentListCountry = (country) => country?.reduce((acc, country) => acc + createListCountry(country), "");

const generateContentForOneCountry = (country) => country?.reduce((acc, country) => acc + createOneCountry(country), "");

const insertContent = (country) => {
    if (country.length > 10) {
        cleaneCountryEl();
        cleanCountryListEl();
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    if (country.length < 10 & country.length > 1) {
        cleaneCountryEl();
        const result = generateContentListCountry(country);
        countryListEl.innerHTML = result; 
    }
    if (country.length === 1) {
        cleanCountryListEl();
        const result = generateContentForOneCountry(country);
        countryEl.innerHTML = result;
    }
}
const cleaneCountryEl = () => countryEl.innerHTML = "";
const cleanCountryListEl = () => countryListEl.innerHTML = "";