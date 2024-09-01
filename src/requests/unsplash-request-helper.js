import axios from "axios";

const BASE_URL = "https://api.unsplash.com/";
const API_KEY = import.meta.env.UNSPLASH_API_KEY;
const PHOTO_ORIENTATION = "landscape";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common[
  "Authorization"
] = `Client-ID ${API_KEY}`;

export const imageRequest = async ({ query, page, limit }) => {
  const response = await axios.get("/search/photos", {
    params: {
      query,
      page,
      per_page: limit,
      orientation: PHOTO_ORIENTATION,
    },
  });
  return response.data;
};
