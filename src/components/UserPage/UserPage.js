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
            <div className="UserPage">
                <Row>
                    <Col>
                        <h3>Uzivatelska stranka</h3>
                        <p>Prihlasen jako: {this.props.username}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ChangePasswordCard />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>Odhlaseni</h4>
                        <div className={"d-flex justify-content-center"}>
                            <Button onClick={() => this.handleLogoutButtonClick()}>Odhlasit se</Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserPage