import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://ims-connect-c78r.onrender.com/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;