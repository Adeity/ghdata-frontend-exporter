import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Home from "../components/Home";

function Header() {
    return (
        <Router>
            <Navbar>
                <Container>
                    <Navbar.Brand href="#home">
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Link to="/">Home</Link>
                        <Link to="/about">Johnny</Link>
                    </Nav>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="#login">Mark Otto</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/about" element={<h1>fuck you</h1>} />
                    </Routes>
                </Container>
            </div>
        </Router>
    )

}

export default Header