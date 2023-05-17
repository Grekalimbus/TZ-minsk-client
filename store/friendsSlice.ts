import { FriendType } from "@/types/friend";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendsService from "@/services/friends.service";

export const fetchFriends = createAsyncThunk(
  "friends/getFriends",
  async () => {       
     const data = await friendsService.getAll()      
     return data           
  }
);

type StateType = {
  entities: FriendType[] |  null;
  loading: boolean;
}; 

const initialState: StateType = {
  entities: null,
  loading: false  
} 

const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state, action) => {
        state.loading = true;
    });

    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = action.payload
    });    
  },
});


export default friendsSlice.reducer;