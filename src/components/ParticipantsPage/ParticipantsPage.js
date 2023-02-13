import React, {useEffect, useState} from "react";
import axios from "axios";
import {participantsInformation} from "../AxiosRequestor/UrlConstantHolder";
import {Link, Route, Router, Routes} from "react-router-dom";

function ParticipantsPage(props) {
    const [participants, setParticipants] = useState([])
    // useEffect(() => {
    //     axios(
    //         {
    //             method: "get",
    //             url: participantsInformation,
    //             withCredentials: true
    //         }
    //     ).then((res) => {
    //         console.log(res)
    //     }).catch((e) => {
    //         console.error(e)
    //     })
    // })
    return (
        <h3>Aoooga</h3>
    )
}

export default ParticipantsPage