import axios from "axios";
import {checkAuthorizedUrl, dummyUrl} from "./components/UrlConstantHolder";

function checkAuthorized() {
    return axios.get(checkAuthorizedUrl, {withCredentials: true})
}

export {checkAuthorized}