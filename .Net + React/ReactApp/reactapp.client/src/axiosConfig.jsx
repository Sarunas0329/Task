import axios from "axios";

const baseURL = "http://localhost:5000";
console.log("Axios baseURL:", baseURL);

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
