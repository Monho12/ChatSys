import axios from "axios";

export const getAuthorizationHeader = () =>
  `${window.localStorage.token ? window.localStorage.token : ""}`;
export const client = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 5000,
  headers: {
    authorization: getAuthorizationHeader(),
  },
});
