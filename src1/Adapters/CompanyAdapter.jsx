

import { config } from "../Config";
import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import * as SecureStore from "expo-secure-store";
import { localStorage } from "./LocalStorageAdapter";




async function editCompany(id_company, data) {
    //console.log("id " + id_company, "data " + JSON.stringify(data));
    try {
        let response = await axios.post("/company/update-company/" + id_company, data);
      /*   console.log(
            "response BACK2 city", response.data.data.city,
            "response BACK2 company", response.data.data.company
        ); */
        await localStorage.saveUserCompanyData(response.data.data.company);
        await localStorage.saveUserCityData(response.data.data.city);
        return response.data;
    } catch (error) {
        console.error('Error en la petición:', error);

        throw errorHandler(error);
    }
}
async function editCompanyWithImage(id_company, data, image) {

    //console.log("CON IMAGEN ", "id " + id_company, "data " + JSON.stringify(data.id_company), "image ", image);
    try {
        const formData = new FormData();
        formData.append('company-logo', {
            uri: image,
            name: image.split('/').pop(), // Obtiene el nombre del archivo de la URL
            type: 'image/*',
        });
        formData.append('name', data.name);
        formData.append('address', data.address);
        formData.append('city_id', data.city_id);
        formData.append('name', data.name);
        formData.append('nit', data.nit);
        formData.append('phone', data.phone);
        const access_token = await SecureStore.getItemAsync(config.USER_TOKEN_KEY);


        const response = await fetch(`${config.BASE_URL}/company/update-company/` + data.id_company, {
            method: 'POST',
            body: formData,
            headers: {
                // "Content-Type": "application/json",
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + access_token,
            }
        });

        if (response.ok) {
            const responseData = await response.json();
           /*  //console.log('Respuesta:', responseData);
            //console.log(
                "response BACK2 cityIMG", responseData.data.city,
                "responseData BACK2 companyIMG", responseData.data.company
            ); */
            await localStorage.saveUserCompanyData(responseData.data.company);
            await localStorage.saveUserCityData(responseData.data.city);
            return responseData;


        } else {

            console.error('Error en la petición: ELSE', JSON.stringify(response));

        }
    } catch (error) {
        console.error('Error en la petición:', error);

        throw errorHandler(error);

    }
}

async function verifyEmailCompany() {
    try {
        let { userCompany } = await localStorage.loadUserCompanyData();

        //console.log("response BACK2 id_company", userCompany.id);
        let response = await axios.post("/company/verify-email/" + userCompany.id);

       /*  //console.log(

            "response BACK2 response.data", response.data,
        ); */

        return response.data;


    } catch (error) {

        console.error('Error en la petición: Veiry', error.message);


        throw errorHandler(error);


    }

}
export const companyAdapter = {
    editCompany,
    editCompanyWithImage,
    verifyEmailCompany
}
