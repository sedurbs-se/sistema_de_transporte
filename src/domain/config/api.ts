import axios from "axios";
import { NextPageContext } from "next";
import { getCookies } from "./cookies";

function getAxiosInstance(ctx?: NextPageContext) {

  const { token } = getCookies(ctx)

  const baseURL = process.env.NODE_ENV === 'production' ?
    process.env.BASE_URL_PROD :
    process.env.BASE_URL_DEV;

  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ?? ''}`
    },
  });

}

export const api = getAxiosInstance();
