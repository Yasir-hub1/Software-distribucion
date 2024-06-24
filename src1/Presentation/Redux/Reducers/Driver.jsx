import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    driver: null,

};



export const driverSlice = createSlice({
    name: "driver",// nombre al que hace referencia al usar selectores
    initialState,
    reducers: {
        createDriver: (state, action) => {
            // console.log("CREATE driver", action.payload,state);

            state.driver = action.payload;// alamcena en el state lo que recibe desde la vista
        },
        updateDriver: (state, action) => {
            //console.log("UPDATE city", action.payload);

            state.driver = action.payload;// alamcena en el state lo que recibe desde la vista

        },
        clearDriver: (state) => {
            //console.log("clearCompany city", state);
            state.driver = null;
        },

    }
})


export const { createDriver, updateDriver, clearDriver } = driverSlice.actions;
export default driverSlice.reducer