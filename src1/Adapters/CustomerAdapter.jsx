


import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";

async function getListCustomer() {
    try {
        let response = await axios.get("/customer/list-customer");
        // //console.log("BACK CUSTOMER", response.data.data);
        return response.data.data;
    } catch (error) {
        throw errorHandler(error);
    }
}

async function createCustomer(data) {

    try {
        //console.log("data Create ", data);
        let response = await axios.post("/customer/create-customer", data);
        // //console.log("back create customer ", response.data);
        return response.data;

    } catch (error) {
        //console.log("error ", error);
        throw errorHandler(error);
    }
}
async function editCustomer(id_customer, updateCustomer) {
    //console.log("edit data ", id_customer, updateCustomer);
    try {
        let response = await axios.put("/customer/update-customer/" + id_customer, updateCustomer);
        // //console.log("res", response.data);
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}

async function countCustomer(){

    try {
        let { userCompany } = await localStorage.loadUserCompanyData();
        //console.log("BACK userCompany ", userCompany.id);
        let data={
            company_id:userCompany.id
        }
       
         let response = await axios.post("/customer/count-customer",data );
 
         //console.log("COUNT Customer ", response.data);
 
          return response.data;
 
     } catch (error) {
 
         //console.log("ERROR Customer ", error.message);
 
         throw errorHandler(error);
 
     }

}


async function deleteCustomerForId(id_customer) {
    try {
        let response = await axios.get("/customer/delete-by-id/"+id_customer);
        // //console.log("BACK CUSTOMER", response.data.data);
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}

export const customerAdapter = {
    getListCustomer,
    createCustomer,
    editCustomer,
    countCustomer,
    deleteCustomerForId
}


