import axios from "axios";
import { config } from "../axios-config";
import { getUserToken } from "./storage";

// http is for unauthenticated routes i.e token is not needed
export const http = axios.create({
  baseURL: config.baseURL,
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use(
  (req) => {
    return req;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (res) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// httpAuth is for authenticated routes i.e token is needed
export const httpAuth = axios.create({
  baseURL: config.baseURL,
  headers: { "Content-Type": "application/json" },
});

httpAuth.interceptors.request.use(
  (req) => {
    req.headers.authorization = `Bearer ${getUserToken()}`;
    return req;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

httpAuth.interceptors.response.use(
  (res) => {
    return res;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// axios methods

export function get(url, params) {
  return http({
    method: "get",
    url,
    params,
  });
}

export function post(url, data, params) {
  return http({
    method: "post",
    url,
    data,
    params,
  });
}

export function put(url, data, params) {
  return http({
    method: "put",
    url,
    data,
    params,
  });
}

export function patch(url, data, params) {
  return http({
    method: "patch",
    url,
    data,
    params,
  });
}

export function remove(url, params) {
  return http({
    method: "delete",
    url,
    params,
  });
}
