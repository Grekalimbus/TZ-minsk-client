import httpService from './http.service'



class usersService{
    constructor(){}   

    async getAll(){
        try {
            const { data } = await httpService.get('users/');                    
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);            
        }
    }  

    async updateImage(id:string, payload:{image: string}){
        try {
            const {data} = await httpService.patch(`users/${id}`, payload)
            return data;
        } catch (error: any) {
            console.log(error.response.data.message);            
        }
    }

    async delete(id: string){
        try {
            const {data} = await httpService.delete(`users/${id}`)
            return id;
        } catch (error: any) {
            console.log(error.response.data.message);            
        }
    }
    
}

export default new usersService()