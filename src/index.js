import fetchCountries from './fetchCountries';
import Notiflix from 'notiflix';
import './css/styles.css';
let _ = require('lodash');

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

searchBox.addEventListener('input', _.debounce(onInput, 300));

function onInput(evt) {
  let name = evt.target.value.trim();
  if (name) {
    fetchCountries(name)
      .then(data => {
        if (data.length < 2) {
          createOneMarkup(data);
        } else if (data.length > 2 && data.length <= 10) {
          createSeveralMarkup(data);
        } else {
          countryList.innerHTML = '';
          countryInfo.innerHTML = '';
          console.log(
            'Too many matches found. Please enter a more specific name.'
          );
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      })
      .catch(err => {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        console.log(err);
      });
  }
}

function createSeveralMarkup(arr) {
  countryInfo.innerHTML = '';
  const markup = arr
    .map(
      ({ capital, flags: { svg } }) => `
      <li class="item">
        <img src="${svg}" alt="${capital}"  width="48" height="32">
        <h1>${capital}</h1>
      </li>
  `
    )
    .join('');
  console.log(markup);

  countryList.innerHTML = markup;
}

function createOneMarkup(arr) {
  countryList.innerHTML = '';
  const markup = arr
    .map(
      ({
        capital,
        flags: { svg },
        name: { official },
        population,
        languages,
      }) => `
      <div class="container">
      <div class="wrap">
        <img src="${svg}" alt="" width="48" height="32" />
        <h1>${official}</h1>
      </div>
      <div class="wrap">
        <span class="header">Capital:</span>
        <span class="header-value">${capital}</span>
      </div>
      <div class="wrap"><span class="header">Population: </span><span class="header-value">${population}</span></div>
      <div class="wrap">
        <span class="header">Languages: </span><span class="header-value">${Object.values(
          languages
        )}&nbsp</span>
      </div>
    </div>
      `
    )
    .join('');

  console.log(markup);

  countryInfo.innerHTML = markup;
}
