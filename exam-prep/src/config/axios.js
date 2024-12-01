import axios from "axios";
const baseURL = "https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json";
const config = {
    baseURL,
};
const api = axios.create(config);
api.defaults.baseURL = baseURL;

const handleBefore = (config) => {
    return config;
  };

const handleError = (error) => {
    console.log(error);
    return;
};
api.interceptors.request.use(handleBefore, handleError);

export default api;