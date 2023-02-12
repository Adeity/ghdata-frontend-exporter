import React, {useEffect} from "react";
import "./RestrictedRouteLocked.css"
import "./RestrictedRouteAllowed.css"
import {useNavigate} from "react-router-dom";

const RestrictedRoute = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (props.authorizationConstants.authorizationChecked) {
            if (!props.authorizationConstants.isLoggedIn) {
                navigate("/login")
            }
        }
    }, [props.authorizationConstants.isLoggedIn, props.authorizationConstants.authorizationChecked, navigate])

    const isAuthorized = props.authorizationConstants.isLoggedIn && props.authorizationConstants.authorizationChecked;
    // const isAuthorized = true
    const page = isAuthorized ? props.children : null
    const classname = isAuthorized ? "RestrictedRouteAllowed" : "RestrictedRouteLocked"
    return (
        <div className={classname}>
            {page}
        </div>
    )
}

export default RestrictedRoute