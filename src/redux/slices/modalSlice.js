import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name:'modal',
    initialState:{
        modalOpen: false
    },
    reducers:{
        modalOpen:(state,action) => {
            state.modalOpen = action.payload;
        },

        modalClose:(state,action) => {
            state.modalOpen = action.payload;
        }
    }
})

export const { modalOpen, modalClose } = modalSlice.actions;
export default modalSlice.reducer;