import axios from "axios";
import { NextPageContext } from "next";
import { getCookies } from "./cookies";

function getAxiosInstance(ctx?: NextPageContext) {

  const { token } = getCookies(ctx)

  const baseURL = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ?
    process.env.NEXT_PUBLIC_BASE_URL_PROD :
    process.env.NEXT_PUBLIC_BASE_URL_DEV;
  return axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token ?? ''}`
    },
  });

}

export const api = getAxiosInstance();
