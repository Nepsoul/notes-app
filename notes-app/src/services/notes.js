import axios from "axios";
// const baseUrl = "http://localhost:3001/notes";
const baseUrl = "/api/notes"; //using api route //after copying buildfolder,
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  let request = axios.get(baseUrl);
  //return axios.get(baseUrl);
  // console.log(response.data);
  // console.log(response);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.post(baseUrl, newObject, config);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken };

//at lt key of obj and at rt variable defined inside module since, both are same we wrote like this.
//eg. => getAll: getAll
