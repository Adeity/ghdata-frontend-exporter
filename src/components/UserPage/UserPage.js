import React from "react";
import ChangePasswordCard from "./ChangePasswordCard";
import './UserPage.css'
import Button from "react-bootstrap/Button";
import {Col, Row} from "react-bootstrap";
import {sendLogoutRequest} from "../AxiosRequestor/AxiosRequestor";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }

    async handleLogoutButtonClick() {
        await sendLogoutRequest()
            .then((res) => {
                console.log(res)
                if (!res.loggedIn) {
                    this.props.setLoggedUser(null)
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }


    render () {
        return (
            <div className="UserPage form-signin">
                        <h4>Uživatelská stránka</h4>
                        <p>Přihlášen jako: {this.props.username}</p>
                        <ChangePasswordCard />
                        <h6 className={"pt-3"}>Odhlášení</h6>
                        <div className={"d-flex justify-content-center"}>
                            <Button onClick={() => this.handleLogoutButtonClick()}>Odhlásit se</Button>
                        </div>
            </div>
        )
    }
}

export default UserPage