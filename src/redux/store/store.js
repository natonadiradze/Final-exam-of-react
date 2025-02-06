import {configureStore} from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice.js'
import cartReducer from '../slices/cartSlice.js'
import favoriteReducer from '../slices/favoriteSlice.js'
import modalReducer from '../slices/modalSlice.js'
const store = configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer,
        favorite:favoriteReducer,
        modal:modalReducer
    }
})

export default store;