import axios from 'axios';

export default axios.create({});

export const authServer = axios.create({
  headers: {
    'Content-type': 'application/x-www-form-urlencoded',
  },
});
