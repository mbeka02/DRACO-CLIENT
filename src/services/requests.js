import axios from "axios";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

//generic get request fn , pass endpoint to it
const getData = async (endpoint) => {
  const response = await instance.get(endpoint);
  return response.data;
};

export { getData };
