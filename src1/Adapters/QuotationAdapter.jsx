

import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";




async function getListByIdUser(data) {

    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);
        let response = await axios.post("quotation/get-list-by-user/" + user.id, data);

        //console.log("getListByIdUser ", response.data.data);
        return response.data.data;

    } catch (error) {

        //console.log("ERROR getListByIdUser ", error);

        throw errorHandler(error);

    }
}

async function sendEmailQuotation(id_quote) {
    try {

        //console.log("idQuote ", id_quote);
        let response = await axios.post("quotation/send-email/" + id_quote);

        //console.log("sendEmailQuotation ", response.data);

        return response.data;

    } catch (error) {

        //console.log("ERROR sendEmailQuotation ", error.message);

        throw errorHandler(error);

    }
}

async function countQuotation() {

    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);
        let data = {
            user_id: user.id
        }

        let response = await axios.post("quotation/count-quotation", data);

        //console.log("COUNT ", response.data);

        return response.data;

    } catch (error) {

        //console.log("ERROR COUNT ", error.message);

        throw errorHandler(error);

    }

}


async function registerQuotation(data) {
    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);

        data.user_id = user.id


        //console.log("dataquote ", data);

        let response = await axios.post("quotation/create-quotation", data);

       // console.log("BACK squotation ", response.data);

        return response.data;

    } catch (error) {

      //  console.log("ERROR  ", error.message);

        throw errorHandler(error);

    }
}


async function getCustomerForQuote(id_quote) {
    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);

        let data =
        {
            user_id: user.id,
            id_quote: id_quote,
        }




        //console.log("dataquotePDF ", data);

        let response = await axios.post("quotation/get-customer-quotation", data);

        //console.log("BACK squotation ", response.data);

        return response.data.data;

    } catch (error) {

        //console.log("ERROR  ", error.message);

        throw errorHandler(error);

    }
}


async function editQuoteForId(id_quote) {
    try {
        let resp = await axios.get("quotation/get-by-id/" + id_quote)
       // console.log("----DETALLE DE QUOTE EDIT ", resp.data.data);
        return resp.data.data;
    } catch (error) {
      //  console.log("ERROR  ", error.message);

        throw errorHandler(error);
    }
}


async function updateQuote(quote){
    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);

        quote.user_id = user.id


        //console.log("DATA ENTRANTE  UPDATE QUOTE ", quote);

        let response = await axios.post("quotation/update/"+quote.id, quote);

        //console.log("RESP UPDATE QUOTE ", response.data);

        return response.data;

    } catch (error) {

       // console.log("ERROR  ", error.message);

        throw errorHandler(error);

    }
}

 async function disableQuote(id_quote){
    try {
        let resp = await axios.get("quotation/delete-by-id/" + id_quote)
        //console.log("----DETALLE DE QUOTE DISABLE ", resp.data);
        return resp.data;
    } catch (error) {
        //console.log("ERROR  ", error.message);

        throw errorHandler(error);
    }
 }


 async function listQuoteActive(){
    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);

        let user_id = user.id


        let response = await axios.post("quotation/get-list-quote-active-by-user/"+user_id);

        //console.log("RESP UPDATE ACTIVE ", response.data.data);

        return response.data.data;

    } catch (error) {

        //console.log("ERROR  ", error.message);

        throw errorHandler(error);

    }
 }





export const quotationAdapter = {
    getListByIdUser,
    listQuoteActive,
    sendEmailQuotation,
    countQuotation,
    registerQuotation,
    updateQuote,
    getCustomerForQuote,
    editQuoteForId,
    disableQuote

}