import axios from 'axios';

// Smithsonian API
const fetchSmithsonianData = async () => {
  const url = 'https://api.si.edu/openaccess/api/v1.0/search?api_key=e725d3f5a3d8f8311cfc2aeea943a3de&q=civilization';
  try {
    const response = await axios.get(url);
    return response.data.response.rows;
  } catch (error) {
    console.error('Error fetching Smithsonian data:', error);
    return [];
  }
};

// DBPedia API
const fetchDbPediaData = async () => {
  const url = 'http://api.live.dbpedia.org/resource/en/Yacine_Diop';
  try {
    const response = await axios.get(url, { headers: { Accept: 'application/json' } });
    return response.data;
  } catch (error) {
    console.error('Error fetching DBPedia data:', error);
    return {};
  }
};

// Rijksmuseum API
const fetchRijksmuseumData = async () => {
  const url = 'https://www.rijksmuseum.nl/api/nl/usersets/1836065-meestermatches?key=rvAhTUf2FZERbReA1KZN2w==xQ75QfTyY2xG87YN&format=json';
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Rijksmuseum data:', error);
    return [];
  }
};

// Wikipedia API
const fetchWikipediaData = async (page) => {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&titles=${page}&format=json&origin=*`;
  try {
    const response = await axios.get(url);
    return response.data.query.pages;
  } catch (error) {
    console.error('Error fetching Wikipedia data:', error);
    return {};
  }
};

export {
  fetchSmithsonianData,
  fetchDbPediaData,
  fetchRijksmuseumData,
  fetchWikipediaData,
};
