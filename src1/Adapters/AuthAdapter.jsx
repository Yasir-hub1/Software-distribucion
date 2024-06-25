// src/adapters/ApiAdapter.js

import { config } from "../Config";
import { showToast } from "../Helper/Helpers";
import { createCustomer } from "../Presentation/Redux/Reducers/Customer";
import { clearCity, createCity } from "../Presentation/Redux/Reducers/userCityReducer";
import { clearCompany, createCompany } from "../Presentation/Redux/Reducers/userComapanyReducer";
import { login, logout } from "../Presentation/Redux/Reducers/userReducer";
import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";
import * as http from "axios";
// Define una función de inicio de sesión que toma dispatch como argumento


async function loginAdapter(dispatch, data) {

  try {
    // Enviando al Backend
    data.device_name = Platform.OS;
    //console.log("local save ", data);
    let response = await axios.post("/login-customer", data);

    console.log("init ", response.data.data);

    //TODO: Guardando en el localStorage
     await localStorage.saveUserData(response.data.data);
     await localStorage.saveUserCustomerData(response.data.data.customer);
  
     dispatch(createCustomer(response.data.data.customer));
     dispatch(login(response.data.data));
     showToast("Bienvenido", config.COLOR_SUCCESS);
  } catch (e) {
    throw errorHandler(e);
  }
}

 async function SingUpdapter(dispatch, data) {


  try {
    //console.log("entrando con imagen");
    data.device_name = Platform.OS;


    console.log("DATA CCREATE ",data)
    let response = await axios.post("/signup-customer", data);
      //console.log('Respuesta:', resp.data.city);
      await localStorage.saveUserData(response.data.data);
      await localStorage.saveUserCustomerData(response.data.data.customer);
   
      dispatch(createCustomer(response.data.data.customer));
    
      dispatch(login(response.data.data));
      showToast("Cuenta creada", config.COLOR_SUCCESS);

    
  } catch (error) {
    console.error('Error en la petición:', error);

    throw errorHandler(error);

  }



} 





async function logoutAdapter(dispatch) {

  try {
    console.log("ENTRA Logout ");
    //peticion con axios aqui
    let res = await axios.post("logout");
    await localStorage.clearUserData();
    await localStorage.clearUseCustomerData();
    delete axios.defaults.headers.common["Authorization"];
    showToast("Hasta la proxima!", config.COLOR_SUCCESS);
  } catch (error) {

    throw errorHandler(error);

  } finally {

    dispatch(logout());
   
  }

}



export const authAdapter = {
  loginAdapter,
  SingUpdapter,
  logoutAdapter
}
