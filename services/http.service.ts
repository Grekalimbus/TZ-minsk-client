import axios, { AxiosRequestHeaders } from "axios";
import config from '../config.json'
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: config.api
});
axios.defaults.baseURL = config.api;

http.interceptors.request.use(
    async function (config) {                 
        const expiresDate = localStorageService.getTokenExpiresDate();
        const refreshToken = localStorageService.getRefreshToken();
        const accessToken = localStorageService.getAccessToken();              
        const isExpired = refreshToken && Number(expiresDate) < Number(Date.now());                                  
        
        if (isExpired) {           
            const data:any = await authService.refreshToken();                                   
            localStorageService.setTokens(data);
            window.location.reload()
        }
        if (accessToken) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${accessToken}`
            } as AxiosRequestHeaders; 
          }
        return config;        
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response < 500;
        if (!expectedErrors) {
            if (error.message === "INVALID_PASSWORD") {
                console.log("INVALID_PASSWORD", error);                
            }
            if (error.message === "Network Error") {
                console.log(error);
            }
            if (
                error.message === "Request failed with status code 400" ||
                error.code === 400
            ) {
                console.log("Пользователь с таким email уже зарегестрирован",error);
                
            } else {
                console.log(error);               
            }
        }
        return Promise.reject(error);
    }
);

export default http;