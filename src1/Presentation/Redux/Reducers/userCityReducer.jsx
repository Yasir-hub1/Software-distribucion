

import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userCity: null,

};



export const userCitySlice = createSlice({
    name: "userCity",// nombre al que hace referencia al usar selectores
    initialState,
    reducers: {
        createCity: (state, action) => {
            //console.log("CREATE city", action.payload);

            state.userCity = action.payload;// alamcena en el state lo que recibe desde la vista
        },
        updateCity: (state, action) => {
            //console.log("UPDATE city", action.payload);

            state.userCity = action.payload;// alamcena en el state lo que recibe desde la vista

        },
        clearCity: (state) => {
            //console.log("clearCompany city", state);
            state.userCity = null;
        },

    }
})


export const { createCity, updateCity, clearCity } = userCitySlice.actions;
export default userCitySlice.reducer