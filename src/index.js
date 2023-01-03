import './css/styles.css';
let _ = require('lodash');

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', _.debounce(onInput, 300));

function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}`).then(resp => {
    if (!resp.ok) {
      console.log(resp);
      console.log('Oops, there is no country with that name');
      throw new Error(resp.statusText);
    }
    console.log(resp);
    return resp.json();
  });
}

function onInput(evt) {
  fetchCountries(evt.target.value)
    .then(res => {
      if (res.length < 2) {
        createOneMarkup(res);
      } else if (res.length > 2 && res.length <= 10) {
        createSeveralMarkup(res);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function createSeveralMarkup(arr) {
  const markup = arr
    .map(
      ({ name: { common: countryName }, flags: { svg: flag } }) => `
  <div class ="container">
      <img src="${flag}" alt="" width ="48" height="32">
      <h1>${countryName}</h1>
          
  </div>`
    )
    .join('');
  console.log(markup);
  countryInfo.insertAdjacentHTML('beforeend', markup);
}

function createOneMarkup(arr) {
  const markup = arr
    .map(
      ({
        name: { official: countryName },
        flags: { svg: flag },
        capital,
        population,
        languages,
      }) => `
      <div class="container">
      <img src="${flag}" alt="" width="48" height="32" />
      <h1>${countryName}</h1>
      <div class="container"><h2>Capital: ${capital}</h2></div>
      <div class="container"><span>Population: </span>${population}</div>
      <div class="container"><span>Languages </span>${languages}</div>
    </div>`
    )
    .join('');
  console.log(markup);
  countryInfo.insertAdjacentHTML('beforeend', markup);
}
