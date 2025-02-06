import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token: Cookies.get('TOKEN') || null,
    },
    reducers:{
        setToken:(state,action) => {
            Cookies.set('TOKEN',action.payload)
            state.token = action.payload;
        },

        clearToken:(state) => {
            state.token = null
        }
    }
})

export const { setToken, clearToken } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;