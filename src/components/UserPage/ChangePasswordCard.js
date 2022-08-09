import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import './ChangePasswordCard.css'

function ChangePasswordCard() {
    return (
        <div className="ChangePasswordCard">
            <Card>
                <Card.Header>
                    Zmenit heslo
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="oldPassword">
                            <Form.Label>Stare heslo</Form.Label>
                            <Form.Control type="password" placeholder="Zadejte stare heslo" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPasswordNew">
                            <Form.Label>Nove heslo</Form.Label>
                            <Form.Control type="password" placeholder="Zadejte nove heslo" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPasswordNewCheck">
                            <Form.Label>Nove heslo znovu</Form.Label>
                            <Form.Control type="password" placeholder="Zadejte nove heslo znovu" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Odeslat
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ChangePasswordCard;