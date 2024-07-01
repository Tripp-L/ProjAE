import axios from 'axios';

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
  fetchWikipediaData,
};
