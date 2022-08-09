import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Home from "../components/Home";
import UserPage from "./UserPage/UserPage";
import React from "react";
import LoginPage from "./LoginPage/LoginPage";

class HeaderAndMain extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        const loginOrUserLink = this.props.isLoggedIn ?
            (<Link to="/user-page">Mark Otto</Link>) :
            (<Link to="/login">Prihlasit se</Link>)
        return (
            <Router>
                <Navbar bg="light">
                    <Container>
                        <Navbar.Brand href="#home">
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Link to="/">Domov</Link>
                            <Link to="/about">Johnny</Link>
                        </Nav>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                                {loginOrUserLink}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <main>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Home/>} />
                            <Route path="/user-page" element={<UserPage />} />
                            <Route path="/login" element={<LoginPage />} />
                        </Routes>
                    </Container>
                </main>
            </Router>
        )
    }
}

export default HeaderAndMain