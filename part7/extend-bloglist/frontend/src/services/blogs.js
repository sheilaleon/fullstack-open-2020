import axios from 'axios';
const baseUrl = '/api/blogs';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (blogId, updateBlog) => {
  const url = `${baseUrl}/${blogId}`;
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(url, updateBlog, config);
  return response.data;
};

const addComment = async (blogId, commentObject) => {
  const url = `${baseUrl}/${blogId}/comments`;
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(url, commentObject, config);
  return response.data;
};

const remove = async (blogId) => {
  const url = `${baseUrl}/${blogId}`;
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(url, config);
  return response.data;
};

export default { getAll, create, update, addComment, remove, setToken };
