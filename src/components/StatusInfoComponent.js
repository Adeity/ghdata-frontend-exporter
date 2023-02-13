import {getActiveDescription} from "./ParticipantsPage/ParticipantsUtils";
import React from "react";

function StatusInfoComponent({allowed, deregistrationTime}) {
    const {name, description} = getActiveDescription(allowed, deregistrationTime)

    return (
        <>
            {name}
            <span title={description}>&#8505;</span>
        </>
    )
}

export default StatusInfoComponent