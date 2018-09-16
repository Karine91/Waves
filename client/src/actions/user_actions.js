import axios from "axios";

import { USER_SERVER } from "../components/utils/misc";
import { LOGIN_USER, REGISTER_USER } from "./types";

export const loginUser = dataToSubmit => {
  const payload = axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: LOGIN_USER,
    payload
  };
};

export const registerUser = dataToSubmit => {
  const payload = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then(res => res.data)
    .catch(err => console.log(err));

  return {
    type: REGISTER_USER,
    payload
  };
};
