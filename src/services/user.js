import { http } from "../utils/http";
import { userEndpoints } from "../utils/endpoint";

export const searchUsers = async (search) => {
  const URL = userEndpoints.search + `?q=${search}`;
  const response = await http.get(URL);
  return response;
};

export const fetchAllUsers = async () => {
  const URL = userEndpoints.users;
  const response = await http.get(URL);
  return response;
};
export const userRegistration = async (credentials) => {
  const URL = userEndpoints.signup;
  const response = await http.post(URL, credentials);
  return response;
};
export const userLogin = async (credentials) => {
  const URL = userEndpoints.login;
  const response = await http.post(URL, credentials);
  return response;
};
