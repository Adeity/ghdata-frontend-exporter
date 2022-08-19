import axios from "axios";
import {getActiveResearchNumbersUrl} from "../UrlConstantHolder";

function sendGetActiveResearchNumbersRequest() {
    return axios(
        {
            method: "get",
            url: getActiveResearchNumbersUrl,
            withCredentials: true
        }
    )
}

export {sendGetActiveResearchNumbersRequest}
