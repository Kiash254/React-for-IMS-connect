import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://melodic-naiad-464d1e.netlify.app/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;