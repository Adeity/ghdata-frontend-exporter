import React from "react";
import ChangePasswordCard from "./ChangePasswordCard";
import './UserPage.css'

class UserPage extends React.Component {
    render () {
        const currentCard = <ChangePasswordCard />;
        return (
            <div className="UserPage">
                {currentCard}
            </div>
        )
    }
}

export default UserPage