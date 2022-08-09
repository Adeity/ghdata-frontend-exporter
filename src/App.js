import './App.css';
import HeaderAndMain from "./components/HeaderAndMain";
import Footer from "./components/Footer";
import Container from "react-bootstrap/Container";
import LoginPage from "./components/LoginPage/LoginPage";
import React, {useState} from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false}
    }

    render () {
        return (
                <div id={"main-container"}>
                    <HeaderAndMain isLoggedIn={this.state.isLoggedIn}/>
                    <Footer />
                </div>
            )
    }
}

export default App;
