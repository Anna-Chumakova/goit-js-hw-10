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
    const searchQuery = e.target.value.trim();
    if (searchQuery === "") {
        cleaneResult();
        return;
    }
    fetchCountries(searchQuery)
        .then((country) => {
            if (country.length > 10) {
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
            insertContent(country);
        })
        .catch((error) => {
            cleaneResult();
            if (message = "Not Found") {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            }
            console.log(error);
        });
}

const insertContent = (country) => {
    cleaneResult();
    
    if (country.length < 10 & country.length > 1) {
        const result = generateContentListCountry(country);
        countryListEl.innerHTML = result;
    }
    else if (country.length === 1) {
        const result = generateContentForOneCountry(country);
        countryEl.innerHTML = result;
    }
}


const createListCountry = ({ flags, name }) => `<li class="country-item">
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

function cleaneResult() {
    countryEl.innerHTML = "";
    countryListEl.innerHTML = "";
}
