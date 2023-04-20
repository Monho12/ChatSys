import axios from "axios";

export const getAuthorizationHeader = () =>
  `${window.localStorage.token ? window.localStorage.token : ""}`;
export const client = axios.create({
  baseURL: "https://chatsysapi.onrender.com/",
  headers: {
    authorization: getAuthorizationHeader(),
  },
});
