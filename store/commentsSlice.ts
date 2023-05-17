import { CommentType } from "@/types/comment";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from '@/services/comments.service';

export const fetchComments = createAsyncThunk(
  "comments/getComments",
  async () => {       
     const data = await commentsService.getAll()          
     return data         
  }
);

type StateType = {
  entities: CommentType[] | null;
  loading: boolean;
}; 

const initialState: StateType = {
  entities: null,
  loading: false  
} 

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchComments.pending, (state, action) => {
        state.loading = true;
    });

    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload
    });    
  },
});


export default commentsSlice.reducer;