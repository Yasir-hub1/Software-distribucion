import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";


export async function orderInProgreso(){
    try {
        const {customer} = await localStorage.loadUserCustomerData();
        let response= await axios.get("/show-orders-progres/?id_customer="+customer.id);
        // console.log("resBack customer ", customer.id, " resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}


export async function orderInPendiente(){
    try {
        const {customer} = await localStorage.loadUserCustomerData();
        let response= await axios.get("/show-orders-pendiente/?id_customer="+customer.id);
        // console.log("resBack customer PENDIENTE ", customer.id, " resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}


export async function orderInTerminado(){
    try {
        const {customer} = await localStorage.loadUserCustomerData();
        let response= await axios.get("/show-orders-terminado/?id_customer="+customer.id);
        // console.log("resBack customer Terminado ", customer.id, " resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}
export const orderAdapter = {
    orderInProgreso,orderInPendiente,orderInTerminado
   
}