import React from "react";
import './LoginPage.css'
import Form from 'react-bootstrap/Form'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {sendAuthenticateRequest} from "../AxiosRequestor/AxiosRequestor";
import {validateInput} from "./LoginInputValidator";
import "../Errors/ErrorMessage.css"
import {Navigate} from "react-router-dom"
// import "../FormPage.css"
import {Alert} from "react-bootstrap";

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

    async handleSubmitClick(event) {
        event.preventDefault()
        this.setState({err: null})
        try {
            validateInput(this.state.username, this.state.password)
            await sendAuthenticateRequest(this.state.username, this.state.password)
                .then((res) => {
                    if (res.data.success) {
                        this.props.setLoggedUser(res.data.username)
                        this.setRedirect(true)
                    } else {
                        this.setErrorState("Kombinace uživatelského jména a hesla neexistuje.")
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
            <form className={"form-signin h-100 m-auto"}>
                    <h1 className="h3 mb-3 fw-normal">Prosím, přihlašte se</h1>

                    <div className="form-floating">
                        <input value={this.state.username}
                               onChange={(e) => this.handleUsernameChange(e)}
                               className="form-control"
                               id="floatingInput"
                               placeholder="name@example.com"/>
                            <label htmlFor="floatingInput">Uživatelské jméno</label>
                    </div>
                    <div className="form-floating">
                        <input type="password"
                               className="form-control"
                               id="floatingPassword"
                                onChange={(e) => this.handlePasswordChange(e)}
                                value={this.state.password}
                               placeholder="Heslo"/>
                            <label htmlFor="floatingPassword">Heslo</label>
                    </div>

                <div className={"ErrorMessage"}>
                    {
                        this.state.err != null && <Alert variant={"danger"}>{this.state.err}</Alert>
                    }
                </div>
                <button
                    onClick={(event) => this.handleSubmitClick(event)}
                    className="w-100 btn btn-lg btn-primary mt-3"
                        type="submit">Příhlásit se
                </button>
            </form>
        )
    }
}

export default LoginPage;