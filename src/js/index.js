import '../css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix, { Notify } from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const inputSearch = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');

inputSearch.addEventListener(
  'input',
  debounce(e => {
    const inputValue = inputSearch.value.trim();
    removeMarkup();
    if (inputValue.length === 0) {
      return;
    }
    fetchCountries(inputValue).then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length < 10) {
        createCountryList(data);
      } else if ((data.length = 1)) {
        createCountryList(data);
        createCountryInfo(data);
      }
    });
  }, DEBOUNCE_DELAY)
);

function createCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li><img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20"><h3>${country.name.official}<h3></li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function createCountryInfo(country) {
  const countryData = country.map(info => {
    return `<div class="wrapper"><b>Capital:</b><p>${
      info.capital
    }</p></div><div class="wrapper"><b>Population:</b><p>${
      info.population
    }</p></div><div class="wrapper"><b>Languages:</b><p>${Object.values(
      info.languages
    )}</p></div>`;
  });
  countryCard.innerHTML = countryData;
}

function removeMarkup() {
  countryCard.innerHTML = '';
  countryList.innerHTML = '';
}