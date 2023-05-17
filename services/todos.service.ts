import { TodoType } from "@/types/todo";
import httpService from './http.service'


class todosService{
    constructor(){}   

    async create(payload: TodoType){
        try{
            const {data} = await httpService.post('todo/',payload)
            return data
        }
        catch(error){
            console.log(error);
            
        }
    }    

    async getAll(){
        try {
            const { data } = await httpService.get('todo/');                    
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);            
        }
    }      

    async update(todoId: string, payload: TodoType){
        try{
            const {data} = await httpService.patch(`todo/${todoId}`, payload)
            return data
        }
        catch(error){
            console.log(error);
        }
    }

    async delete(id: string){
        try{
            const data = await httpService.delete(`todo/${id}`)
            return id
        }
        catch(error){
            console.log(error);
        }
    }
          
}

export default new todosService()