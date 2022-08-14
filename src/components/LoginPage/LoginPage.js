import React from "react";
import './LoginPage.css'
import Form from 'react-bootstrap/Form'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {authenticate} from "./AxiosAuthenticator";
import {validateInput} from "./LoginInputValidator";
import "../Errors/ErrorMessage.css"
import {Navigate} from "react-router-dom"
import "../FormPage.css"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            err: null,
            redirect: false
        }
    }

    setErrorState(message) {
        this.setState({err: message})
    }

    setRedirect(redirect) {
        this.setState({redirect: redirect})
    }

    handleSubmitClick() {
        this.setState({err: null})
        try {
            validateInput(this.state.username, this.state.password)
            authenticate(this.state.username, this.state.password)
                .then((res) => {
                    if (res.data.success) {
                        this.props.setLoggedUser(res.data.username)
                        this.setRedirect(true)
                    } else {
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

    render() {
        const {redirect} = this.state
        if (redirect) {
            return <Navigate to='/'/>
        }
        return (
            <div className="FormPage">
                <Card>
                    <Card.Header>
                        Prihlasit se
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="oldPassword">
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

export default LoginPage;