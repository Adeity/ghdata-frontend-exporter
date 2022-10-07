import axios from "axios";
import {checkAuthorizedUrl} from "./components/AxiosRequestor/UrlConstantHolder";

async function checkAuthorized() {
    return axios.get(checkAuthorizedUrl, {withCredentials: true})
}

export {checkAuthorized}