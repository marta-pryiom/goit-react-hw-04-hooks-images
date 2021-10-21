import axios from 'axios';

const API_KEY = '23024324-04436665e5646ea163d34a038';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function getImages(query, page = 1) {
  const {
    data: { hits },
  } = await axios.get(`?&q=${query}&page=${page}&per_page=12&key=${API_KEY}`);
  return hits;
}
