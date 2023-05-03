import axios from "axios";
axios.defaults.withCredentials = true;

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

//generic get request fn , pass  the req uri to it
const getData = async (request) => {
  const response = await instance.get(request);
  return response.data;
};

const deleteData = async (request) => {
  const response = await instance.delete(request);
  return response.data;
};

export { getData , deleteData };
