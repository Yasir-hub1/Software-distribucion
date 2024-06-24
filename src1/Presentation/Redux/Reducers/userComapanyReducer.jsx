

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userCompany: null,

};



export const userCompanySlice = createSlice({
    name: "userCompany",// nombre al que hace referencia al usar selectores
    initialState,
    reducers: {
        createCompany: (state, action) => {
            //console.log("CREATE COMPANY", action.payload);
            
            state.userCompany =action.payload;// alamcena en el state lo que recibe desde la vista
        },
        updateCompany: (state, action) => {
            //console.log("UPDATE COMPANY", action.payload);
            
            state.userCompany = action.payload;// alamcena en el state lo que recibe desde la vista

        },
        clearCompany: (state) => {
            //console.log("clearCompany COMPANY" );
            state.userCompany = null;
        },

    }
})


export const { createCompany, updateCompany, clearCompany } = userCompanySlice.actions;
export default userCompanySlice.reducer