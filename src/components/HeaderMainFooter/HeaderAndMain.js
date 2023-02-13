import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import Container from "react-bootstrap/Container";
import SleepExportPage from "../SleepExportPage/SleepExportPage";
import UserPage from "../UserPage/UserPage";
import React from "react";
import LoginPage from "../LoginPage/LoginPage";
import RestrictedRoute from "../RestrictedRootComponent/RestrictedRoute";
import ParticipantsPage from "../ParticipantsPage/ParticipantsPage";
import ResearchNumberCheckPage from "../ParticipantsPage/ResearchNumberCheckPage";

class HeaderAndMain extends React.Component{
    constructor(props) {
        super(props);
    }

    render () {
        const loginOrUserLink = this.props.authorizationConstants.isLoggedIn ?
            (<Link className="nav-link" to="/user-page">Příhlášen jako: {this.props.authorizationConstants.username}</Link>) :
            (<Link className="nav-link" to="/login">Přihlásit se</Link>)
        return (
            <Router>
                <header className=" container d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                    <span className={"d-flex align-items-center me-md-auto fs-4"}>
                        Výzkum Odolnosti Admin
                    </span>

                    <ul className="nav nav-pills">
                        <li className={"nav-item"}><Link to="/" className={"nav-link"}>Export z wearables</Link></li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                Účastníci
                            </a>
                            <ul className="dropdown-menu">
                                {/*<li><Link className="dropdown-item" to="/participants/all">Seznam</Link></li>*/}
                                <li><Link className="dropdown-item" to="/participants/number-check">Kontrola výzkumných čisel</Link></li>
                            </ul>
                        </li>
                        <li className={"nav-item"}>{loginOrUserLink}</li>
                    </ul>
                </header>

                <main>
                    <Container className={"h-100"}>
                        <Routes>
                            <Route path="" element={
                                <RestrictedRoute
                                    authorizationConstants={this.props.authorizationConstants}
                                >
                                    <SleepExportPage/>
                                </RestrictedRoute>
                            } />
                            <Route path="/participants/all" element={
                                <RestrictedRoute
                                    authorizationConstants={this.props.authorizationConstants}
                                >
                                    <ParticipantsPage />
                                </RestrictedRoute>
                            } />
                            <Route path="/participants/number-check" element={
                                <RestrictedRoute
                                    authorizationConstants={this.props.authorizationConstants}
                                >
                                    <ResearchNumberCheckPage />
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