import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usersService from "@/services/users.service";
import { UserType } from '@/types/user';


export const fetchUsers = createAsyncThunk(
    "users/getUsers",
    async () => {      
      const data = await usersService.getAll()   
      const dataMap = data.map(({_id, userTag, email, image}: UserType)=> {
        return {_id, userTag, email, image}
      })               
      return dataMap
    }
);

type StateType = {
  entities: UserType[] |  null;
  loading: boolean;
}; 

const initialState: StateType = {
  entities: null,
  loading: false  
} 

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload
    });    
  },
});


export default usersSlice.reducer;