import './App.css';
import React from "react";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }



    render () {
        setTimeout(() => {
            window.location.href = "https://dotazniky-vo.vercel.app/admin"
        }, 3000)
        return (
                <div id={"main-container"}>
                    <h6>Administrátorské rozhraní bylo přesunuto na novou doménu.</h6>
                    <p>Pokud nebudeš přesměrován, klikni <a href={"https://dotazniky-vo.vercel.app/admin"}>sem.</a></p>
                </div>
            )
    }
}

export default App;
