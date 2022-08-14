import React from "react";
import ChangePasswordCard from "./ChangePasswordCard";
import './UserPage.css'

class UserPage extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const currentCard = <ChangePasswordCard />;
        return (
            <div className="UserPage">
                <h3>Uzivatelska stranka</h3>
                <p>Prihlaseny jako: {this.props.username}</p>
                {currentCard}
            </div>
        )
    }
}

export default UserPage