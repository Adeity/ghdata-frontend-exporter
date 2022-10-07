import axios from "axios";
import {loginUrl} from "./UrlConstantHolder";

function sendAuthenticateRequest (username, password) {
    let bodyFormData = new FormData()
    bodyFormData.append('username', username)
    bodyFormData.append('password', password)
    return axios(
        {
            method: "post",
            url: loginUrl,
            headers: {"Content-Type": "multipart/form-data"},
            data: bodyFormData,
            withCredentials: true
        }
    )
}

export {sendAuthenticateRequest}