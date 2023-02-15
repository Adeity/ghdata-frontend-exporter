import {getActiveDescription} from "./ParticipantsPage/ParticipantsUtils";

function StatusInfoComponent({allowed, deregistrationTime}) {
    const {name, description} = getActiveDescription(allowed, deregistrationTime)

    return (
        <span>
            {name}
            <span title={description}>&#8505;</span>
        </span>
    )
}

export default StatusInfoComponent