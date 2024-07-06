import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user:''
  },
  reducers: {
    addUser:(state,action)=>{
        state.user=action.payload
        console.log(state.user)
    },
    removeUser:(state,action)=>{
        state.user=''
        console.log(state.user);

    }
}

});

// Action creators are generated for each case reducer function
export const {addUser,removeUser} = userSlice.actions;

export default userSlice.reducer;
