import axios from "axios";
import {exportSleepsUrl} from "../UrlConstantHolder";

function sendExportSleepsRequest (dateFrom, dateTo, reseaorchNumbers) {
    let researchNumbersParam = ""
    reseaorchNumbers.forEach((e, i) => {
        researchNumbersParam += e
        if (i < reseaorchNumbers.length - 1) {
            researchNumbersParam += ","
        }
    })

    const params = {
        "from": new Date(dateFrom).valueOf(),
        "to": new Date(dateTo).valueOf(),
        "researchNumbers": researchNumbersParam
    }
    return axios
        .get(
        exportSleepsUrl,
        {
            withCredentials: true,
            responseType: "blob",
            params: params
        },

    )
    // return axios(
    //     {
    //         method: "post",
    //         url: exportSleepsUrl,
    //         headers: {"Content-Type": "application/json"},
    //         data: {
    //             dateFrom: dateFrom,
    //             dateTo: dateTo,
    //             researchIds: researchNumbersParam
    //         },
    //         withCredentials: true,
    //         responseType: 'arraybuffer',
    //     }
    // )
}

export {sendExportSleepsRequest}