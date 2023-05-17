import { CommentType } from "@/types/comment";
import httpService from './http.service'

class commentsService{
    constructor(){}   

    async create(payload:CommentType){
        try {
            const { data } = await httpService.post('comments/',payload)            
            return data;
        } catch (error: any) {
            console.log(error);            
        }
    }  

    async getAll(){
        try {
            const { data } = await httpService.get('comments/');                    
            return data;
        } catch (error: any) {
            console.log(error);            
        }
    }      
            
    async delete(id:string){
        try{
            const data = await httpService.delete(`comments/${id}`)
            return id
        }
        catch(error){
            console.log(error);            
        }
    }
}

export default new commentsService()