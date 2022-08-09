import './App.css';
import HeaderAndMain from "./components/HeaderAndMain";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import LoginPage from "./components/LoginPage/LoginPage";
import React, {useState} from "react";
import {checkAuthorized} from "./AxiosAuthenticatorChecker";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedUsername: "",
            isLoggedIn: false
        }
    }

    setLoggedUser(username) {
        this.setState({loggedUsername: username})
        this.setState({isLoggedIn: true})
    }

    componentDidMount() {
        checkAuthorized().then((res) => {
            console.log("something happened her")
            console.log(res)
            this.setLoggedUser(res)
        })
            .catch((err) => {
                console.log("unauthorized")
            })
    }

    render () {
        return (
                <div id={"main-container"}>
                    <HeaderAndMain
                        setLoggedUser={this.setLoggedUser.bind(this)}
                        isLoggedIn={this.state.isLoggedIn}/>
                    <Footer />
                </div>
            )
    }
}

export default App;
