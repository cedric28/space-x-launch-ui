import axios from 'axios';

const BASE_URL = 'https://api.spacexdata.com/v3';

export const fetchLaunches = async (offset = 0, limit = 10, query = '') => {
  const response = await axios.get(`${BASE_URL}/launches`, {
    params: { offset, limit },
  });

  const launches = response.data;

  // Apply client-side search if query exists
  if (query) {
    return launches.filter((launch) =>
      launch.mission_name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return launches;
};
