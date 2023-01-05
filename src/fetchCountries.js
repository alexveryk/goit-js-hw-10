import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/name/';
const filter = '?fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}${name}${filter}`).then(resp => {
    if (!resp.ok) {
      console.log(resp);
      console.log('Oops, there is no country with that name');
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}
