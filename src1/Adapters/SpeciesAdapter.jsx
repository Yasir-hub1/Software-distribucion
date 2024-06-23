
import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";




async function listSpecies(){
    try {
        let response = await axios.get("/species/list-species");

        // //console.log("getESpecises ",response.data.data);
        return response.data.data;

    } catch (error) {

        //console.log("ERROR ESPECIES ",error);

        throw errorHandler(error);

    }
}


async function registerSpecie(data){
   //console.log("data EsPECIER ",data);
    try {
        let response=await axios.post("/species/create-specie",data);

        // //console.log("esp back",response.data);
        return response.data;
    } catch (error) {
        //console.log("ERROR ESPECIES ",error);

        throw errorHandler(error);
    }

}

async function editSpecies(id,name){
    try {
        let response=await axios.put("/species/update-specie/"+id,name);
        // //console.log("esp back",response.data);
        return response.data;
    } catch (error) {
        //console.log("ERROR ESPECIES ",error);

        throw errorHandler(error);
    }

}


async function countSpecie(){

    try {
        let { user } = await localStorage.loadUserData();
        //console.log("BACK USER ", user.id);
        let data={
            user_id:user.id
        }
       
         let response = await axios.post("/species/count-specie",data );
 
         //console.log("COUNT Epeciesa ", response.data);
 
          return response.data;
 
     } catch (error) {
 
         //console.log("ERROR COUNT ", error.message);
 
         throw errorHandler(error);
 
     }

}

async function deleteSpeciesForId(id_species) {
    try {
        let response = await axios.get("/species/delete-by-id/"+id_species);
        // //console.log("BACK CUSTOMER", response.data.data);
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}


export const speciesAdapter={
    listSpecies,
    registerSpecie,
    editSpecies,
    countSpecie,
    deleteSpeciesForId
}