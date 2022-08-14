import axios from "axios";
import {logoutUrl, changePasswordUrl} from "../UrlConstantHolder";

function sendLogoutRequest () {
    return axios(
        {
            method: "post",
            url: logoutUrl,
            withCredentials: true
        }
    )
}

function sendChangePasswordRequest(oldPassword, newPassword, newPasswordRepeated) {
    return axios(
        {
            method: "post",
            url: changePasswordUrl,
            headers: {"Content-Type": "application/json"},
            data: {
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "newPasswordRepeated": newPasswordRepeated
            },
            withCredentials: true
        }
    )
}

export {sendLogoutRequest, sendChangePasswordRequest}
