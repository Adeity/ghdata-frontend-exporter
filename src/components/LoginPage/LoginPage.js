import React from "react";
import './LoginPage.css'
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/Container";
import InputGroup from'react-bootstrap/InputGroup'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

class LoginPage extends React.Component {
    render () {
        return (
            <div className="ChangePasswordCard">
                <Card>
                    <Card.Header>
                        Prihlasit se
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="oldPassword">
                                <Form.Label>Uzivatelske jmeno</Form.Label>
                                <Form.Control type="text" placeholder="Zadejte uzivatelse jmeno" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPasswordNew">
                                <Form.Label>Heslo</Form.Label>
                                <Form.Control type="password" placeholder="Zadejte heslo" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
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