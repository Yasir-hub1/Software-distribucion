import { config } from "../Config";
import { showToast } from "../Helper/Helpers";
import axios from "../Utils/ConfigAxios";
import errorHandler from "../Utils/ControlError";


export async function getListCitys(){
    try {
        let response= await axios.get("/getListCitys");
        return response.data.data;
    } catch (error) {
        throw errorHandler(error);
    }
}