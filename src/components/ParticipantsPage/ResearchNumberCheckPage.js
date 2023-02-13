import React, {useEffect, useState} from "react";
import axios from "axios";
import {invalidParticipants, updateResearchNumber} from "../AxiosRequestor/UrlConstantHolder";
import {getActiveDescription} from "./ParticipantsUtils";

function ResearchNumberCheckPage(props) {
    const [invalids, setInvalids] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        axios({
            method: "get",
            url: invalidParticipants,
            withCredentials: true
        }).then((res) => {
            const n = res.data.map(e => {
                e["newResearchNumber"] = ""
                e["valid"] = null
                e["errorMessage"] = null
                return e
            })
            setInvalids(n)
            setLoaded(true)
        }).catch(e => {
            console.error(e)
        })
    }, [])

    function updateNewResearchNumberField(e, index) {
        const newInvalids = [...invalids]
        newInvalids[index].newResearchNumber = e.target.value.toUpperCase()
        setInvalids(newInvalids)
    }

    function deleteInvalid(index) {
        setTimeout(() => {
            const newInvalids = [...invalids]
            newInvalids.splice(index, 1);
            setInvalids(newInvalids)
        }, 1200)
    }

    function setValid(index, valid, errorMessage) {
        const nInvalids = [...invalids]
        nInvalids[index].valid = valid
        nInvalids[index].errorMessage = errorMessage
        setInvalids(nInvalids)
    }

    function handleSubmit(index) {
        const invalid = invalids[index]
        const regexp = /^[A-Z0-9]{3}_[A-Z0-9]{3}$/
        // const valid = regexp.test(invalid.newResearchNumber)
        const valid = true
        if (!valid) {
            setValid(index, false, "Vstup není validní.")
            return
        }
        setValid(index, null, null)
        const payload = {
            id: invalid.id,
            newResearchNumber: invalid.newResearchNumber
        }
        axios({
            method: "patch",
            url: updateResearchNumber,
            data: payload,
            withCredentials: true
        }).then(res => {
            setValid(index, true)
            deleteInvalid(index)
        }).catch(e => {
            setValid(index, false, e.response.data.message)
        })
    }

    const emptyMessage = invalids.length === 0 && loaded === true ? <h6 className={"text-success"}>Nebyl nalezen žádný účastník s nevalidním výzkumným číslem.</h6> : null
    const s = invalids.map((e, index) => {
        const invalidClass = e.valid === false ? "is-invalid" : "";
        const validClass = e.valid === true ? "is-valid" : "";
        return (
            <div key={index} className={"row border-bottom mb-3 pb-3 d-flex align-items-center justify-content-start"}>

                <div className={"col-sm-3 col-md-2 border-start"}>
                    <span><b>Účastník #{index+1}:</b> {e.researchNumber}</span>
                </div>
                <div className={"col-sm-3 border-start"}>
                    <div><b>Status:</b> {getActiveDescription(e.allowed, e.deregistrationTime)}</div>
                </div>
                <div className={"col-sm-4 col-md-3 border-start"}>
                    <b>Nové výzkumné č. </b>
                    <input className={"form-control form-control-sm " + invalidClass + " " + validClass}
                           value={e.newResearchNumber}
                           onChange={(e) => updateNewResearchNumberField(e, index)}
                           placeholder={"Např. AC2_A1B"}
                           type={"text"}/>
                    <div className={"invalid-feedback"}>{e.errorMessage}</div>
                    <div className={"valid-feedback"}>Úspěšně změněno.</div>
                </div>
                <div className={"col-sm-2 justify-content-end ms-auto"}>
                    <input type={"button"} className={"btn btn-sm btn-success w-100 mt-2"} value={"Změnit"} onClick={() => handleSubmit(index)}/>
                </div>
            </div>
        )
    })
    return (
        <div className={""}>
            <h5>Kontrola výzkumných čísel</h5>
            <p>Zde jsou jednotliví účastníci výzkumu, kteří nejsou v systému zaregistrovaní validním výzkumným číslem. Validní výzkumné číslo je kombinace šesti alfanumerických znaků oddělených podtržítkem.</p>
            {s}
            {emptyMessage}
        </div>

    )
}

export default ResearchNumberCheckPage