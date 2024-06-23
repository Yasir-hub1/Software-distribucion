import { config } from "../Config";
import { showToast } from "../Helper/Helpers";
import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";
import { localStorage } from "./LocalStorageAdapter";


export async function updateUser(id_user,data){
    try {
        let response= await axios.put("/profile/update-user/"+id_user,data);
        //console.log("resBack UPDATE USER ", response.data.data);
        await localStorage.saveUserData(response.data.data);
        return response.data;
    } catch (error) {
        throw errorHandler(error);
    }
}


export async function verifySuscriptions(){
    try {
        const {user} = await localStorage.loadUserData();
        //console.log("user ",user.id);
        let resp= await axios.get("subscription/verification-subscription/"+user.id);
          //console.log("resp verify ",resp.data);
          return resp.data;
    } catch (error) {
        //console.log("err VERIFISUS ",error.message);
        throw errorHandler(error);
    }
}

export const userAdapter = {
    updateUser,
    verifySuscriptions
   
}