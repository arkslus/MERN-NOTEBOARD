// import axios
import axios from "axios";

// create an instance of axios with the base URL
// in production, there's no localhost so we have to make this dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/api";

const api = axios.create({
  baseURL: BASE_URL, // replace with your actual API URL
});

export default api;
