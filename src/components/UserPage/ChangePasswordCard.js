import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import '../FormPage.css'
import React from "react";
import {sendChangePasswordRequest} from "../AxiosRequestor/AxiosUserPage";
import {Alert} from "react-bootstrap";

class ChangePasswordCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            newPasswordRepeated: "",
            errorMessage: "",
            isError: false,
            passwordSuccessfullyChanged: false
        }
    }

    handleCurrentPasswordChange(e) {
        this.setState({currentPassword: e.target.value})
    }

    handleNewPasswordChange(e) {
        this.setState({newPassword: e.target.value})
    }

    handleNewPasswordRepeatedChange(e) {
        this.setState({newPasswordRepeated: e.target.value})
    }

    setErrorMessage(message) {
        this.setIsError(true)
        this.setState({errorMessage: message})
    }

    setIsError(isError) {
        this.setState({isError: isError})
    }

    setPasswordSuccessfullyChanged(successFulyChanged) {
        this.setState({passwordSuccessfullyChanged: successFulyChanged})
    }

    inputIsInvalid() {
        const {currentPassword, newPassword, newPasswordRepeated} = this.state;
        if (currentPassword.length < 1 || newPassword.length < 1 || newPasswordRepeated.length < 1) {
            this.setErrorMessage("Políčka nesmí být prázdná.")
            return true
        }
        if (newPassword !== newPasswordRepeated) {
            this.setErrorMessage("Hesla se neshodují.")
            return true
        }
        return false
    }

    async handleChangePasswordButtonClick() {
        this.setIsError(false)
        this.setPasswordSuccessfullyChanged(false)
        if (this.inputIsInvalid()) {
            return;
        }
        const {currentPassword, newPassword, newPasswordRepeated} = this.state;
        await sendChangePasswordRequest(currentPassword, newPassword, newPasswordRepeated)
            .then((res) => {
                this.setPasswordSuccessfullyChanged(true)
            })
            .catch((e) => {
                this.setErrorMessage(e.response.data.message)
            })
    }

    render() {
        const errorAlert = this.state.isError ? <Alert variant={"danger"}>{this.state.errorMessage}</Alert> : null;
        const successAlert = this.state.passwordSuccessfullyChanged ?
            <Alert variant={"success"}>Heslo úspěsně změněno.</Alert> : null
        return (
            <div className="FormPage">
                <h6>Změna hesla</h6>
                <Form>
                    <Form.Group className="mb-3 form-floating" >
                        <Form.Control id={"soucasnePassword"} onChange={(e) => this.handleCurrentPasswordChange(e)}
                                      type="password" placeholder="Zadejte současné heslo"/>
                        <Form.Label htmlFor={"soucasnePassword"}>Současné heslo</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3 form-floating" >
                        <Form.Control id={"newPassword"} onChange={(e) => this.handleNewPasswordChange(e)}
                                      type="password" placeholder="Zadejte nové heslo"/>
                        <Form.Label htmlFor={"newPassword"}>Nové heslo</Form.Label>
                    </Form.Group>

                    <Form.Group className="mb-3 form-floating" >
                        <Form.Control onChange={(e) => this.handleNewPasswordRepeatedChange(e)} type="password"
                                      placeholder="Zadejte nové heslo znovu"/>
                        <Form.Label>Nové heslo znovu</Form.Label>
                    </Form.Group>
                    {successAlert}
                    {errorAlert}
                    <div className={"d-flex justify-content-center"}>
                        <Button onClick={() => this.handleChangePasswordButtonClick()} variant="primary">
                            Změnit heslo
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }

}

export default ChangePasswordCard;