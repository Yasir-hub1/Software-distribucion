import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";


export async function orderInProgreso(){
    try {
        const {customer} = await localStorage.loadUserDriverData();
        let response= await axios.get("/show-orders-progres/?id_driver="+customer.id);
        // console.log("resBack customer ", customer.id, " resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}


export async function orderInPendiente(){
    try {
        const {userDriver} = await localStorage.loadUserDriverData();
        // console.log("resBack userDriver PENDIENTE ", userDriver, " resp ");

        let response= await axios.get("/show-orders-driver-pendiente/?id_driver="+userDriver.id);
        // console.log("resBack userDriver PENDIENTE ", userDriver, " resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}


export async function orderInCompletado(){
    try {
        const {userDriver} = await localStorage.loadUserDriverData();
        let response= await axios.get("/show-orders-driver-completado/?id_driver="+userDriver.id);
        // console.log("resBack customer Terminado ", userDriver, " resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}

export async function orderNextsToday(){
    try {
        const {userDriver} = await localStorage.loadUserDriverData();
        let response= await axios.get("/show-next-orders-driver/?id_driver="+userDriver.id);
        // console.log("resBack customer Terminado ", userDriver, " resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}

export async function orderStart(id_order){
    try {
      
        let response= await axios.post("/orders-start",{id_order:id_order});
        // console.log("resBack START  resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}


export async function orderComplet(data){
    try {
      
        let response= await axios.post("/orders-complet",data);
        // console.log("resBack START/  resp ",response.data);
     
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}
export const orderAdapter = {
    orderInProgreso,orderInPendiente,orderInCompletado,orderNextsToday,orderStart,orderComplet
   
}