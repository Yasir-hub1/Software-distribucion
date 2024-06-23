

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    customer: null,

};



export const customerSlice = createSlice({
    name: "customer",// nombre al que hace referencia al usar selectores
    initialState,
    reducers: {
        createCustomer: (state, action) => {
            //console.log("CREATE Customer", action.payload);

            state.customer = action.payload;// alamcena en el state lo que recibe desde la vista
        },
        updateCustomer: (state, action) => {
            //console.log("UPDATE Customer", action.payload);

            state.customer = action.payload;// alamcena en el state lo que recibe desde la vista

        },
        clearCustomer: (state) => {
            //console.log("clearCompany Customer", state);
            state.customer = null;
        },

    }
})


export const { createCustomer, updateCustomer, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer