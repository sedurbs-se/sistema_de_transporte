import axios from "axios";

function getAxiosInstance() {

  return axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

}

export const api = getAxiosInstance();
