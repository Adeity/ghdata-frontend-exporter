import axios from "axios";
import {allResearchNumbersUrl} from "./UrlConstantHolder";

function sendGetActiveResearchNumbersRequest() {
    return axios(
        {
            method: "get",
            url: allResearchNumbersUrl,
            withCredentials: true
        }
    )
}

export {sendGetActiveResearchNumbersRequest}
