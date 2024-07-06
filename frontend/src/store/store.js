import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../store/userSlice.js'
import postReducer from '../store/postSlice.js'

const store=configureStore({
    reducer: {
        user:userReducer,
        post:postReducer
    },
});
export default store
