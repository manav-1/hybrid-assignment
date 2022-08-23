import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://hn.algolia.com/api/v1/",
});

export { apiClient };
