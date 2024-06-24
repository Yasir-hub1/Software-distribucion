// src/adapters/ApiAdapter.js

import { config } from "../Config";
import { showToast } from "../Helper/Helpers";
import { clearDriver, createDriver } from "../Presentation/Redux/Reducers/Driver";
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
    let response = await axios.post("/login-driver", data);

    console.log("init  ", response.data.data.driver);

    // TODO: Guardando en el localStorage
    await localStorage.saveUserData(response.data.data);
    await localStorage.saveUserDriverData(response.data.data.driver);
   

    dispatch(createDriver(response.data.data.driver))
  
    dispatch(login(response.data.data));
    showToast("Bienvenido", config.COLOR_SUCCESS); 
  } catch (e) {
    throw errorHandler(e);
  }
}

/* async function SingUpdapter(dispatch, data, uriImage) {


  try {
    //console.log("entrando con imagen");
    data.device_name = Platform.OS;



    const formData = new FormData();
    formData.append('image', {
      uri: uriImage,
      name: uriImage.split('/').pop(), // Obtiene el nombre del archivo de la URL
      type: 'image/*',
    });

    formData.append('address', data.address);
    formData.append('city_id', data.city_id);
    formData.append('device_name', data.device_name);
    formData.append('nameCompany', data.nameCompany);
    formData.append('nit', data.nit);
    formData.append('password', data.password);
    formData.append('phone', data.phone);
    formData.append('user', data.user);


    const response = await fetch(`${config.BASE_URL}/signup`, {
      method: 'POST',
      body: formData,
      headers: {
        // "Content-Type": "application/json",
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        // 'Authorization': 'Bearer ' + yourAuthToken,
      }
    });

    if (response.ok) {
      const resp = await response.json();
      //console.log('Respuesta:', resp.data.city);
      await localStorage.saveUserData(resp.data);
      await localStorage.saveUserCompanyData(resp.data.company);  
      await localStorage.saveUserCityData(resp.data.city);

      dispatch(createCompany(resp.data.company))
      dispatch(createCity(resp.data.city))
      dispatch(login(resp.data));
      showToast("Cuenta creada", config.COLOR_SUCCESS);

    } else {

      console.error('Error en la petición: ELSE', JSON.stringify(response));

    }
  } catch (error) {
    console.error('Error en la petición:', error);

    throw errorHandler(error);

  }



} */





async function logoutAdapter(dispatch) {

  try {
    //peticion con axios aqui
    let res = await axios.post("logout");
    await localStorage.clearUserData();
    await localStorage.clearUseDriverData();
  
    delete axios.defaults.headers.common["Authorization"];
    showToast("Hasta la proxima!", config.COLOR_SUCCESS);
  } catch (error) {

    throw errorHandler(error);

  } finally {

    dispatch(logout());
    dispatch(clearDriver());
   
  }

}



export const authAdapter = {
  loginAdapter,
  // SingUpdapter,
  logoutAdapter
}
