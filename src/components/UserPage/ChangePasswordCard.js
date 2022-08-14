import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import '../FormPage.css'
import React from "react";
import {sendChangePasswordRequest} from "../AxiosRequestor/AxiosUserPage";
import {Alert} from "react-bootstrap";

class ChangePasswordCard extends React.Component{
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
            this.setErrorMessage("Policka nesmi byt prazdna")
            return true
        }
        if (newPassword !== newPasswordRepeated) {
            this.setErrorMessage("Hesla se neshoduji.")
            return true
        }
        return false
    }

    async handleChangePasswordButtonClick() {
        this.setIsError(false)
        this.setPasswordSuccessfullyChanged(false)
        if(this.inputIsInvalid()) {
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
        const successAlert = this.state.passwordSuccessfullyChanged ? <Alert variant={"success"}>Heslo uspesne zmeneno</Alert> : null
        return (
            <div className="FormPage">
                <h4>Zmena hesla</h4>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="oldPassword">
                                <Form.Label>Soucasne heslo</Form.Label>
                                <Form.Control onChange={(e) => this.handleCurrentPasswordChange(e) } type="password" placeholder="Zadejte soucasne heslo" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPasswordNew">
                                <Form.Label>Nove heslo</Form.Label>
                                <Form.Control onChange={(e) => this.handleNewPasswordChange(e) } type="password" placeholder="Zadejte nove heslo" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPasswordNewCheck">
                                <Form.Label>Nove heslo znovu</Form.Label>
                                <Form.Control onChange={(e) => this.handleNewPasswordRepeatedChange(e) } type="password" placeholder="Zadejte nove heslo znovu" />
                            </Form.Group>
                            {successAlert}
                            {errorAlert}
                            <Button onClick={() => this.handleChangePasswordButtonClick()} variant="primary">
                                Odeslat
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        );
    }

}

export default ChangePasswordCard;