import { TodoType } from "@/types/todo";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import todosService from '@/services/todos.service';

export const fetchTodos = createAsyncThunk(
  "todos/getTodos",
  async () => {       
     const data = await todosService.getAll()           
     return data
  }
);

type StateType = {
  entities: TodoType[] |  null;
  loading: boolean;
}; 

const initialState: StateType = {
  entities: null,
  loading: false  
} 

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
        state.loading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload
    });    
  },
});


export default todosSlice.reducer;