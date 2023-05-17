import axios from "axios";
import config from '../config.json'
import localStorageService from "./localStorage.service";
import { toast } from 'react-toastify';

const httpAuth = axios.create({
    baseURL: config.api + "auth/"
});



class authService{
    constructor(){}   

    async login(email: string, password: string){
        try {
            const { data } = await httpAuth.post("login", {                
                email,
                password                
            });
            localStorageService.setTokens({ ...data });            
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);
            return toast.dark(error.response.data.message)
        }
    }

    async registration(userTag: string,email: string, password: string){
        try {
            const { data } = await httpAuth.post("registration", {    
                userTag,            
                email,
                password                
            });
            localStorageService.setTokens({ ...data });            
            return data;
        } catch (error:any) {
            console.log(error.response.data.message);
            return toast.dark(error.response.data.message)            
        }
    }

    async refreshToken(){
       try{
        const refreshToken = localStorageService.getRefreshToken();     
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${refreshToken}`,
                };
            const { data } = await httpAuth.post("refresh", {}, { headers });
            localStorageService.setTokens(data);
            return data;         
       
       }
       catch(error){
        console.log(error);
        
       }
    }

}

export default new authService()