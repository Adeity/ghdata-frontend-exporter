import React from "react";
import './LoginPage.css'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import InputGroup from'react-bootstrap/InputGroup'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {authenticate} from "./AxiosAuthenticator";
import {validateInput} from "./LoginInputValidator";
import "../Errors/ErrorMessage.css"
import userPage from "../UserPage/UserPage";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            err: null
        }
    }

    setErrorState(message) {
        this.setState({err: message})
    }

    handleSubmitClick() {
        this.setState({err: null})
        try {
            validateInput(this.state.username, this.state.password)
            authenticate(this.state.username, this.state.password)
                .then((res) => {
                    if (res.data.success) {
                        this.props.setLoggedUser(this.state.username)
                    }
                    else {
                        this.setErrorState("Kombinace uzivatelskheo jmena a hesla neexistuje")
                    }
                })
        } catch (e) {
            console.error(e)
            this.setState({err: e.message})
        }
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value})
    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value})
    }

    render () {
        return (
            <div className="ChangePasswordCard">
                <Card>
                    <Card.Header>
                        Prihlasit se
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="oldPassword" >
                                <Form.Label>Uzivatelske jmeno</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Zadejte uzivatelse jmeno"
                                    onChange={(e) => this.handleUsernameChange(e)}
                                    value={this.state.username}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPasswordNew">
                                <Form.Label>Heslo</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Zadejte heslo"
                                    onChange={(e) => this.handlePasswordChange(e)}
                                    value={this.state.password}/>
                            </Form.Group>

                            <div className={"ErrorMessage"}>
                            {
                                this.state.err != null && this.state.err
                            }
                            </div>
                            <Button variant="primary" onClick={() => this.handleSubmitClick()}>
                                Prihlasit se
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
    )
    }
}

export default LoginPage