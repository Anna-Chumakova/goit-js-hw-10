
const URL_BASE = 'https://restcountries.com';

export function fetchCountries(name) {
    return fetch(`${URL_BASE}/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then((response) => {
        if (!response.ok) {
        const er = new Error();
        er.code = response.status;
        throw er;
        }
        return response.json();
  });       
}
