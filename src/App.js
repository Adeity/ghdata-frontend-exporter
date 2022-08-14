import './App.css';
import HeaderAndMain from "./components/HeaderAndMain";
import Footer from "./components/Footer";
import React from "react";
import {checkAuthorized} from "./AxiosAuthenticatorChecker";
import {Navigate} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedUsername: "",
            isLoggedIn: false,
            authorizationChecked: false
        }
    }

    setLoggedUser(username) {
        this.setState({loggedUsername: username, isLoggedIn: true})
    }
    setAuthorizationChecked() {
        this.setState({authorizationChecked: true})
    }

    componentDidMount() {
        this.checkAuthorized();
    }

    checkAuthorized() {
        checkAuthorized().then((res) => {
            this.setLoggedUser(res.data)
        })
            .catch((err) => {
                console.error(err)
            })
        this.setAuthorizationChecked()
    }

    render () {
        const authorizationConstants = {
            username: this.state.loggedUsername,
            isLoggedIn: this.state.isLoggedIn,
            authorizationChecked: this.state.authorizationChecked
        }
        const changeLoggedUser = this.setLoggedUser;
        return (
                <div id={"main-container"}>
                    <HeaderAndMain
                        authorizationConstants={authorizationConstants}
                        setLoggedUser={changeLoggedUser.bind(this)} />
                    <Footer />
                </div>
            )
    }
}

export default App;
