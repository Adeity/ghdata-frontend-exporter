import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Home from "../components/Home";
import UserPage from "./UserPage/UserPage";
import React from "react";
import LoginPage from "./LoginPage/LoginPage";
import RestrictedRoute from "./RestrictedRootComponent/RestrictedRoute";
import "./Link.css"

class HeaderAndMain extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        const loginOrUserLink = this.props.authorizationConstants.isLoggedIn ?
            (<Link className="nav-link" to="/user-page">Prihlasen jako: {this.props.authorizationConstants.username}</Link>) :
            (<Link className="nav-link" to="/login">Prihlasit se</Link>)
        return (
            <Router>
                <Navbar bg="light" className={"mb-3"}>
                    <Container>
                        <Navbar.Brand>
                            VyzkumOdolnosti exporter
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Link className="nav-link" to="/">Spanek</Link>
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
                    <Container className={"h-100"}>
                        <Routes>
                            <Route path="" element={
                                <RestrictedRoute
                                    authorizationConstants={this.props.authorizationConstants}
                                >
                                    <Home/>
                                </RestrictedRoute>
                            } />
                            <Route path="/user-page" element={
                                <RestrictedRoute
                                    authorizationConstants={this.props.authorizationConstants}
                                >
                                    <UserPage setLoggedUser={this.props.setLoggedUser} username={this.props.authorizationConstants.username} />
                                </RestrictedRoute>
                            } />
                            <Route path="/login" element={
                                <LoginPage setLoggedUser={this.props.setLoggedUser}/>
                            } />
                        </Routes>
                    </Container>
                </main>
            </Router>
        )
    }
}

export default HeaderAndMain