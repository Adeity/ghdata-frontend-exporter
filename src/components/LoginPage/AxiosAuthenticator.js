import axios from "axios";
import {loginUrl} from "../UrlConstantHolder";

function authenticate (username, password) {
    let bodyFormData = new FormData()
    bodyFormData.append('username', username)
    bodyFormData.append('password', password)
    return axios(
        {
            method: "post",
            url: loginUrl,
            data: bodyFormData,
            headers: {"Content-Type": "multipart/form-data"},
            withCredentials: true
        }
    )
}

export {authenticate}