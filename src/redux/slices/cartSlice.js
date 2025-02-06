import {createSlice} from "@reduxjs/toolkit";


const calculateTotalPrice = (cartItems) => {
    console.log(cartItems)
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cartItems: [],
        totalPrice: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const { product, quantity } = action.payload;

            const existingProductIndex = state.cartItems.findIndex(item => item.id === product.id);

            //check if product exist
            if (existingProductIndex !== -1) {
                state.cartItems[existingProductIndex].quantity += quantity || 1;
            } else {
                state.cartItems.push({ ...product, quantity: quantity || 1 });
            }
        },
        clearAllProduct: (state,action) => {
            state.cartItems = action.payload
        },
        deleteById:(state,action) => {
            const indexToDelete = state.cartItems.findIndex(item => item.id === action.payload);

            if (indexToDelete !== -1) {
                state.cartItems.splice(indexToDelete, 1);
            }


        },

        calculateTotal: (state) => {
            state.totalPrice = calculateTotalPrice(state.cartItems);
        },
    }
});

export const {addProduct,calculateTotal ,clearAllProduct,deleteById,calculateCart} = cartSlice.actions;
export default cartSlice.reducer;