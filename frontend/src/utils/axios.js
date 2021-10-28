import axios from "axios";
const accessToken = localStorage.getItem("token");
// axios.interceptors.request.use(
//   (config) => {
//     config.headers.authorization = accessToken;
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );
const authAxios = axios.create({
  baseURL: process.env.REACT_APP_HOST,
  headers: {
    Authorization: accessToken,
  },
});
export default authAxios;
