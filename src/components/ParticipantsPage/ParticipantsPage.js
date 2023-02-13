import React, {useEffect, useState} from "react";
import axios from "axios";
import {allResearchNumbersUrl} from "../AxiosRequestor/UrlConstantHolder";
import {getActiveDescription} from "./ParticipantsUtils";
import {Link} from "react-router-dom";
import StatusInfoComponent from "../StatusInfoComponent";

function ParticipantsPage(props) {

    const a = [
        {
            id: 3,
            researchNumber: "oeuth",
            allowed: false,
            deregistrationTime: "20.30.20"
        },
        {
            id: 3,
            researchNumber: "oeuth",
            allowed: true,
        },
        {
            id: 3,
            researchNumber: "oeuth",
            allowed: false,
        },
    ]

    const [participants, setParticipants] = useState([])
    useEffect(() => {
        axios(
            {
                method: "get",
                url: allResearchNumbersUrl,
                withCredentials: true
            }
        ).then((res) => {
            setParticipants(res.data)
        }).catch((e) => {
            console.error(e)
        })
    }, [])

    const p = participants.map((e, index) => {
        const deregistered = e.deregistrationTime !== undefined ? (
            <div className={"col-sm-3 border-start"}>
                <b>Odhlásil se:</b> {e.deregistrationTime}
            </div>

        ) : null
        return (
            <div key={index} className={"row border-bottom  pb-3 mb-3"}>
                <div className={"col-sm-4 border-start"}>
                    <b>#{index}: </b>
                    <span className={""}>{e.researchNumber}</span>
                </div>
                <div className={"col-sm border-start"}>
                    <b>Status:</b> <StatusInfoComponent allowed={e.allowed} deregistrationTime={e.deregistrationTime}/>
                </div>
                {deregistered}
            </div>
        )
    })
    return (
        <div>
            <h6>Seznam účastníků</h6>
            {p}
        </div>
    )
}


export default ParticipantsPage