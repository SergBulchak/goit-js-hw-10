import Notiflix, { Notify } from 'notiflix';

function fetchCountries(query) {
  const URL = `https://restcountries.com/v3.1/name/${query}?fields=name,capital,population,flags,languages`;
  return fetch(URL)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          Notify.failure('Oops, there is no country with that name')
        );
        console.log(response);
      } else {
        return response.json();
      }
    })
    .catch(error => console.log(error));
}

export default fetchCountries;