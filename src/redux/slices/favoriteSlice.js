import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState: {
        favorite: [],
    },
    reducers: {
        addFavorite: (state, action) => {
            const product = action.payload;
            console.log(product)

            const index = state.favorite.findIndex((item) => item.id === product.id);

            if (index === -1) {
                state.favorite = [...state.favorite, { ...product }];
            } else {
                state.favorite.splice(index, 1);
            }
        },
        deleteFavoriteById:(state,action) => {
            const indexToDelete = state.favorite.findIndex(item => item.id === action.payload);

            if (indexToDelete !== -1) {
                state.favorite.splice(indexToDelete, 1);
            }

        }
    },
});

export const { addFavorite,deleteFavoriteById } = favoriteSlice.actions;
export default favoriteSlice.reducer;
