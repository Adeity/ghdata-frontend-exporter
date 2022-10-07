import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col>
                        <a className={""} href="src/components/HeaderMainFooter/Footer" >VyzkumOdolnosti</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer