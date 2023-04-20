import axios from "axios";

export const getAuthorizationHeader = () =>
  `${window.localStorage.token ? window.localStorage.token : ""}`;
export const client = axios.create({
  // baseURL: "http://localhost:7000/",
  baseURL: "https://chatsysapi.onrender.com/",
  headers: {
    authorization: getAuthorizationHeader(),
  },
});
