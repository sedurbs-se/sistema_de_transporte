import axios from "axios";
import { NextPageContext } from "next";
import { getCookies } from "./cookies";

function getAxiosInstance(ctx?: NextPageContext) {

  const { token } = getCookies(ctx)

  return axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ?? ''}`
    },
  });

}

export const api = getAxiosInstance();
