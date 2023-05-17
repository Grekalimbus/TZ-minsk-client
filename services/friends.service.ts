import { FriendType } from "@/types/friend";
import httpService from './http.service'

class friendsService{
    constructor(){}   

    async getAll(){
        try {
            const { data } = await httpService.get('friends/');                    
            return data;
        } catch (error) {
            console.log(error);            
        }
    }     

    async create(payload:FriendType){
        try{
            const {data} = await httpService.post('friends/', payload)
            return data;
        }
        catch(error){
            console.log(error);   
        }
    }

    async update (id:string, payload:FriendType){
        try{
            const {data} = await httpService.patch(`friends/${id}`, payload)
            return data;
        }
        catch(error){
            console.log(error);   
        }
    }

    async delete (id:string){
        try{
            const {data} = await httpService.delete(`friends/${id}`)
            return id;
        }
        catch(error){
            console.log(error);   
        }
    }

         
}

export default new friendsService()