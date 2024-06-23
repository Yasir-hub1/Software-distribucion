
import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";


async function registerCarpentry(data){
     try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);
       data.user_id=user.id;
        let resp=await axios.post("carpentry/create-carpentry",data);
       //  console.log("resp Cartp",resp.data);
         return resp.data;
     } catch (error) {
      //  console.log("error Cartp",error.message);

        throw errorHandler(error);
     }
}

async function listCarpentryActive(){
    let { user } = await localStorage.loadUserData();
    //console.log("BACK USER ", user.id);

    let user_id = user.id


    let response = await axios.post("carpentry/get-list-carpentry-active-by-user/"+user_id);

    //console.log("RESP UPDATE ACTIVE ", response.data.data);

    return response.data.data;
}

async function editCarpentryForId(id_carpentry) {
    try {
        let resp = await axios.get("carpentry/get-by-id/" + id_carpentry)
        //console.log("----DETALLE DE QUOTE EDIT ", resp.data.data);
        return resp.data.data;
    } catch (error) {
        //console.log("ERROR  ", error.message);

        throw errorHandler(error);
    }
}


async function updateCarpentry(carpentry){
    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);

        carpentry.user_id = user.id


        //console.log("DATA ENTRANTE  UPDATE QUOTE ", carpentry);

        let response = await axios.post("carpentry/update/"+carpentry.id, carpentry);

        //console.log("RESP UPDATE QUOTE ", response.data);

        return response.data;

    } catch (error) {

        //console.log("ERROR  ", error.message);

        throw errorHandler(error);

    }
}


async function getCustomerForCarpentry(id_carpentry) {
    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);

        let data =
        {
            user_id: user.id,
            id_carpentry: id_carpentry,
        }
        //console.log("dataquotePDF ", data);

        let response = await axios.post("carpentry/get-customer-carpentry", data);

        //console.log("BACK squotation ", response.data);

        return response.data.data;

    } catch (error) {

        //console.log("ERROR  ", error.message);

        throw errorHandler(error);

    }
}

async function getListByIdUser(data) {

    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);
        let response = await axios.post("carpentry/get-list-by-user/" + user.id, data);

        //console.log("getListByIdUser ", response.data.data);
        return response.data.data;

    } catch (error) {

        //console.log("ERROR getListByIdUser ", error);

        throw errorHandler(error);

    }
}


async function disableCarpentry(id_carpentry){
    try {
        let resp = await axios.get("carpentry/delete-by-id/" + id_carpentry)
        //console.log("----DETALLE DE QUOTE DISABLE ", resp.data);
        return resp.data;
    } catch (error) {
        //console.log("ERROR  ", error.message);

        throw errorHandler(error);
    }
 }


 async function sendEmailCarpentry(id_quote_carpentry) {
    try {

        //console.log("idQuote ", id_quote_carpentry);
        let response = await axios.post("carpentry/send-email-carpentry/" + id_quote_carpentry);

     //   console.log("sendEmailQuotation ", response.data);

        return response.data;

    } catch (error) {

        //console.log("ERROR sendEmailQuotation ", error.message);

        throw errorHandler(error);

    }
}


export const carpentryAdapter={
    registerCarpentry,
    listCarpentryActive,
    editCarpentryForId,
    updateCarpentry,
    getCustomerForCarpentry,
    getListByIdUser,
    disableCarpentry,
    sendEmailCarpentry
}