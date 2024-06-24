// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import userSlices from '../Reducers/userReducer';
import  userCompanySlice  from "../Reducers/userComapanyReducer";
import  userCitySlice  from "../Reducers/userCityReducer";
import driverSlice  from "../Reducers/Driver";

/* const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer); */

export const store = configureStore({
  reducer: {
    user: userSlices,
    company: userCompanySlice,
    city:userCitySlice,
    driver:driverSlice,
  }
});


