import axios from "axios";
// const baseUrl = "http://localhost:3001/notes";
const baseUrl = "/notes"; //after copying buildfolder,
const getAll = () => {
  //let response = axios.get(baseUrl);
  return axios.get(baseUrl);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

export default { getAll, create, update };

//at lt key of obj and at rt variable defined inside module since, both are same we wrote like this.
//eg. => getAll: getAll
