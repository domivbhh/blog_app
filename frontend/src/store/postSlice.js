
import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.post = action.payload;
      console.log(state.post);
    },
   
   
  },
});

// Action creators are generated for each case reducer function
export const {  addPost} = postSlice.actions;

export default postSlice.reducer;