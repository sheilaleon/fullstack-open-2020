import axios from 'axios';
const BASE_URL = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(BASE_URL);
};

const create = (newObject) => {
  return axios.post(BASE_URL, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${BASE_URL}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

// eslint-disable-next-line
export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
};
